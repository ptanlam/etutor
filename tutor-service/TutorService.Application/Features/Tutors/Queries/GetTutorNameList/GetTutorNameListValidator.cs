using FluentValidation;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorNameList
{
    public class GetTutorNameListValidator : AbstractValidator<GetTutorNameList>
    {
        public GetTutorNameListValidator()
        {
            RuleFor(x => x.Query).NotEmpty().NotNull();
        }
    }
}