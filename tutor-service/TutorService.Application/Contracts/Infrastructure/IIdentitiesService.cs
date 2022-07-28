using System.Collections.Generic;
using System.Threading.Tasks;

namespace TutorService.Application.Contracts.Infrastructure
{
    public interface IIdentitiesService
    {
        Task<GetUserDetailsResponse> GetUserDetails(string id);
        Task<IEnumerable<GetUserDetailsResponse>> GetUserIdsByConditions(string name, string genderId);
        Task<string> CheckUserExisting(string userId);
    }
}