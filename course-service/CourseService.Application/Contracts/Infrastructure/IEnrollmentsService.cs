using System.Threading.Tasks;

namespace CourseService.Application.Contracts.Infrastructure
{
    public interface IEnrollmentsService
    {
        Task<int> CountForCourseAsync(string courseId);
    }
}