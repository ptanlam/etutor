using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using TutorService.Application;
using TutorService.Application.Contracts.Infrastructure;

namespace TutorService.Infrastructure.Services
{
    public class FilesService : IFilesService
    {
        private readonly Files.FilesClient _client;

        public FilesService(Files.FilesClient client)
        {
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<IEnumerable<File>> GetImageListForOwner(string ownerId, string prefix = "")
        {
            try
            {
                var actualOwnerId = string.IsNullOrEmpty(prefix) ? ownerId : $"{prefix}_{ownerId}";
                var request = new GetAllForOwnerRequest {OwnerId = actualOwnerId};
                var response = await _client.GetAllForOwnerAsync(request);
                return response.Files;
            }
            catch (RpcException)
            {
                return new List<File>();
            }
        }
    }
}