using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Domain.EnrollmentAggregate;
using Microsoft.EntityFrameworkCore;

namespace EnrollmentService.Persistence.Repositories
{
    public class EnrollmentsRepository : BaseRepository<Enrollment>, IEnrollmentsRepository
    {
        public EnrollmentsRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Enrollment>> ListForCourse(string courseId)
        {
            return await DbContext.Enrollments.Where(e => e.CourseId == courseId).ToListAsync();
        }

        public async Task<int> CountForCourseAsync(string courseId)
        {
            return await DbContext.Enrollments.CountAsync(e => e.CourseId == courseId && !e.IsCancelled);
        }

        public async Task<Enrollment> GetForCourseAndStudent(string courseId, string studentId,
            CancellationToken cancellationToken = default)
        {
            return await DbContext.Enrollments.FirstOrDefaultAsync(e =>
                e.CourseId == courseId && e.StudentId == studentId, cancellationToken);
        }
    }
}