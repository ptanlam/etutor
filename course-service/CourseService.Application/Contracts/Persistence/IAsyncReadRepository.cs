using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseService.Domain.Common;

namespace CourseService.Application.Contracts.Persistence
{
    public interface IAsyncReadRepository<T> where T : class, IAggregateRoot
    {
        Task<List<T>> ListAsync();
        Task<T> GetByIdAsync(Guid id);
    }
}