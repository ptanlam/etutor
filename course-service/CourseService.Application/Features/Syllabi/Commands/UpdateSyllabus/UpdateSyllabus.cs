using System;
using System.Collections.Generic;
using CourseService.Application.Features.Syllabi.ViewModels;
using CourseService.Domain.CourseAggregate;
using FluentValidation.Results;
using MediatR;

namespace CourseService.Application.Features.Syllabi.Commands.UpdateSyllabus
{
    public class UpdateSyllabus : IRequest<(bool found, List<ValidationFailure> errors, SyllabusVm syllabus)>
    {
        public OnlineCourse Course { get; set; }
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; init; }
        public string Achievements { get; init; }
        public DateTime FromDate { get; init; }
        public DateTime ToDate { get; init; }
    }
}