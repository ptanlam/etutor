using PaymentService.Domain.Common;

namespace PaymentService.Application.Contracts.Persistence;

public interface IRepository<T> where T : class, IAggregateRoot
{
    Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
}