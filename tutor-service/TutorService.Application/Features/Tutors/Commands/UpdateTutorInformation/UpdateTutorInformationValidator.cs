using FluentValidation;

namespace TutorService.Application.Features.Tutors.Commands.UpdateTutorInformation
{
    public class UpdateTutorInformationValidator : AbstractValidator<UpdateTutorInformation>
    {
        public UpdateTutorInformationValidator()
        {
            RuleFor(u => u.Description).MaximumLength(250)
                .When(t => !string.IsNullOrEmpty(t.Description));
        }
    }
}