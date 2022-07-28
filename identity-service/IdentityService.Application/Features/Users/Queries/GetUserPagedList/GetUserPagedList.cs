using System.Collections.Generic;
using Auth0.ManagementApi.Paging;
using FluentValidation.Results;
using IdentityService.Application.Common.Requests;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.GetUserPagedList
{
    public class GetUserPagedList : GetPagedList, IRequest<(List<ValidationFailure> errors, IPagedList<UserVm> users)>
    { 
       
    }
}