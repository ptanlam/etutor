using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipelines;
using System.Text;
using System.Threading.Tasks;
using CourseService.Application;
using CourseService.Application.Contracts.Infrastructure;
using Google.Protobuf;
using Google.Protobuf.Collections;
using Grpc.Core;
using Microsoft.AspNetCore.Http;
using File = CourseService.Application.File;

namespace CourseService.Infrastructure.Services
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

        public async Task<UploadFilesForOwnerResponse> UploadFileListForSyllabus(Guid syllabusId, 
            IFormFileCollection files)
        {
            if (files == null) return new UploadFilesForOwnerResponse();
            
            try
            {
                var uploadedFileRequestList = new RepeatedField<UploadFileRequest>();
                foreach (var file in files)
                {
                    await using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream);

                    var byteArray = memoryStream.ToArray();

                    var uploadedFileRequest = new UploadFileRequest()
                    {
                        Buffer = ByteString.CopyFrom(byteArray),
                        Filename = file.FileName,
                        Mimetype = file.ContentType
                    };

                    uploadedFileRequestList.Add(uploadedFileRequest);
                }

                var uploadFileListForSyllabusRequest = new UploadFilesForOwnerRequest()
                    {OwnerId = syllabusId.ToString()};
                uploadFileListForSyllabusRequest.Files.AddRange(uploadedFileRequestList);

                return await _client.UploadForOwnerAsync(uploadFileListForSyllabusRequest);
            }
            catch (RpcException)
            {
                return new UploadFilesForOwnerResponse();
            }
        }
    }
}