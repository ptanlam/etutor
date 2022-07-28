using System;
using System.Collections.Generic;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Domain.CourseAggregate;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Courses.Commands.UpdateCourse
{
    public class UpdateCourse : IRequest<(List<ValidationFailure> errors, CourseVm course)>
    {
        public Course Course { get; set; }
        public DateTimeOffset StartDate { get; init; }
        public DateTimeOffset EndDate { get; init; }
        public decimal? TuitionFeeAmount { get; init; }
        public string TuitionFeeUnit { get; init; }
        public Guid SubjectId { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public int MaxNumberOfStudents { get; init; }
    }
}