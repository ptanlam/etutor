using System.Threading.Tasks;

namespace CourseService.Application.Contracts.Infrastructure
{
    public interface IConstantsService
    {
        Task<string> GetEducationalLevelById(string id);
        Task<string> GetEducationalGradeById(string id);
    }
}