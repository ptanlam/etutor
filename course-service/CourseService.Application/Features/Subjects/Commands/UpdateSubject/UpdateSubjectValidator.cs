using FluentValidation;

namespace CourseService.Application.Features.Subjects.Commands.UpdateSubject
{
    public class UpdateSubjectValidator : AbstractValidator<UpdateSubject>
    {
        public UpdateSubjectValidator()
        {
            RuleFor(uc => uc.Name).NotEmpty().MaximumLength(250).When(uc => !string.IsNullOrEmpty(uc.Name));
            RuleFor(uc => uc.TutorId).NotEmpty().MaximumLength(50).When(uc => !string.IsNullOrEmpty(uc.TutorId));
            RuleFor(uc => uc.EducationalLevelId).NotEmpty().MaximumLength(50)
                .When(uc => !string.IsNullOrEmpty(uc.EducationalLevelId));
            RuleFor(uc => uc.EducationalGradeId).NotEmpty().MaximumLength(50)
                .When(uc => !string.IsNullOrEmpty(uc.EducationalGradeId));
        }
    }
}