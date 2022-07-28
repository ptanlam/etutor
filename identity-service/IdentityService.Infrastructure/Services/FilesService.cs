using System;
using System.Threading.Tasks;
using Google.Protobuf.Collections;
using Grpc.Core;
using IdentityService.Application;
using IdentityService.Application.Contracts.Infrastructure;

namespace IdentityService.Infrastructure.Services
{
    public class FilesService : IFilesService
    {
        private readonly Files.FilesClient _client;

        public FilesService(Files.FilesClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<RepeatedField<File>> GetFileListForOwner(string ownerId)
        {
            try
            {
                var request = new GetAllForOwnerRequest {OwnerId = ownerId};
                return (await _client.GetAllForOwnerAsync(request)).Files;
            }
            catch (RpcException)
            {
                return new RepeatedField<File>();
            }
        }
    }
}