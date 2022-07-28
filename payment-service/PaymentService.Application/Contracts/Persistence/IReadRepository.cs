using PaymentService.Domain.Common;

namespace PaymentService.Application.Contracts.Persistence;

public interface IReadRepository<T> where T : class, IAggregateRoot
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}