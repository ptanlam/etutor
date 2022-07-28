using System.Threading.Tasks;

namespace TutorService.Application.Contracts.Persistence
{
    public interface IConstantsService
    {
        Task<string> GetAcademicRankById(string id);
    }
}