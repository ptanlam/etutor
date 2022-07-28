using FluentValidation;

namespace CourseService.Application.Features.Syllabi.Commands.UpdateSyllabus
{
    public class UpdateSyllabusValidator : AbstractValidator<UpdateSyllabus>
    {
        public UpdateSyllabusValidator()
        {
            RuleFor(u => u.Title).MaximumLength(250)
                .When(u => !string.IsNullOrEmpty(u.Title));
            
            RuleFor(u => u.Achievements).MaximumLength(500)
                .When(u => !string.IsNullOrEmpty(u.Achievements));

            RuleFor(u => u.Description).MaximumLength(500)
                .When(u => !string.IsNullOrEmpty(u.Description));

            RuleFor(u => u.FromDate).GreaterThanOrEqualTo(u => u.ToDate)
                .When(u => u.ToDate != default && u.FromDate != default);

            RuleFor(u => u.ToDate).LessThanOrEqualTo(u => u.FromDate)
                .When(u => u.FromDate != default && u.ToDate != default);
        }
    }
}