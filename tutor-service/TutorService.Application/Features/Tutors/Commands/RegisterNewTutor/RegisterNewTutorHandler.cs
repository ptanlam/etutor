using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Certificates.Commands.AddCertificateForTutor;
using TutorService.Application.Features.Degrees.Commands.AddDegreeForTutor;
using TutorService.Application.Features.Tutors.Dtos;
using TutorService.Application.Features.Tutors.Helper;
using TutorService.Application.Features.Tutors.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Commands.RegisterNewTutor
{
    public class RegisterNewTutorHandler : IRequestHandler<RegisterNewTutor, (List<ValidationFailure> errors, bool
        userExists, TutorDetailsVm tutor)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<RegisterNewTutor> _validator;
        private readonly IMessagingService _messagingService;
        private readonly IIdentitiesService _identitiesService;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public RegisterNewTutorHandler(ITutorsRepository tutorsRepository, IValidator<RegisterNewTutor> validator,
            IMessagingService messagingService, IIdentitiesService identitiesService, IMapper mapper,
            IMediator mediator)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
            _identitiesService = identitiesService ?? throw new ArgumentNullException(nameof(identitiesService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public async Task<(List<ValidationFailure> errors, bool userExists, TutorDetailsVm tutor)> Handle(
            RegisterNewTutor request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, false, null);

            var userId = await _identitiesService.CheckUserExisting(request.UserId);
            if (string.IsNullOrEmpty(userId)) return (null, false, null);

            var tutor = new Tutor(request.UserId, request.Fullname, request.Description);
            await _tutorsRepository.AddAsync(tutor);

            await _messagingService.UploadImages(tutor.Id.ToString(), request.Images);
            await _messagingService.AddSubjectsForTutor(tutor.Id.ToString(), request.Subjects);

            await AddDegrees(tutor, request.Degrees);
            await AddCertificates(tutor, request.Certificates);

            var tutorDetailsVm = _mapper.Map<TutorDetailsVm>(tutor);
            return (null, true, tutorDetailsVm);
        }

        private async Task AddDegrees(Tutor tutor, IEnumerable<DegreeCreationDto> degreeCreationDtoList)
        {
            if (degreeCreationDtoList is null) return;

            foreach (var dto in degreeCreationDtoList)
            {
                var request = new AddDegreeForTutor
                {
                    Name = dto.Name, AcademicRankId = dto.AcademicRankId, DateOfIssue = dto.DateOfIssue,
                    GraduatedUniversity = dto.GraduatedUniversity, Images = dto.Images, Major = dto.Major,
                    Tutor = tutor, NeedToReturn = false
                };

                await _mediator.Send(request);
            }
        }

        private async Task AddCertificates(Tutor tutor, IEnumerable<CertificateCreationDto> certificateCreationDtoList)
        {
            if (certificateCreationDtoList is null) return;

            foreach (var dto in certificateCreationDtoList)
            {
                var request = new AddCertificateForTutor
                {
                    Name = dto.Name, DateOfIssue = dto.DateOfIssue, ExpiresIn = dto.ExpiresIn, Images = dto.Images,
                    PlaceOfIssue = dto.PlaceOfIssue, Tutor = tutor
                };

                await _mediator.Send(request);
            }
        }
    }
}