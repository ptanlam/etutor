using FluentValidation;

namespace CourseService.Application.Features.Subjects.Commands.AddNewSubject
{
    public class AddNewSubjectValidator : AbstractValidator<AddNewSubject>
    {
        public AddNewSubjectValidator()
        {
            RuleFor(anc => anc.Name).NotNull().NotEmpty().MaximumLength(250);
            RuleFor(anc => anc.TutorId).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(anc => anc.EducationalLevelId).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(anc => anc.EducationalGradeId).MaximumLength(50)
                .When(anc => !string.IsNullOrEmpty(anc.EducationalGradeId));
        }
    }
}