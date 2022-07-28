using FluentValidation;

namespace TutorService.Application.Features.Rentals.Commands.AddRentalForTutor
{
    public class AddRentalForTutorValidator : AbstractValidator<AddRentalForTutor>
    {
        public AddRentalForTutorValidator()
        {
            RuleFor(a => a.Amount).GreaterThanOrEqualTo(0);
            RuleFor(a => a.Unit).Length(3).NotNull().NotEmpty();
        }
    }
}