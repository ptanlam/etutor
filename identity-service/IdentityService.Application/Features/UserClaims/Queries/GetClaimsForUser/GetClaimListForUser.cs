using System.Collections.Generic;
using IdentityService.Application.Features.UserClaims.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Queries.GetClaimsForUser
{
    public class GetClaimListForUser : IRequest<IEnumerable<UserClaimVm>>
    {
        public string UserId { get; init; }
    }
}