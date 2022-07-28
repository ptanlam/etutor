using System;
using System.Linq;
using FluentValidation;

namespace TutorService.Application.Features.Certificates.Commands.UpdateCertificateExpiresIn
{
    public class UpdateCertificateExpiresInValidator : AbstractValidator<UpdateCertificateExpiresIn>
    {
        public UpdateCertificateExpiresInValidator()
        {
            RuleFor(u => u.ExpiresIn).NotNull().NotEqual((DateTime) default);
            RuleFor(u => u.ExpiresIn)
                .GreaterThan(u => u.Tutor.Certificates.FirstOrDefault(c => c.Id == u.Id).DateOfIssue)
                .WithMessage("Expire date cannot be before than date of issue");
        }
    }
}