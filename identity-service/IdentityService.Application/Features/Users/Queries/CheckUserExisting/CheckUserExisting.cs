using MediatR;

namespace IdentityService.Application.Features.Users.Queries.CheckUserExisting
{
    public class CheckUserExisting : IRequest<CheckUserExistingResponse>
    {
        public string Id { get; set; }
    }
}