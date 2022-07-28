using System;
using FluentValidation;

namespace TutorService.Application.Features.Certificates.Commands.AddCertificateForTutor
{
    public class AddCertificateForTutorValidator : AbstractValidator<AddCertificateForTutor>
    {
        public AddCertificateForTutorValidator()
        {
            RuleFor(c => c.Name).MaximumLength(250).NotEmpty().NotNull();
            RuleFor(c => c.PlaceOfIssue).MaximumLength(250).NotEmpty().NotNull();
            RuleFor(c => c.DateOfIssue).NotNull().NotEqual((DateTime) default).LessThan(c => c.ExpiresIn);
            RuleFor(c => c.ExpiresIn).NotNull().NotEqual((DateTime) default).GreaterThan(c => c.DateOfIssue);
        }
    }
}