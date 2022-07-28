using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Infrastructure.IntegrationMessages.Commands;
using Google.Protobuf;
using MassTransit;
using Microsoft.AspNetCore.Http;

namespace CourseService.Infrastructure.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly IBusControl _busControl;

        public MessagingService(IBusControl busControl)
        {
            _busControl = busControl;
        }

        public async Task UploadFileList(string courseId, IFormFileCollection files)
        {
            if (files == null || !files.Any()) return;
            var fileUploadingDtoList = new List<FileUploadingDto>();

            await Task.WhenAll(files.Select(async file =>
            {
                await using var ms = new MemoryStream();
                await file.CopyToAsync(ms);
                
                var byteArray = ms.ToArray();

                fileUploadingDtoList.Add(new FileUploadingDto
                {
                    Filename = file.FileName,
                    Buffer = ByteString.CopyFrom(byteArray),
                    Mimetype = file.ContentType
                });
            }));

            var context = await _busControl.GetSendEndpoint(
                new Uri("exchange:storage?bind=true&queue=storage-upload-queue&type=direct"));

            await context.Send<UploadFileListForCourseCommand>(new
            {
                OwnerId = courseId,
                Files = fileUploadingDtoList
            });
        }

        public async Task CreateSessions(
            Guid courseId,
            string tutorId,
            long startDate,
            long endDate, 
            string startAt,
            string endAt,
            string learningDays)
        {
            var context = await _busControl.GetSendEndpoint(new Uri(
                "exchange:session?bind=true&queue=session-bulk-creation-queue&type=direct"));

            await context.Send<BulkCreateSessionCommand>(new
            {
                CourseId = courseId,
                OwnerId = tutorId,
                StartDate = startDate.ToString(CultureInfo.InvariantCulture),
                EndDate = endDate.ToString(CultureInfo.InvariantCulture),
                StartAt = startAt,
                EndAt = endAt,
                LearningDays = learningDays,
            });

        }
    }
}
