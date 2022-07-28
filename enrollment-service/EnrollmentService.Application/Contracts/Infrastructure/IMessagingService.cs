using System;
using System.Threading.Tasks;

namespace EnrollmentService.Application.Contracts.Infrastructure
{
    public interface IMessagingService
    {
        Task CreateSessionsForStudent(string studentId, string enrollmentId, string courseId, long startDate,
            long endDate, string startAt, string endAt, string learningDays);

        Task AssignRoleForStudent(string userId);

        Task CreateNewTransaction(string ownerId, string itemId, string type, decimal costAmount, string costUnit,
            string action);
    }
}