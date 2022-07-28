using Microsoft.EntityFrameworkCore;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Domain.MethodAggregate;

namespace PaymentService.Persistence.Repositories;

public class MethodsRepository : BaseRepository<Method>, IMethodsRepository
{
    public MethodsRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<(IEnumerable<Method> methods, int totalCount)> ListAndCountForUserAsync(int pageNumber,
        int pageSize, string userId, CancellationToken cancellationToken)
    {
        var methods = await DbContext.Methods.Where(m => m.UserId == userId)
            .OrderByDescending(m => m.Tracking.CreatedAt)
            .ThenByDescending(m => m.IsActive)
            .ThenByDescending(m => m.IsPreferred)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize).ToListAsync(cancellationToken);

        var totalCount = await DbContext.Methods.CountAsync(m => m.UserId == userId, cancellationToken);

        return (methods, totalCount);
    }
}