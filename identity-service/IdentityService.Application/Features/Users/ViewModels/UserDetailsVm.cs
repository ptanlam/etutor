using Auth0.ManagementApi.Models;
using Auth0.ManagementApi.Paging;

namespace IdentityService.Application.Features.Users.ViewModels
{
    public class UserDetailsVm : UserVm
    {
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string AvatarUrl { get; set; }
        public IPagedList<Role> Roles { get; set; }
    }
}