using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CourseService.Application.Contracts.Infrastructure
{
    public interface IMessagingService
    {
        Task UploadFileList(string courseId, IFormFileCollection files);

        Task CreateSessions(
            Guid courseId, 
            string tutorId, 
            long startDate, 
            long endDate,
            string startAt, 
            string endAt, 
            string learningDays);
    }
}