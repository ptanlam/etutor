using System;
using System.Threading.Tasks;
using Grpc.Core;
using TutorService.Application;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Infrastructure.Services
{
    public class ConstantsService : IConstantsService
    {
        private readonly Constants.ConstantsClient _client;

        public ConstantsService(Constants.ConstantsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<string> GetAcademicRankById(string id)
        {
            try
            {
                var request = new GetConstantRequest() {Id = id};
                return (await _client.GetAcademicRankByIdAsync(request)).Name;
            }
            catch (RpcException)
            {
                return string.Empty;
            }
        }
    }
}