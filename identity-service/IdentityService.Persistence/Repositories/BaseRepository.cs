using System;
using System.Threading.Tasks;
using Auth0.ManagementApi;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Options;
using Microsoft.Extensions.Options;

namespace IdentityService.Persistence.Repositories
{
    public class BaseRepository
    {
        protected const string StrategyConnection = "Username-Password-Authentication";
        
        private readonly IManagementConnection _managementConnection;
        private readonly IManagementTokenManager _managementTokenManager;
        private readonly Auth0Options _auth0Options;

        public BaseRepository(IOptions<Auth0Options> options, IManagementConnection managementConnection, 
            IManagementTokenManager managementTokenManager)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));
            _auth0Options = options.Value;
            _managementConnection = managementConnection ?? 
                                    throw new ArgumentNullException(nameof(managementConnection));
            _managementTokenManager = managementTokenManager ?? 
                                      throw new ArgumentNullException(nameof(managementTokenManager));
        }
        
        protected async Task<ManagementApiClient> GetClient()
        {
            var tokenPayload = await _managementTokenManager.GetTokenPayload();
            var managementApiClient = new ManagementApiClient(tokenPayload.AccessToken, _auth0Options.Domain,
                _managementConnection);
            return managementApiClient;
        }
    }
}