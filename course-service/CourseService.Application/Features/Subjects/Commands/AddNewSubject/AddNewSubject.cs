using System.Collections.Generic;
using CourseService.Application.Features.Subjects.ViewModels;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Subjects.Commands.AddNewSubject
{
    public class AddNewSubject : IRequest<(List<ValidationFailure> errors, SubjectVm course)>
    {
        public string Name { get; init; }
        public string TutorId { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
    }
}