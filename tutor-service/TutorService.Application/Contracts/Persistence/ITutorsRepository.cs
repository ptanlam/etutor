using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Contracts.Persistence
{
    public interface ITutorsRepository : IAsyncReadRepository<Tutor>, IAsyncRepository<Tutor>
    {
        Task<List<Tutor>> ListAsync();
        Task<List<Tutor>> ListByConditionsAsync(List<string> tutorIdList, List<string> userIdList);
        Task<IEnumerable<string>> NameListAsync(string query, CancellationToken cancellationToken);
        Task<List<Tutor>> ListAsyncForAdmin(bool isActive);
        Task UpdateTutorFullName(string userId, string fullName);
        Task<Tutor> GetForUserAsync(string userId);
    }
}