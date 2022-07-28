using EnrollmentService.Domain.Common;

namespace EnrollmentService.Application.Contracts.Persistence
{
    public interface IAsyncReadRepository<T> where T : class, IAggregateRoot
    {
    }
}