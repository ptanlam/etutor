using System.Collections.Generic;
using CourseService.Application.Features.Subjects.ViewModels;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.SubjectAggregate;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Subjects.Commands.UpdateSubject
{
    public class UpdateSubject : IRequest<(List<ValidationFailure> errors, SubjectVm course)>
    {
        public Subject Subject { get; set; }
        public string Name { get; init; }
        public string TutorId { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
    }
}