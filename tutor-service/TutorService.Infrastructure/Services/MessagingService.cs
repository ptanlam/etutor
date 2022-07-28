using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CourseService.Infrastructure.IntegrationMessages.Commands;
using IdentityService.Infrastructure.IntegrationMessages.Commands;
using MassTransit;
using Microsoft.AspNetCore.Http;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Features.Tutors.Dtos;
using TutorService.Infrastructure.IntegrationMessages.Commands;

namespace TutorService.Infrastructure.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly IBusControl _busControl;

        public MessagingService(IBusControl busControl)
        {
            _busControl = busControl ?? throw new ArgumentNullException(nameof(busControl));
        }

        public async Task UploadImages(string ownerId, IFormFileCollection files, string prefix = "")
        {
            if (files == null) return;

            var uploadingImageListCommands = new List<UploadedImage>();
            foreach (var file in files)
            {
                await using var ms = new MemoryStream();
                await file.CopyToAsync(ms);

                uploadingImageListCommands.Add(new UploadedImage
                {
                    Filename = file.FileName,
                    Buffer = Google.Protobuf.ByteString.CopyFrom(ms.ToArray()),
                    Mimetype = file.ContentType
                });
            }

            var context = await _busControl.GetSendEndpoint(
                new Uri("exchange:storage?bind=true&queue=storage-upload-queue&type=direct"));

            await context.Send<UploadImageListForTutorCommand>(new
            {
                OwnerId = string.IsNullOrEmpty(prefix) ? ownerId : $"{prefix}_{ownerId}",
                Files = uploadingImageListCommands
            });
        }

        public async Task AddSubjectsForTutor(string tutorId, IEnumerable<SubjectCreationDto> subjectCreationDtos)
        {
            var context = await _busControl.GetSendEndpoint(new Uri(
                "exchange:course?bind=true&queue=subject-add-queue&type=direct"));

            await context.Send<AddSubjectForTutorCommand>(new
            {
                TutorId = tutorId,
                Subjects = subjectCreationDtos
            });
        }

        public async Task AssignRoleForTutor(string userId)
        {
            var context = await _busControl.GetSendEndpoint(new Uri(
                "exchange:identity?bind=true&queue=role-assign-queue&type=direct"));

            await context.Send<AssignRoleForUserCommand>(new
            {
                UserId = userId,
                // TODO: find another way to get role
                Role = "etutor-tutor"
            });
        }

        public async Task AddNotificationForTutor(string userId, string title, string content, string email = "")
        {
            var context = await _busControl.GetSendEndpoint(
                new Uri("exchange:notification?bind=true&queue=notification-add-queue&type=direct"));

            await context.Send<AddNotificationCommand>(new
            {
                UserId = userId,
                Title = title,
                Content = content,
                Email = email,
            });
        }
    }
}