using EnrollmentService.Application.Features.Enrollments.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Queries.GetEnrollmentForCourseAndStudent
{
    public class GetEnrollmentForCourseAndStudent : IRequest<EnrollmentVm>
    {
        public string CourseId { get; init; } = string.Empty;
        public string StudentId { get; init; } = string.Empty;
    }
}