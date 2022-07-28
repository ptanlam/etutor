using System;
using System.Collections.Generic;
using EnrollmentService.Application.Features.Enrollments.ViewModels;
using FluentValidation.Results;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Commands.CreateNewEnrollment
{
    public class CreateNewEnrollment :
        IRequest<(List<ValidationFailure> errors, string errorMessage, EnrollmentVm enrollment)>
    {
        public string CourseId { get; set; }
        public string StudentId { get; init; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string LearningDays { get; init; }
        public decimal TuitionAmount { get; set; }
        public string TuitionUnit { get; init; }

        // Session Service
        public string TutorId { get; init; }

        //* For one-on-one course type bc it doesn't have pre-created course 
        public string SubjectId { get; init; }
    }
}