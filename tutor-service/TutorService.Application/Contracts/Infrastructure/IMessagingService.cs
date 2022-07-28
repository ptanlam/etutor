using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TutorService.Application.Features.Tutors.Dtos;

namespace TutorService.Application.Contracts.Infrastructure
{
    public interface IMessagingService
    {
        Task UploadImages(string ownerId, IFormFileCollection files, string prefix = "");
        Task AddSubjectsForTutor(string tutorId, IEnumerable<SubjectCreationDto> subjectCreationDtos);
        Task AssignRoleForTutor(string userId);
        Task AddNotificationForTutor(string userId, string title, string content, string email = "");
    }
}