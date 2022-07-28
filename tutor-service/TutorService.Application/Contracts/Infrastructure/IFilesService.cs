using System.Collections.Generic;
using System.Threading.Tasks;

namespace TutorService.Application.Contracts.Infrastructure
{
    public interface IFilesService
    {
        Task<IEnumerable<File>> GetImageListForOwner(string ownerId, string prefix = "");
    }
}