using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using EnrollmentService.Domain.EnrollmentAggregate;

namespace EnrollmentService.Application.Contracts.Persistence
{
    public interface IEnrollmentsRepository : IAsyncReadRepository<Enrollment>, IAsyncRepository<Enrollment>
    {
        Task<IEnumerable<Enrollment>> ListForCourse(string courseId);
        Task<int> CountForCourseAsync(string courseId);

        Task<Enrollment> GetForCourseAndStudent(string courseId, string studentId,
            CancellationToken cancellationToken = default);
    }
}