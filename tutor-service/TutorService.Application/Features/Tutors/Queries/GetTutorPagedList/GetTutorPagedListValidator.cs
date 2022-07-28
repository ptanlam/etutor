using FluentValidation;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorPagedList
{
    public class GetTutorPagedListValidator : AbstractValidator<GetTutorPagedList>
    {
        public GetTutorPagedListValidator()
        {
            RuleFor(g => g.Name).MaximumLength(250).NotEmpty().NotNull();
            
            RuleFor(g => g.GenderId).MaximumLength(50)
                .When(g => !string.IsNullOrEmpty(g.GenderId));
            
            RuleFor(g => g.SubjectName).MaximumLength(250)
                .When(g => !string.IsNullOrEmpty(g.SubjectName));
            
            RuleFor(g => g.EducationalLevelId).MaximumLength(50)
                .When(g => !string.IsNullOrEmpty(g.EducationalLevelId));
            
            RuleFor(g => g.EducationalGradeId).MaximumLength(50)
                .When(g => !string.IsNullOrEmpty(g.EducationalGradeId));
            
            RuleFor(g => g.PageNumber).GreaterThanOrEqualTo(1);
            RuleFor(g => g.PageSize).GreaterThanOrEqualTo(1).LessThanOrEqualTo(20);
        }
    }
}