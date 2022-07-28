using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Commands.SetTutorActiveStatus
{
    public class SetTutorActiveStatusHandler : IRequestHandler<SetTutorActiveStatus, Tutor>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IMessagingService _messagingService;
        private readonly IIdentitiesService _identitiesService;

        public SetTutorActiveStatusHandler(ITutorsRepository tutorsRepository, IMessagingService messagingService,
            IIdentitiesService identitiesService
        )
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _messagingService = messagingService ?? throw new ArgumentNullException(nameof(messagingService));
            _identitiesService = identitiesService ?? throw new ArgumentNullException(nameof(identitiesService));
        }

        public async Task<Tutor> Handle(SetTutorActiveStatus request,
            CancellationToken cancellationToken)
        {
            if (request.IsActive)
            {
                request.Tutor.Activate();
                await _messagingService.AssignRoleForTutor(request.Tutor.UserId);

                var user = await _identitiesService.GetUserDetails(request.Tutor.UserId);
                await _messagingService.AddNotificationForTutor(user.Id, "Tutor registration",
                    "Your tutor registration request has been approved.", user.Email);
            }
            else
            {
                request.Tutor.Deactivate();
                // TODO: remove tutor role from de-activated user
            }

            await _tutorsRepository.UpdateAsync(request.Tutor);
            return request.Tutor;
        }
    }
}