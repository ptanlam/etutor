using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Certificates.Commands.UpdateCertificateForTutor
{
    public class
        UpdateCertificateForTutor : IRequest<(bool found, List<ValidationFailure> errors, CertificateVm certificate)>
    {
        public Tutor Tutor { get; set; }
        public int Id { get; set; }
        public string Name { get; init; }
        public string PlaceOfIssue { get; init; }
    }
}