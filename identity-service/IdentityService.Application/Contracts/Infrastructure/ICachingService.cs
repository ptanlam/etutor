using System.Threading.Tasks;

namespace IdentityService.Application.Contracts.Infrastructure
{
    public interface ICachingService
    {
        Task SetAsync<T>(string key, T payload) where T : class;
        Task<T> GetAsync<T>(string key) where T : class;
    }
}