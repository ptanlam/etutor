using PaymentService.Domain.MethodAggregate;

namespace PaymentService.Application.Contracts.Persistence;

public interface IMethodsRepository : IRepository<Method>, IReadRepository<Method>
{
    Task<(IEnumerable<Method> methods, int totalCount)> ListAndCountForUserAsync(int pageNumber, int pageSize,
        string userId, CancellationToken cancellationToken = default);
}