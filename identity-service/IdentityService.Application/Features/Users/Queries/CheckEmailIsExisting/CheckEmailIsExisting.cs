using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.CheckEmailIsExisting
{
    public class CheckEmailIsExisting : IRequest<bool>
    {
        public string Email { get; init; } 
    }
}