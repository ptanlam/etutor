using System.Linq;
using System.Threading.Tasks;
using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using Auth0.ManagementApi.Paging;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Options;
using Microsoft.Extensions.Options;

namespace IdentityService.Persistence.Repositories
{
    public class RolesRepository : BaseRepository, IRolesRepository
    {
        public RolesRepository(
            IOptions<Auth0Options> options,
            IManagementConnection managementConnection,
            IManagementTokenManager managementTokenManager) : base(options, managementConnection,
            managementTokenManager)
        {
        }

        public async Task<IPagedList<Role>> PagedListForUser(string userId)
        {
            // TODO: add pagination meta data
            var client = await GetClient();
            return await client.Users.GetRolesAsync(userId);
        }

        public async Task AssignRoleForUser(string userId, string role)
        {
            var client = await GetClient();

            var filteredRoles = await client.Roles.GetAllAsync(new GetRolesRequest
            {
                NameFilter = role
            });

            var currentRoles = await client.Users.GetRolesAsync(userId);
            filteredRoles.ToList().ForEach(currentRoles.Add);

            await client.Users.AssignRolesAsync(userId, new AssignRolesRequest
            {
                Roles = currentRoles.Select(r => r.Id).ToArray()
            });
        }
    }
}