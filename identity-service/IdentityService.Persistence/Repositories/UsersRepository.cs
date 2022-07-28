using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
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
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(IOptions<Auth0Options> options, IManagementConnection managementConnection,
            IManagementTokenManager managementTokenManager) : base(options, managementConnection,
            managementTokenManager)
        {
        }

        public async Task<IPagedList<User>> GetPagedList()
        {
            var request = new GetUsersRequest();
            var client = await GetClient();
            return await client.Users.GetAllAsync(request);
        }

        public async Task<IPagedList<User>> GetPagedList(int pageNumber, int pageSize)
        {
            var request = new GetUsersRequest();
            //! Pre-defined page number minimum value is 1
            var paginationInfo = new PaginationInfo(pageNumber - 1, pageSize, true);

            var client = await GetClient();
            return await client.Users.GetAllAsync(request, paginationInfo);
        }

        public async Task<User> GetById(string id)
        {
            var client = await GetClient();
            var user = await client.Users.GetAsync(id);
            return user;
        }

        public async Task<User> GetByEmail(string email, CancellationToken cancellationToken)
        {
            var client = await GetClient();
            return (await client.Users.GetUsersByEmailAsync(email, cancellationToken: cancellationToken))
                .FirstOrDefault();
        }

        public async Task<User> Register(string email, string password, string firstName, string lastName,
            string middleName = "")
        {
            var user = new UserCreateRequest
            {
                Connection = StrategyConnection, Email = email, Password = password,
                FirstName = firstName, LastName = lastName,
                FullName = SanitizeName(firstName, lastName, middleName)
            };

            var client = await GetClient();
            var createdUser = await client.Users.CreateAsync(user);
            ;

            return createdUser;
        }

        public async Task<User> Update(string id, string firstName, string lastName,
            string middleName = "", CancellationToken cancellationToken = default)
        {
            var user = await GetById(id);
            if (user is null) return null;

            var hasChanges = user.FirstName != firstName || user.LastName != lastName;
            if (!hasChanges) return user;

            var client = await GetClient();
            var request = new UserUpdateRequest
            {
                FirstName = firstName,
                LastName = lastName,
                FullName = SanitizeName(firstName, lastName, middleName)
            };

            return await client.Users.UpdateAsync(id, request, cancellationToken);
        }

        private static string SanitizeName(string firstName, string lastName, string middleName)
        {
            var nameList = new List<string> {firstName, middleName, lastName};
            return Regex.Replace(string.Join(" ", nameList), @"\s+", " ");
        }
    }
}