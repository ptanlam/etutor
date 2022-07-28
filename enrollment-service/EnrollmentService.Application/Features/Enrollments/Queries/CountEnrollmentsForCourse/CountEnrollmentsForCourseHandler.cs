using System;
using System.Threading;
using System.Threading.Tasks;
using EnrollmentService.Application.Contracts.Persistence;
using MediatR;

namespace EnrollmentService.Application.Features.Enrollments.Queries.CountEnrollmentsForCourse
{
    public class CountEnrollmentsForCourseHandler : IRequestHandler<CountEnrollmentsForCourse, int>
    {
        private readonly IEnrollmentsRepository _enrollmentsRepository;

        public CountEnrollmentsForCourseHandler(IEnrollmentsRepository enrollmentsRepository)
        {
            _enrollmentsRepository =
                enrollmentsRepository ?? throw new ArgumentNullException(nameof(enrollmentsRepository));
        }

        public async Task<int> Handle(CountEnrollmentsForCourse request, CancellationToken cancellationToken)
        {
            return await _enrollmentsRepository.CountForCourseAsync(request.CourseId);
        }
    }
}