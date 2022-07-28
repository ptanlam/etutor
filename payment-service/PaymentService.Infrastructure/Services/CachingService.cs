using System.Text;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PaymentService.Application.Contracts.Infrastructure;

namespace PaymentService.Infrastructure.Services;

public class CachingService : ICachingService
{
    private readonly IDistributedCache _distributedCache;

    public CachingService(IDistributedCache distributedCache)
    {
        _distributedCache = distributedCache ?? throw new ArgumentNullException(nameof(distributedCache));
    }

    public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default) where T : class
    {
        var payloadByteList = await _distributedCache.GetAsync(key, cancellationToken);
        if (payloadByteList == null) return null;

        var serializedPayload = Encoding.UTF8.GetString(payloadByteList);
        return JsonConvert.DeserializeObject<T>(serializedPayload);
    }

    public async Task SetAsync<T>(string key, T payload, double cachingTime = 0,
        CancellationToken cancellationToken = default) where T : class
    {
        var serializedPayload = JsonConvert.SerializeObject(payload, new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        });

        var payloadByteList = Encoding.UTF8.GetBytes(serializedPayload);

        var options = new DistributedCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(cachingTime));

        await _distributedCache.SetAsync(key, payloadByteList, options, cancellationToken);
    }
}