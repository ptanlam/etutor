using FluentValidation;

namespace TutorService.Application.Features.Degrees.Commands.AddDegreeForTutor
{
    public class AddDegreeForTutorValidator : AbstractValidator<AddDegreeForTutor>
    {
        public AddDegreeForTutorValidator()
        {
            RuleFor(a => a.Name).NotNull().NotEmpty().MaximumLength(250);
            RuleFor(a => a.Major).NotNull().NotEmpty().MaximumLength(250);
            RuleFor(a => a.GraduatedUniversity).NotNull().NotEmpty().MaximumLength(250);
            RuleFor(a => a.AcademicRankId).NotNull().NotEmpty().MaximumLength(50);
        }
    }
}