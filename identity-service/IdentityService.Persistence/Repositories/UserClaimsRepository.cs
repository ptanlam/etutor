using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Auth0.ManagementApi.Models;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Options;
using IdentityService.Domain.UserAggregate;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace IdentityService.Persistence.Repositories
{
    public class UserClaimsRepository : IUserClaimsRepository
    {
        private readonly IMongoCollection<UserClaim> _collection;

        public UserClaimsRepository(IOptions<MongoOptions> options)
        {
            var mongoOptions = options.Value;

            var client = new MongoClient(mongoOptions.ConnectionString);
            var database = client.GetDatabase(mongoOptions.DatabaseName);
            _collection = database.GetCollection<UserClaim>(mongoOptions.Collection);
        }

        public async Task<IEnumerable<UserClaim>> GetClaimsForUserAsync(string userId)
        {
            return await _collection.Find(c => c.UserId == userId).ToListAsync();
        }

        public async Task<UserClaim> GetByConditionsAsync(string name, string value,
            CancellationToken cancellationToken)
        {
            return await _collection.Find(uc => uc.Name == name && uc.Value == value)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<UserClaim> AddAsync(UserClaim userClaim)
        {
            await _collection.InsertOneAsync(userClaim);
            return userClaim;
        }

        public async Task<IEnumerable<UserClaim>> BulkAddAsync(IEnumerable<UserClaim> userClaims)
        {
            var userClaimList = userClaims.ToList();
            await _collection.InsertManyAsync(userClaimList);
            return userClaimList;
        }

        public async Task<IEnumerable<UserClaim>> UpdateAsync(string userId, IEnumerable<UserClaim> userClaims,
            CancellationToken cancellationToken = default)
        {
            var userClaimsList = userClaims.ToList();

            foreach (var userClaim in userClaimsList)
            {
                await _collection.ReplaceOneAsync(
                    c => c.UserId == userId && c.Name == userClaim.Name && c.Value != userClaim.Value, userClaim,
                    cancellationToken: cancellationToken);
            }

            return userClaimsList;
        }

        public async Task<UserClaim> UpdateAsync(string userId, string name, string value,
            CancellationToken cancellationToken = default)
        {
            return await _collection.FindOneAndUpdateAsync(
                c => c.UserId == userId && c.Name == name && c.Value != value,
                Builders<UserClaim>.Update.Set(c => c.Value, value), cancellationToken: cancellationToken);
        }
    }
}