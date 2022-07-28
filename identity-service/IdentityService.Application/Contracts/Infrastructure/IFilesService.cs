using System.Threading.Tasks;
using Google.Protobuf.Collections;

namespace IdentityService.Application.Contracts.Infrastructure
{
    public interface IFilesService
    {
        Task<RepeatedField<File>> GetFileListForOwner(string ownerId);
    }
}