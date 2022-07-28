using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Persistence;
using CourseService.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Persistence.Repositories
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

        public async Task<T> UpdateAsync(T entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;
            await DbContext.SaveChangesAsync();
            return entity;
        }

        public async Task<List<T>> ListAsync()
        {
            return await DbContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await DbContext.Set<T>().FindAsync(id);
        }
    }
}