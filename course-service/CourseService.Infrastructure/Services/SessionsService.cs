using System;
using System.Threading.Tasks;
using CourseService.Application;
using CourseService.Application.Contracts.Infrastructure;
using Grpc.Core;

namespace CourseService.Infrastructure.Services
{
    public class SessionsService : ISessionsService
    {
        private readonly Sessions.SessionsClient _client;

        public SessionsService(Sessions.SessionsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<bool> HasSessionInPeriod(
            string tutorId, 
            string learningDays,
            DateTimeOffset startDate, 
            DateTimeOffset endDate, 
            string startAt, 
            string endAt)
        {
            try
            {
                var request = new CheckOverlappingSessionRequest()
                {
                    OwnerId = tutorId,
                    LearningDays = learningDays,
                    StartDate = startDate.ToUnixTimeMilliseconds(),
                    EndDate = endDate.ToUnixTimeMilliseconds(),
                    StartAt = startAt,
                    EndAt = endAt,
                };
        
                return (await _client.CheckOverlappingSessionAsync(request)).HasSession;
            }
            catch (RpcException)
            {
                return true;
            }
        }
    }
}
