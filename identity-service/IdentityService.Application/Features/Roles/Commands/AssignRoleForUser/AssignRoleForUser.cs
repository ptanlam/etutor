using MediatR;

namespace IdentityService.Application.Features.Roles.Commands.AssignRoleForUser
{
    public class AssignRoleForUser : IRequest
    {
        public string UserId { get; init; }
        public string Role { get; init; }
    }
}
