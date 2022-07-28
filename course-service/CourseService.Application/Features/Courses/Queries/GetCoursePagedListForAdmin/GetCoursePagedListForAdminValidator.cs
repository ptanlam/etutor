using System;
using CourseService.Domain.Enums;
using FluentValidation;

namespace CourseService.Application.Features.Courses.Queries.GetCoursePagedListForAdmin
{
    public class GetCoursePagedListForAdminValidator : AbstractValidator<GetCoursePagedListForAdmin>
    {
        public GetCoursePagedListForAdminValidator()
        {
            RuleFor(g => g.Type)
                .Must(type => Enum.TryParse<CourseType>(type, true, out _))
                .When(g => g.Type != null);
            
            RuleFor(g => g.PageNumber).GreaterThanOrEqualTo(1);
            RuleFor(g => g.PageSize).GreaterThanOrEqualTo(1).LessThanOrEqualTo(20);
        }
    }
}