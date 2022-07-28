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
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Certificates.Commands.AddCertificateForTutor
{
    public class
        AddCertificateForTutorHandler : IRequestHandler<AddCertificateForTutor, (List<ValidationFailure> errors,
            CertificateVm certificate)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<AddCertificateForTutor> _validator;
        private readonly IMapper _mapper;
        private readonly IMessagingService _messagingService;

        public AddCertificateForTutorHandler(ITutorsRepository tutorsRepository,
            IValidator<AddCertificateForTutor> validator, IMapper mapper, IMessagingService messagingService)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
        }

        public async Task<(List<ValidationFailure> errors, CertificateVm certificate)> Handle(
            AddCertificateForTutor request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (validationResult.Errors, null);

            var certificate =
                new Certificate(request.Name, request.PlaceOfIssue, request.DateOfIssue, request.ExpiresIn);

            request.Tutor.AddCertificate(certificate);
            await _tutorsRepository.UpdateAsync(request.Tutor);

            await _messagingService.UploadImages(certificate.Id.ToString(),
                new FormFileCollection {request.Images.ToList().FirstOrDefault()}, "certificates");

            return (null, _mapper.Map<CertificateVm>(certificate));
        }
    }
}