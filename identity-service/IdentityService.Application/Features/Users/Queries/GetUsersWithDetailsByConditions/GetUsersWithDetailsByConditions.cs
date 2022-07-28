using System.Collections.Generic;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.GetUsersWithDetailsByConditions
{
    public class GetUsersWithDetailsByConditions : IRequest<IEnumerable<UserDetailsVm>>
    {
        public string Name { get; init; }
        public string GenderId { get; init; }
    }
}