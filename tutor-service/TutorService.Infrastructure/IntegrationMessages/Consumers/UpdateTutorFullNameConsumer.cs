using System;
using System.Threading.Tasks;
using MassTransit;
using TutorService.Application.Contracts.Persistence;
using TutorService.Infrastructure.IntegrationMessages.Commands;

namespace TutorService.Infrastructure.IntegrationMessages.Consumers
{
    public class UpdateTutorFullNameConsumer : IConsumer<UpdateTutorFullNameCommand>
    {
        private readonly ITutorsRepository _tutorsRepository;

        public UpdateTutorFullNameConsumer(ITutorsRepository tutorsRepository)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
        }

        public async Task Consume(ConsumeContext<UpdateTutorFullNameCommand> context)
        {
            await _tutorsRepository.UpdateTutorFullName(context.Message.UserId, context.Message.FullName);
        }
    }
}