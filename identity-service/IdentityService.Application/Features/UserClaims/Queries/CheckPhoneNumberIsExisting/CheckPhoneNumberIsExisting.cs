using MediatR;

namespace IdentityService.Application.Features.UserClaims.Queries.CheckPhoneNumberIsExisting
{
    public class CheckPhoneNumberIsExisting : IRequest<bool>
    {
        public string PhoneNumber { get; init; }
    }
}