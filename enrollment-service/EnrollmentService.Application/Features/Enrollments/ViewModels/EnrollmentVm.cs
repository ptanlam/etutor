using System;

namespace EnrollmentService.Application.Features.Enrollments.ViewModels
{
    public class EnrollmentVm
    {
        public Guid Id { get; init; }
        public string CourseId { get; init; }
        public string StudentId { get; init; }
        public decimal TuitionAmount { get; init; }
        public string TuitionUnit { get; init; }
        public DateTimeOffset StartDate { get; init; }
        public DateTimeOffset EndDate { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime? UpdatedAt { get; init; }
    }
}