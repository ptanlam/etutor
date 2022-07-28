using IdentityService.Domain.UserAggregate;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Commands.UpdateUserClaim
{
    public class UpdateUserClaim : IRequest<UserClaim>
    {
        public string UserId { get; init; }
        public string Name { get; init; }
        public string Value { get; init; }
    }
}