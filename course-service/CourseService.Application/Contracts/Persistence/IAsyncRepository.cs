using System.Threading.Tasks;
using CourseService.Domain.Common;

namespace CourseService.Application.Contracts.Persistence
{
    public interface IAsyncRepository<T> where T : class, IAggregateRoot
    {
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
    }
}