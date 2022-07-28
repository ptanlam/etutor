using FluentValidation;

namespace TutorService.Application.Features.Certificates.Commands.UpdateCertificateForTutor
{
    public class UpdateCertificateForTutorValidator : AbstractValidator<UpdateCertificateForTutor>
    {
        public UpdateCertificateForTutorValidator()
        {
            RuleFor(u => u.Name).MaximumLength(250).When(u => string.IsNullOrEmpty(u.Name));
            RuleFor(u => u.PlaceOfIssue).MaximumLength(250).When(u => string.IsNullOrEmpty(u.PlaceOfIssue));
        }
    }
}