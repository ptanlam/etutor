using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.GetUserDetails
{
    public class GetUserDetails : IRequest<UserDetailsVm>
    {
        public string Id { get; set; }
    }
}