using FluentValidation;

namespace TutorService.Application.Features.Degrees.Commands.UpdateDegreeForTutor
{
    public class UpdateDegreeForTutorValidator : AbstractValidator<UpdateDegreeForTutor>
    {
        public UpdateDegreeForTutorValidator()
        {
            RuleFor(u => u.Name).MaximumLength(250).When(u => !string.IsNullOrEmpty(u.Name));
            RuleFor(u => u.Major).MaximumLength(250).When(u => !string.IsNullOrEmpty(u.Major));
            RuleFor(u => u.GraduatedUniversity).MaximumLength(250)
                .When(u => !string.IsNullOrEmpty(u.GraduatedUniversity));
            RuleFor(u => u.AcademicRankId).MaximumLength(50).NotEmpty().When(u => !string.IsNullOrEmpty(u.AcademicRankId));
        }
    }
}