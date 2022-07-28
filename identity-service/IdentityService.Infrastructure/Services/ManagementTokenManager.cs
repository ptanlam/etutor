using System;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Model;

namespace IdentityService.Infrastructure.Services
{
    public class ManagementTokenManager : IManagementTokenManager
    {
        private readonly IManagementTokenService _managementTokenService;
        private readonly ICachingService _cachingService;

        public ManagementTokenManager(IManagementTokenService managementTokenService, ICachingService cachingService)
        {
            _managementTokenService = managementTokenService ?? 
                                      throw new ArgumentNullException(nameof(managementTokenService));
            _cachingService = cachingService ?? throw new ArgumentNullException(nameof(cachingService));
        }

        public async Task<ManagementTokenPayload> GetTokenPayload()
        {
            const string cachingKey = "managementAccessToken";
            
            var tokenPayload = await _cachingService.GetAsync<ManagementTokenPayload>(cachingKey);
            if (tokenPayload != null) return tokenPayload;

            tokenPayload = await _managementTokenService.GetTokenPayload();
            await _cachingService.SetAsync(cachingKey, tokenPayload);
            return tokenPayload;
        }
    }
}