using FluentValidation;

namespace CourseService.Application.Features.Courses.Commands.UpdateCourse
{
    public class UpdateCourseValidator : AbstractValidator<UpdateCourse>
    {
        public UpdateCourseValidator()
        {
            RuleFor(u => u.TuitionFeeAmount).GreaterThanOrEqualTo(0);
            RuleFor(u => u.TuitionFeeUnit).Length(3)
                .When(u => !string.IsNullOrEmpty(u.TuitionFeeUnit));

            RuleFor(u => u.StartDate).LessThan(u => u.Course.EndDate)
                .When(u => u.EndDate == default && u.StartDate != default);
            RuleFor(u => u.StartDate).LessThan(u => u.EndDate)
                .When(u => u.EndDate != default && u.StartDate != default);

            RuleFor(u => u.EndDate).GreaterThan(u => u.Course.StartDate)
                .When(u => u.StartDate == default && u.EndDate != default);
            RuleFor(u => u.EndDate).GreaterThan(u => u.StartDate)
                .When(u => u.StartDate != default && u.EndDate != default);
        }
    }
}