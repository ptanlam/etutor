using System.Collections.Generic;

namespace TutorService.Infrastructure.IntegrationMessages.Commands
{
    public interface UploadImageListForTutorCommand
    {
        string OwnerId { get; }
        IEnumerable<UploadedImage> Files { get; }
    }
}