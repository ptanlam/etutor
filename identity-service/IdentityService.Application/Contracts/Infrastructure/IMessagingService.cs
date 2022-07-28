using System.Threading.Tasks;

namespace IdentityService.Application.Contracts.Infrastructure
{
    public interface IMessagingService
    {
        Task UpdateTutorFullName(string userId, string fullName);
    }
}