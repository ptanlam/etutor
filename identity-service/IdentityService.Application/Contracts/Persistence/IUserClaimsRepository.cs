using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Domain.UserAggregate;

namespace IdentityService.Application.Contracts.Persistence
{
    public interface IUserClaimsRepository
    {
        Task<IEnumerable<UserClaim>> GetClaimsForUserAsync(string userId);

        Task<UserClaim> GetByConditionsAsync(string name, string value, CancellationToken cancellationToken);

        Task<UserClaim> AddAsync(UserClaim userClaim);

        Task<IEnumerable<UserClaim>> BulkAddAsync(IEnumerable<UserClaim> userClaims);

        Task<UserClaim> UpdateAsync(string userId, string name, string value,
            CancellationToken cancellationToken = default);
    }
}