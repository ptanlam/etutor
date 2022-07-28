using System;
using System.Text.RegularExpressions;
using FluentValidation;

namespace IdentityService.Application.Features.Users.Commands.CreateNewUser
{
    public class CreateNewUserValidator : AbstractValidator<CreateNewUser>
    {
        public CreateNewUserValidator()
        {
            RuleFor(c => c.Email).EmailAddress().NotNull();
            RuleFor(c => c.Password).NotNull().MinimumLength(8).MaximumLength(250)
                .Must(password => Regex.IsMatch(password, 
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"));
            
            RuleFor(c => c.FirstName).NotNull().MinimumLength(2).MaximumLength(50);
            RuleFor(c => c.LastName).NotNull().MinimumLength(2).MaximumLength(50);
            RuleFor(c => c.MiddleName).MinimumLength(2).MaximumLength(50)
                .When(c => !string.IsNullOrEmpty(c.MiddleName));
            
            RuleFor(c => c.GenderId).NotNull().MaximumLength(50);
            RuleFor(c => c.DateOfBirth).NotNull().LessThan(DateTime.Now);
        }
    }
}