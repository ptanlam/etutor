using System;
using System.Linq;
using CourseService.Domain.Enums;
using FluentValidation;

namespace CourseService.Application.Features.Courses.Commands.AddNewCourse
{
    public class AddNewCourseValidator : AbstractValidator<AddNewCourse>
    {
        public AddNewCourseValidator()
        {
            RuleFor(a => a.Type)
                .Must(type => Enum.TryParse<CourseType>(type, true, out _));

            RuleFor(a => a.StartDate).NotNull().LessThan(a => a.EndDate);
            RuleFor(a => a.EndDate).NotNull().GreaterThan(a => a.StartDate);

            RuleFor(a => a.TuitionFeeAmount).GreaterThanOrEqualTo(0);
            RuleFor(a => a.TuitionFeeUnit).NotNull().NotEmpty().Length(3);

            RuleFor(a => a.LearningDays).NotEmpty().Must(days =>
                days.Select(day => Enum.TryParse<Weekday>(day, true, out _)).All(valid => valid));

            RuleFor(a => a.Name).NotNull().NotEmpty().MaximumLength(250)
                .When(a => string.Equals(a.Type, CourseType.Online.ToString(),
                    StringComparison.CurrentCultureIgnoreCase));
            
            RuleFor(a => a.Description).NotNull().NotEmpty().MaximumLength(500)
                .When(a => string.Equals(a.Type, CourseType.Online.ToString(),
                    StringComparison.CurrentCultureIgnoreCase));
            
            RuleFor(a => a.MaxNumberOfStudents).NotNull().GreaterThanOrEqualTo(1)
                .When(a => string.Equals(a.Type, CourseType.Online.ToString(),
                    StringComparison.CurrentCultureIgnoreCase));
        }
    }
}