using System.Threading.Tasks;
using EnrollmentService.Domain.Common;

namespace EnrollmentService.Application.Contracts.Persistence
{
    public interface IAsyncRepository<T> where T : class, IAggregateRoot
    {
        Task<T> AddAsync(T entity);
    }
}