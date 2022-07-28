using System;
using System.Linq;
using CourseService.Domain.Enums;
using FluentValidation;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForSubjectByConditions
{
    public class GetCoursePagedListForSubjectByConditionsValidator : 
        AbstractValidator<GetCoursePagedListForSubjectByConditions>
    {
        public GetCoursePagedListForSubjectByConditionsValidator()
        {
            RuleFor(g => g.SubjectName).MaximumLength(250)
                .When(g => !string.IsNullOrEmpty(g.SubjectName));
            
            RuleFor(g => g.EducationalLevelId).MaximumLength(50)
                .When(g => !string.IsNullOrEmpty(g.EducationalLevelId));
            
            RuleFor(g => g.EducationalGradeId).MaximumLength(50)
                .When(g => !string.IsNullOrEmpty(g.EducationalGradeId));

            RuleFor(g => g.StartAt).MaximumLength(5)
                .When(g => !string.IsNullOrEmpty(g.StartAt));

            RuleFor(g => g.LearningDays)
                .Must(days => days.All(day => Enum.TryParse<Weekday>(day, true, out _)))
                .When(g => g.LearningDays != null);
            
            RuleFor(g => g.Type)
                .Must(type => Enum.TryParse<CourseType>(type, true, out _))
                .When(g => g.Type != null);
            
            RuleFor(g => g.PageNumber).GreaterThanOrEqualTo(1);
            RuleFor(g => g.PageSize).GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(20);
        }
    }
}