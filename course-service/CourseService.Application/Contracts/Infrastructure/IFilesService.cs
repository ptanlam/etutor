using System;
using System.Threading.Tasks;
using Google.Protobuf.Collections;
using Microsoft.AspNetCore.Http;

namespace CourseService.Application.Contracts.Infrastructure
{
    public interface IFilesService
    {
        Task<RepeatedField<File>> GetFileListForOwner(string ownerId);
        Task<UploadFilesForOwnerResponse> UploadFileListForSyllabus(Guid syllabusId, IFormFileCollection files);
    }
}