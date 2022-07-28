using System;
using System.Threading.Tasks;
using FluentValidation;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Application.Features.Tutors.Commands.RegisterNewTutor
{
    public class RegisterNewTutorValidator : AbstractValidator<RegisterNewTutor>
    {
        private readonly ITutorsRepository _tutorsRepository;

        public RegisterNewTutorValidator(ITutorsRepository tutorsRepository)
        {
            RuleFor(rnt => rnt.Description).NotNull().NotEmpty();
            RuleFor(rnt => rnt.UserId)
                .MustAsync(async (userId, _) => await CheckUserHasNotRegistered(userId))
                .WithMessage("This user has already registered for being tutor!");

            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
        }

        private async Task<bool> CheckUserHasNotRegistered(string userId)
        {
            var tutor = await _tutorsRepository.GetForUserAsync(userId);
            return tutor == null;
        }
    }
}