using System;
using System.Collections.Generic;
using CourseService.Application.Features.Courses.ViewModels;
using CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace CourseService.Application.Features.Courses.Commands.AddNewCourse
{
    public class AddNewCourse :
        IRequest<(List<ValidationFailure> errors, bool hasSession, CourseVm course)>
    {
        public Guid SubjectId { get; init; }
        public string TutorId { get; set; }
        public string Type { get; init; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public IEnumerable<string> LearningDays { get; init; }
        public decimal TuitionFeeAmount { get; init; }
        public string TuitionFeeUnit { get; init; }
        public IEnumerable<AddNewSyllabus> Syllabi { get; init; }
        public IFormFile Thumbnail { get; init; }

        // Online course
        public string Name { get; init; }
        public string Description { get; init; }
        public int MaxNumberOfStudents { get; init; }
    }
}