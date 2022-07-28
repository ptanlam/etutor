using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Queries.CountEnrollmentsForCourse
{
    public class CountEnrollmentsForCourse : IRequest<int>
    {
        public string CourseId { get; init; }
    }
}