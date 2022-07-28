using System;
using System.Threading.Tasks;
using CourseService.Application;
using CourseService.Application.Contracts.Infrastructure;
using Grpc.Core;

namespace CourseService.Infrastructure.Services
{
    public class ConstantsService : IConstantsService
    {
        private readonly Constants.ConstantsClient _client;

        public ConstantsService(Constants.ConstantsClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<string> GetEducationalLevelById(string id)
        {
            if (string.IsNullOrEmpty(id)) return string.Empty;

            try
            {
                var request = new GetConstantRequest {Id = id};
                return (await _client.GetEducationalLevelByIdAsync(request)).Name;
            }
            catch (RpcException)
            {
                return string.Empty;
            }
        }

        public async Task<string> GetEducationalGradeById(string id)
        {
            if (string.IsNullOrEmpty(id)) return string.Empty;

            try
            {
                var request = new GetConstantRequest {Id = id};
                return (await _client.GetEducationalGradeByIdAsync(request)).Name;
            }
            catch (RpcException)
            {
                return string.Empty;
            }
        }
    }
}