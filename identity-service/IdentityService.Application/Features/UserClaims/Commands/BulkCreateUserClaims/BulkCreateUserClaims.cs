using System;
using System.Collections.Generic;
using IdentityService.Application.Features.UserClaims.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.UserClaims.Commands.BulkCreateUserClaims
{
    public class BulkCreateUserClaims : IRequest<IEnumerable<UserClaimVm>>
    {
        public string UserId { get; init; }
        public DateTime DateOfBirth { get; init; }
        public string GenderId { get; init; }
        public string PhoneNumber { get; init; }
    }
}