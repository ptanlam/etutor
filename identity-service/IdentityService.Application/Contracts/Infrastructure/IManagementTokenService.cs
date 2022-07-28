using System.Threading.Tasks;
using IdentityService.Application.Model;

namespace IdentityService.Application.Contracts.Infrastructure
{
    public interface IManagementTokenService
    {
        Task<ManagementTokenPayload> GetTokenPayload();
    }
}