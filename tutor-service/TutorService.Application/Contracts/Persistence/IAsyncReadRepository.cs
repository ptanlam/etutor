using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TutorService.Application.Contracts.Persistence
{
    public interface IAsyncReadRepository<T>
    {
        Task<List<T>> ListAllAsync();
        Task<T> GetByIdAsync(Guid id);
    }
}