using System;
using CourseService.Domain.CourseAggregate;
using FluentValidation;

namespace CourseService.Application.Features.Syllabi.Commands.AddNewSyllabusToCourse
{
    public class AddNewSyllabusToCourseValidator : AbstractValidator<AddNewSyllabusToCourse>
    {
        public AddNewSyllabusToCourseValidator()
        {
            RuleFor(a => a.Course)
                .Must(c => c.GetType() == typeof(OnlineCourse));
            
            RuleFor(a => a.Title).NotNull().NotEmpty().MaximumLength(250);
            
            RuleFor(a => a.Description).NotNull().NotEmpty().MaximumLength(500);
            
            RuleFor(a => a.Achievements).NotNull().NotEmpty().MaximumLength(500);
            
            RuleFor(a => a.FromDate)
                .LessThanOrEqualTo(a => a.ToDate)
                .NotEqual((DateTime)default);
            
            RuleFor(a => a.ToDate)
                .GreaterThanOrEqualTo(a => a.FromDate)
                .NotEqual((DateTime)default);
        }
    }
}