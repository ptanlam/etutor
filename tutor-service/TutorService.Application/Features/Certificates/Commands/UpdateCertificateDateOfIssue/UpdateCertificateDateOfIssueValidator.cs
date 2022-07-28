using System;
using System.Linq;
using FluentValidation;

namespace TutorService.Application.Features.Certificates.Commands.UpdateCertificateDateOfIssue
{
    public class UpdateCertificateDateOfIssueValidator : AbstractValidator<UpdateCertificateDateOfIssue>
    {
        public UpdateCertificateDateOfIssueValidator()
        {
            RuleFor(u => u.DateOfIssue).NotNull().NotEqual((DateTime) default);
            RuleFor(u => u.DateOfIssue)
                .LessThan(u => u.Tutor.Certificates.FirstOrDefault(c => c.Id == u.Id).ExpiresIn)
                .WithMessage("Issued date cannot be after than expired date.");
        }
    }
}