using System.Threading.Tasks;

namespace CourseService.Application.Contracts.Infrastructure
{
    public interface ITutorsService
    {
        Task<GetTutorBasicInfoResponse> GetTutorBasicInfo(string tutorId);
        Task<GetTutorActiveRentalResponse> GetTutorActiveRental(string tutorId);
    }
}