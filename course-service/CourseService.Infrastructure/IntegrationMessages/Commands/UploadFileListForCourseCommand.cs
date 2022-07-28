using System.Collections.Generic;

namespace CourseService.Infrastructure.IntegrationMessages.Commands
{
    public interface UploadFileListForCourseCommand
    {
        string OwnerId { get; }
        IEnumerable<FileUploadingDto> Files { get; }
    }
}