using System;
using System.Collections.Generic;
using FluentValidation.Results;
using MediatR;
using TutorService.Application.Features.Degrees.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Degrees.Commands.UpdateDegreeForTutor
{
    public class UpdateDegreeForTutor : IRequest<(bool found, List<ValidationFailure> errors, DegreeVm degree)>
    {
        public Tutor Tutor { get; set; }
        public int Id { get; set; }
        public string Name { get; init; }
        public string Major { get; init; }
        public string GraduatedUniversity { get; init; }
        public DateTime DateOfIssue { get; init; }
        public string AcademicRankId { get; init; }
    }
}