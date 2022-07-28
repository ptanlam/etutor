using System;
using System.Threading.Tasks;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Domain.Common;

namespace EnrollmentService.Persistence.Repositories
{
    public class BaseRepository<T> : IAsyncReadRepository<T>, IAsyncRepository<T> where T : class, IAggregateRoot
    {
        public ApplicationDbContext DbContext { get; }

        public BaseRepository(ApplicationDbContext dbContext)
        {
            DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<T> AddAsync(T entity)
        {
            var inserted = DbContext.Set<T>().Add(entity).Entity;
            await DbContext.SaveChangesAsync();
            return inserted;
        }
    }
}