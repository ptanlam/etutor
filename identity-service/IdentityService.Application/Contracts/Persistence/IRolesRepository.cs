using System.Threading.Tasks;
using Auth0.ManagementApi.Models;
using Auth0.ManagementApi.Paging;

namespace IdentityService.Application.Contracts.Persistence
{
    public interface IRolesRepository
    {
        Task<IPagedList<Role>> PagedListForUser(string userId);
        Task AssignRoleForUser(string userId, string roles);
    }
}