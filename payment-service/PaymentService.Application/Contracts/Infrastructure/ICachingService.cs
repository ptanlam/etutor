namespace PaymentService.Application.Contracts.Infrastructure;

public interface ICachingService
{
    Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default) where T : class;

    Task SetAsync<T>(string key, T payload, double cachingTime = 0, CancellationToken cancellationToken = default)
        where T : class;
}