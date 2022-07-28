using System;
using System.Threading.Tasks;
using EnrollmentService.Application;
using EnrollmentService.Application.Contracts.Infrastructure;
using Grpc.Core;

namespace EnrollmentService.Infrastructure.Services
{
    public class SessionsService : ISessionsService
    {
        private readonly Sessions.SessionsClient _client;

        public SessionsService(Sessions.SessionsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }
        
        public async Task<bool> CheckOverlappingSessions(CheckOverlappingSessionRequest request)
        {
            try
            {
                return (await _client.CheckOverlappingSessionAsync(request)).HasSession;
            }
            catch (RpcException)
            {
                return true;
            }
        }
    }
}