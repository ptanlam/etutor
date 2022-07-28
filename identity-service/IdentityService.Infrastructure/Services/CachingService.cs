using System;
using System.Text;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Infrastructure;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace IdentityService.Infrastructure.Services
{
    public class CachingService : ICachingService
    {
        private readonly IDistributedCache _distributedCache;

        public CachingService(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache ?? throw new ArgumentNullException(nameof(distributedCache));
        }

        public async Task<T> GetAsync<T>(string key) where T : class
        {
            var payloadByteList = await _distributedCache.GetAsync(key);
            if (payloadByteList == null) return null;
            
            var serializedPayload = Encoding.UTF8.GetString(payloadByteList);
            return JsonConvert.DeserializeObject<T>(serializedPayload);
        }

        public async Task SetAsync<T>(string key, T payload) where T : class
        {
            var serializedPayload = JsonConvert.SerializeObject(payload);
            var payloadByteList = Encoding.UTF8.GetBytes(serializedPayload);

            var options = new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(DateTime.Now.AddHours(1));
            await _distributedCache.SetAsync(key, payloadByteList, options);
        }
    }
}