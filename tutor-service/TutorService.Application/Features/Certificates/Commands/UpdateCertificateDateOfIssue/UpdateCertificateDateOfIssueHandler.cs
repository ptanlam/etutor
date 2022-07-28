using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Contracts;
using TutorService.Application.Contracts.Persistence;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Certificates.Commands.UpdateCertificateDateOfIssue
{
    public class
        UpdateCertificateDateOfIssueHandler : IRequestHandler<UpdateCertificateDateOfIssue, (bool found,
            List<ValidationFailure> errors, CertificateVm certificate)>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IValidator<UpdateCertificateDateOfIssue> _validator;
        private readonly IMapper _mapper;

        public UpdateCertificateDateOfIssueHandler(ITutorsRepository tutorsRepository,
            IValidator<UpdateCertificateDateOfIssue> validator, IMapper mapper)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _validator = validator;
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<(bool found, List<ValidationFailure> errors, CertificateVm certificate)> Handle(
            UpdateCertificateDateOfIssue request, CancellationToken cancellationToken)
        {
            var certificate = request.Tutor.Certificates.FirstOrDefault(c => c.Id == request.Id);
            if (certificate == null) return (false, null, null);

            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid) return (false, validationResult.Errors, null);

            certificate.UpdateDateOfIssue(request.DateOfIssue);
            await _tutorsRepository.UpdateAsync(request.Tutor);

            return (true, null, _mapper.Map<CertificateVm>(certificate));
        }
    }
}