using System;
using System.Threading.Tasks;
using IdentityService.Application.Features.Roles.Commands.AssignRoleForUser;
using IdentityService.Infrastructure.IntegrationMessages.Commands;
using MassTransit;
using MediatR;

namespace IdentityService.Infrastructure.IntegrationMessages.Consumers
{
    public class AssignRoleForUserConsumer : IConsumer<AssignRoleForUserCommand>
    {
        private readonly IMediator _mediator;

        public AssignRoleForUserConsumer(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        public async Task Consume(ConsumeContext<AssignRoleForUserCommand> context)
        {
            var assignRoleForUser = new AssignRoleForUser
            {
                UserId = context.Message.UserId,
                Role = context.Message.Role
            };

            await _mediator.Send(assignRoleForUser);
        }
    }
}
