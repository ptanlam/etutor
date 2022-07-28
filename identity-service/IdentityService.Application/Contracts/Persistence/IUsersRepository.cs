using System.Threading;
using System.Threading.Tasks;
using Auth0.ManagementApi.Models;
using Auth0.ManagementApi.Paging;

namespace IdentityService.Application.Contracts.Persistence
{
    public interface IUsersRepository
    {
        Task<IPagedList<User>> GetPagedList();

        Task<IPagedList<User>> GetPagedList(int pageNumber, int pageSize);

        Task<User> GetById(string id);

        Task<User> GetByEmail(string email, CancellationToken cancellationToken);

        Task<User> Register(string email, string password, string firstName, string lastName,
            string middleName = "");

        Task<User> Update(string id, string firstName, string lastName, string middleName = "",
            CancellationToken cancellationToken = default);
    }
}