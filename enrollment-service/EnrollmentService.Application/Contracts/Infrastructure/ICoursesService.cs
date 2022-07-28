using System.Threading.Tasks;

namespace EnrollmentService.Application.Contracts.Infrastructure
{
    public interface ICoursesService
    {
        Task<string> CreateOneOnOneCourse(CreateOneOnOneCourseRequest request);
        Task<GetCourseBasicInfoResponse> GetCourseById(string id);
    }
}