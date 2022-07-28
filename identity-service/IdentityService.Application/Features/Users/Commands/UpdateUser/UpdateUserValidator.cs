using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using IdentityService.Application.Contracts.Persistence;

namespace IdentityService.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserValidator : AbstractValidator<UpdateUser>
    {
        private readonly IUsersRepository _usersRepository;

        public UpdateUserValidator(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));

            RuleFor(u => u.Id).MustAsync(CheckUserExist).WithMessage("User does not exist!");
        }

        private async Task<bool> CheckUserExist(string id, CancellationToken cancellationToken)
        {
            return await _usersRepository.GetById(id) is not null;
        }
    }
}