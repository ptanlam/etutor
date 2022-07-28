using System.Threading.Tasks;

namespace TutorService.Application.Contracts.Persistence
{
    public interface IAsyncRepository<T>
    {
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
    }
}