using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Degrees.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Degrees.Commands.AddDegreeForTutor
{
    public class
        AddDegreeForTutorHandler : IRequestHandler<AddDegreeForTutor, (List<ValidationFailure> errors, DegreeVm degree)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<AddDegreeForTutor> _validator;
        private readonly IConstantsService _constantsService;
        private readonly IMapper _mapper;
        private readonly IMessagingService _messagingService;

        public AddDegreeForTutorHandler(ITutorsRepository tutorsRepository, IValidator<AddDegreeForTutor> validator,
            IConstantsService constantsService, IMapper mapper, IMessagingService messagingService)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _constantsService = constantsService ?? throw new ArgumentNullException(nameof(constantsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
        }

        public async Task<(List<ValidationFailure> errors, DegreeVm degree)> Handle(AddDegreeForTutor request,
            CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var degree = new Degree(request.Name, request.Major, request.GraduatedUniversity, request.DateOfIssue,
                request.AcademicRankId);

            request.Tutor.AddDegree(degree);
            await _tutorsRepository.UpdateAsync(request.Tutor);

            await _messagingService.UploadImages(degree.Id.ToString(),
                new FormFileCollection {request.Images.ToList().FirstOrDefault()}, "degrees");

            var degreeVm = _mapper.Map<DegreeVm>(degree);
            if (request.NeedToReturn)
                degreeVm.AcademicRank = await _constantsService.GetAcademicRankById(degree.AcademicRankId);

            return (null, degreeVm);
        }
    }
}