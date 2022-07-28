using System;
using System.Threading.Tasks;

namespace CourseService.Application.Contracts.Infrastructure
{
    public interface ISessionsService
    {
        Task<bool> HasSessionInPeriod(
            string tutorId, 
            string learningDays, 
            DateTimeOffset startDate, 
            DateTimeOffset endDate, 
            string startAt, 
            string endAt);
    }
}
