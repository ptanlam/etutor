using System.Collections.Generic;
using FluentValidation.Results;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUser : IRequest<(IEnumerable<ValidationFailure> errors, UserDetailsVm userDetailsVm)>
    {
        public string Id { get; set; }
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public string MiddleName { get; init; }
        public string GenderId { get; init; }
        public string DateOfBirth { get; init; }
    }
}