using System;
using System.Threading.Tasks;
using EnrollmentService.Application.Contracts.Infrastructure;
using EnrollmentService.Infrastructure.IntegrationMessages.Commands;
using IdentityService.Infrastructure.IntegrationMessages.Commands;
using MassTransit;
using PaymentService.Infrastructure.IntegrationMessages.Commands;

namespace EnrollmentService.Infrastructure.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly IBusControl _busControl;

        public MessagingService(IBusControl busControl)
        {
            _busControl = busControl ?? throw new ArgumentNullException(nameof(busControl));
        }

        public async Task CreateSessionsForStudent(string studentId, string enrollmentId, string courseId,
            long startDate, long endDate, string startAt, string endAt, string learningDays)
        {
            var context = await _busControl.GetSendEndpoint(new Uri(
                "exchange:session?bind=true&/queue=session-bulk-creation-queue&type=direct"));

            await context.Send<BulkCreateSessionCommand>(new
            {
                EnrollmentId = enrollmentId,
                CourseId = courseId,
                OwnerId = studentId,
                StartDate = startDate,
                EndDate = endDate,
                StartAt = startAt,
                EndAt = endAt,
                LearningDays = learningDays,
            });
        }

        public async Task AssignRoleForStudent(string userId)
        {
            var context = await _busControl.GetSendEndpoint(new Uri(
                "exchange:identity?bind=true&queue=role-assign-queue&type=direct"));

            await context.Send<AssignRoleForUserCommand>(new {UserId = userId, Role = "etutor-student"});
        }

        public async Task CreateNewTransaction(string ownerId, string itemId, string type, decimal costAmount,
            string costUnit,
            string action)
        {
            var context = await _busControl.GetSendEndpoint(new Uri(
                "exchange:payment?bind=true&queue=transaction-create-queue&type=direct"));

            await context.Send<CreateNewTransactionCommand>(new
            {
                OwnerId = ownerId,
                ItemId = itemId,
                Type = type,
                CostAmount = costAmount,
                CostUnit = costUnit,
                Action = action,
            });
        }
    }
}