using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using TutorService.Application;
using TutorService.Application.Contracts.Infrastructure;

namespace TutorService.Infrastructure.Services
{
    public class IdentitiesService : IIdentitiesService
    {
        private readonly Identities.IdentitiesClient _client;

        public IdentitiesService(Identities.IdentitiesClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<GetUserDetailsResponse> GetUserDetails(string id)
        {
            try
            {
                var request = new GetUserDetailsRequest {Id = id};
                return await _client.GetUserDetailsAsync(request);
            }
            catch (RpcException)
            {
                return new GetUserDetailsResponse();
            }
        }

        public async Task<IEnumerable<GetUserDetailsResponse>> GetUserIdsByConditions(string name, string genderId)
        {
            try
            {
                var request = new GetUsersWithDetailsByConditionsRequest() {Name = name, GenderId = genderId};
                var response = await _client.GetUsersWithDetailsByConditionsAsync(request);
                return response.Users;
            }
            catch (RpcException)
            {
                return new List<GetUserDetailsResponse>();
            }
        }

        public async Task<string> CheckUserExisting(string userId)
        {
            try
            {
                var request = new GetUserDetailsRequest {Id = userId};
                return (await _client.CheckUserExistingAsync(request)).Id;
            }
            catch (RpcException)
            {
                return string.Empty;
            }
        }
    }
}