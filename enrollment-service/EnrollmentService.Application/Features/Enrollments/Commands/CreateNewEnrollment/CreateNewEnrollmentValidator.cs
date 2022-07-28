using FluentValidation;

namespace EnrollmentService.Application.Features.Enrollments.Commands.CreateNewEnrollment
{
    public class CreateNewEnrollmentValidator : AbstractValidator<CreateNewEnrollment>
    {
        public CreateNewEnrollmentValidator()
        {
            RuleFor(c => c.CourseId).MaximumLength(50).NotEmpty().NotNull()
                .When(c => string.IsNullOrEmpty(c.SubjectId));

            RuleFor(c => c.SubjectId).MaximumLength(50).NotEmpty().NotNull()
                .When(c => string.IsNullOrEmpty(c.CourseId));

            RuleFor(c => c.StudentId).MaximumLength(50).NotEmpty().NotNull();
            RuleFor(c => c.TutorId).MaximumLength(50).NotEmpty().NotNull();

            RuleFor(c => c.StartDate).LessThan(c => c.EndDate);
            RuleFor(c => c.EndDate).GreaterThan(c => c.StartDate);

            RuleFor(c => c.TuitionAmount).GreaterThanOrEqualTo(0);
            RuleFor(c => c.TuitionUnit).Length(3);
        }
    }
}