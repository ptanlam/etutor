using FluentValidation;

namespace IdentityService.Application.Features.Users.Queries.GetUserPagedList
{
    public class GetUserPagedListValidator : AbstractValidator<GetUserPagedList>
    {
        public GetUserPagedListValidator()
        {
            RuleFor(g => g.PageNumber).NotNull().GreaterThan(0);
            RuleFor(g => g.PageSize).NotNull().GreaterThan(0).LessThanOrEqualTo(20);
        }
    }
}