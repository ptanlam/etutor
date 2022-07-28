using System.Threading.Tasks;

namespace EnrollmentService.Application.Contracts.Infrastructure
{
    public interface ISessionsService
    {
        Task<bool> CheckOverlappingSessions(CheckOverlappingSessionRequest request);
    }
}