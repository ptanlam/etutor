using System;
using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Certificates.Commands.AddCertificateForTutor
{
    public class AddCertificateForTutor : IRequest<(List<ValidationFailure> errors, CertificateVm certificate)>
    {
        public Tutor Tutor { get; set; }
        public string Name { get; init; }
        public string PlaceOfIssue { get; init; }
        public DateTime DateOfIssue { get; init; }
        public DateTime ExpiresIn { get; init; }
        public IFormFileCollection Images { get; init; }
    }
}