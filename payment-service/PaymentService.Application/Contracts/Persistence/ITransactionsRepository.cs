using PaymentService.Domain.TransactionAggregate;

namespace PaymentService.Application.Contracts.Persistence;

public interface ITransactionsRepository : IReadRepository<Transaction>, IRepository<Transaction>
{
    Task<(IEnumerable<Transaction> transactions, int totalCount)> ListForOwnerAsync(string ownerId, int pageNumber,
        int pageSize, CancellationToken cancellationToken);
}