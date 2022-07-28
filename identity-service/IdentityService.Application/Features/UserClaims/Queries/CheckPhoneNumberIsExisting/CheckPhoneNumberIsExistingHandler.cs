using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Persistence;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Queries.CheckPhoneNumberIsExisting
{
    public class CheckPhoneNumberIsExistingHandler : IRequestHandler<CheckPhoneNumberIsExisting, bool>
    {
        private readonly IUserClaimsRepository _userClaimsRepository;

        public CheckPhoneNumberIsExistingHandler(IUserClaimsRepository userClaimsRepository)
        {
            _userClaimsRepository =
                userClaimsRepository ?? throw new ArgumentNullException(nameof(userClaimsRepository));
        }

        public async Task<bool> Handle(CheckPhoneNumberIsExisting request, CancellationToken cancellationToken)
        {
            return await _userClaimsRepository.GetByConditionsAsync("phoneNumber", request.PhoneNumber,
                cancellationToken) != null;
        }
    }
}