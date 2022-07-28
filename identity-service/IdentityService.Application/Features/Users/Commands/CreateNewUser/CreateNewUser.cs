using System;
using System.Collections.Generic;
using FluentValidation.Results;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Commands.CreateNewUser
{
    public class CreateNewUser : IRequest<(List<ValidationFailure> errors, UserDetailsVm user)>
    {
        public string Email { get; init; }
        public string Password { get; init; }
        public string FirstName { get; init; }
        public string MiddleName { get; init; }
        public string LastName { get; init; }
        public DateTime DateOfBirth { get; init; }
        public string GenderId { get; init; }
        public string PhoneNumber { get; init; }
    }
}