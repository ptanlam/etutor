using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Persistence;
using MediatR;

namespace IdentityService.Application.Features.Roles.Commands.AssignRoleForUser
{
    public class AssignRoleToUserHandler : IRequestHandler<Commands.AssignRoleForUser.AssignRoleForUser>
    {
        private readonly IRolesRepository _rolesRepository;

        public AssignRoleToUserHandler(IRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository ??
                throw new ArgumentNullException(nameof(rolesRepository));
        }

        public async Task<Unit> Handle(Commands.AssignRoleForUser.AssignRoleForUser request, CancellationToken
            cancellationToken)
        {
            // TODO: check whether or not role is valid
            await _rolesRepository.AssignRoleForUser(request.UserId, request.Role);
            return Unit.Value;
        }
    }
}
