using System.Threading.Tasks;
using EnrollmentService.Domain.PerformerAggregate;

namespace EnrollmentService.Application.Contracts.Persistence
{
    public interface IPerformersRepository : IAsyncReadRepository<Performer>, IAsyncRepository<Performer>
    {
        Task<Performer> GetByEmailAsync(string email);
    }
}