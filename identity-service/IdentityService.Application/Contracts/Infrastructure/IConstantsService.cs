using System.Threading.Tasks;

namespace IdentityService.Application.Contracts.Infrastructure
{
    public interface IConstantsService
    {
        Task<string> GetGenderById(string id);
    }
}