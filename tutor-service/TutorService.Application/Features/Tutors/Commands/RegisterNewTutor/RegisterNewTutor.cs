using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;
using TutorService.Application.Features.Tutors.Dtos;
using TutorService.Application.Features.Tutors.ViewModels;

namespace TutorService.Application.Features.Tutors.Commands.RegisterNewTutor
{
    public class RegisterNewTutor : IRequest<(List<ValidationFailure> errors, bool userExists,
        TutorDetailsVm tutor)>
    {
        public string UserId { get; init; }
        public string Fullname { get; init; }
        public string Description { get; init; }
        public IFormFileCollection Images { get; init; }
        public IEnumerable<SubjectCreationDto> Subjects { get; init; }
        public IEnumerable<DegreeCreationDto> Degrees { get; init; }
        public IEnumerable<CertificateCreationDto> Certificates { get; init; }
    }
}