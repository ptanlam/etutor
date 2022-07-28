using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Domain.UserAggregate;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Commands.UpdateUserClaim
{
    public class UpdateUserClaimHandler : IRequestHandler<UpdateUserClaim, UserClaim>
    {
        private readonly IUserClaimsRepository _userClaimsRepository;

        public UpdateUserClaimHandler(IUserClaimsRepository userClaimsRepository)
        {
            _userClaimsRepository =
                userClaimsRepository ?? throw new ArgumentNullException(nameof(userClaimsRepository));
        }

        public async Task<UserClaim> Handle(UpdateUserClaim request, CancellationToken cancellationToken)
        {
            return await _userClaimsRepository.UpdateAsync(request.UserId, request.Name, request.Value,
                cancellationToken);
        }
    }
}