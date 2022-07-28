using System.Collections.Generic;
using System.Linq;
using IdentityService.Application.Features.UserClaims.ViewModels;
using IdentityService.Application.Features.Users.ViewModels;

namespace IdentityService.Application.Features.Users.Helper
{
    public static class UserHelper
    {
        public static void AssignClaimsToUser(UserDetailsVm user, List<UserClaimVm> claims)
        {
            var claimList = claims.ToList();

            user.DateOfBirth = claimList.FirstOrDefault(c => c.Name == "dateOfBirth")?.Value ?? string.Empty;
            user.PhoneNumber = claimList.FirstOrDefault(c => c.Name == "phoneNumber")?.Value ?? string.Empty;
        }
    }
}