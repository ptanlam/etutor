using Microsoft.EntityFrameworkCore;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Domain.TransactionAggregate;

namespace PaymentService.Persistence.Repositories;

public class TransactionsRepository : BaseRepository<Transaction>, ITransactionsRepository
{
    public TransactionsRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }


    public async Task<(IEnumerable<Transaction> transactions, int totalCount)> ListForOwnerAsync(string ownerId,
        int pageNumber, int pageSize, CancellationToken cancellationToken)
    {
        var transaction = await DbContext.Transactions.Where(t => t.OwnerId == ownerId)
            .OrderByDescending(t => t.Tracking.CreatedAt).Skip((pageNumber - 1) * pageSize).Take(pageSize)
            .ToListAsync(cancellationToken);

        var totalCount = await DbContext.Transactions.CountAsync(cancellationToken);

        return (transaction, totalCount);
    }
}