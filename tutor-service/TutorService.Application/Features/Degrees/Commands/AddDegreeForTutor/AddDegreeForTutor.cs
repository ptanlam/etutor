using System;
using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;
using TutorService.Application.Features.Degrees.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Degrees.Commands.AddDegreeForTutor
{
    public class AddDegreeForTutor : IRequest<(List<ValidationFailure> errors, DegreeVm degree)>
    {
        public Tutor Tutor { get; set; }
        public string Name { get; init; }
        public string Major { get; init; }
        public string GraduatedUniversity { get; init; }
        public DateTime DateOfIssue { get; init; }
        public string AcademicRankId { get; init; }
        public IFormFileCollection Images { get; init; }
        public bool NeedToReturn { get; init; } = true;
    }
}