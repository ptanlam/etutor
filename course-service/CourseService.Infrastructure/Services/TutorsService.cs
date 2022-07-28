using System;
using System.Threading.Tasks;
using CourseService.Application;
using CourseService.Application.Contracts.Infrastructure;
using Grpc.Core;

namespace CourseService.Infrastructure.Services
{
    public class TutorsService : ITutorsService
    {
        private readonly Tutors.TutorsClient _client;

        public TutorsService(Tutors.TutorsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }
        
        public async Task<GetTutorBasicInfoResponse> GetTutorBasicInfo(string tutorId)
        {
            try
            {
                var request = new GetTutorBasicInfoRequest {Id = tutorId};
                return await _client.GetTutorBasicInfoAsync(request);
            }
            catch (RpcException)
            {
                return new GetTutorBasicInfoResponse();
            }
        }

        public async Task<GetTutorActiveRentalResponse> GetTutorActiveRental(string tutorId)
        {
            try
            {
                var request = new GetTutorActiveRentalRequest {TutorId = tutorId};
                return await _client.GetTutorActiveRentalAsync(request);
            }
            catch (RpcException)
            {
                return new GetTutorActiveRentalResponse();
            }
        }
    }
}