using System;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Infrastructure;
using MassTransit;
using TutorService.Infrastructure.IntegrationMessages.Commands;

namespace IdentityService.Infrastructure.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly IBusControl _busControl;

        public MessagingService(IBusControl busControl)
        {
            _busControl = busControl ?? throw new ArgumentNullException(nameof(busControl));
        }

        public async Task UpdateTutorFullName(string userId, string fullName)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(fullName)) return;

            var context = await _busControl.GetSendEndpoint(
                new Uri("exchange:tutor?bind=true&queue=tutor-update-queue&type=direct"));

            await context.Send<UpdateTutorFullNameCommand>(new
            {
                UserId = userId,
                FullName = fullName,
            });
        }
    }
}