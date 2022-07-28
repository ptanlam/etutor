using FluentValidation;

namespace CourseService.Application.Features.Subjects.Queries.GetSubjectNameList
{
    public class GetSubjectNameListValidator : AbstractValidator<GetSubjectNameList>
    {
        public GetSubjectNameListValidator()
        {
            RuleFor(x => x.Query).NotEmpty().NotNull();
        }
    }
}