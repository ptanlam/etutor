using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Persistence.Repositories
{
    public class BaseRepository<T> : IAsyncReadRepository<T>, IAsyncRepository<T> where T : class
    {
        protected readonly ApplicationDbContext DbContext;

        public BaseRepository(ApplicationDbContext dbContext)
        {
            DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<List<T>> ListAllAsync()
        {
            return await DbContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await DbContext.Set<T>().FindAsync(id);
        }


        public async Task<T> AddAsync(T entity)
        {
            var result = await DbContext.Set<T>().AddAsync(entity);
            await DbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;
            await DbContext.SaveChangesAsync();
            return entity;
        }
    }
}