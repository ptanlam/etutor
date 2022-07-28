using System;
using System.Threading.Tasks;
using Grpc.Core;
using IdentityService.Application;
using IdentityService.Application.Contracts.Infrastructure;

namespace IdentityService.Infrastructure.Services
{
    public class ConstantsService : IConstantsService
    {
        private readonly Constants.ConstantsClient _client;

        public ConstantsService(Constants.ConstantsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }
        
        public async Task<string> GetGenderById(string id)
        {
            if (string.IsNullOrEmpty(id)) return string.Empty;
            
            try
            {
                var request = new GetConstantRequest {Id = id};
                var response = await _client.GetGenderByIdAsync(request);
                return response.Name;
            }
            catch (RpcException)
            {
                return string.Empty;
            }
        }
    }
}