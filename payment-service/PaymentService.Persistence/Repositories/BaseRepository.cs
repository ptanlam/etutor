using PaymentService.Application.Contracts.Persistence;
using PaymentService.Domain.Common;

namespace PaymentService.Persistence.Repositories;

public class BaseRepository<T> : IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
    protected ApplicationDbContext DbContext { get; }

    public BaseRepository(ApplicationDbContext dbContext)
    {
        DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        DbContext.Set<T>().Add(entity);
        await DbContext.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await DbContext.Set<T>().FindAsync(id);
    }
}