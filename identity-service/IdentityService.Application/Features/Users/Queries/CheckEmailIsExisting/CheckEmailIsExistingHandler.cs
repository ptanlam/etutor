using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using IdentityService.Application.Contracts.Persistence;
using IdentityService.Application.Features.Users.ViewModels;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.CheckEmailIsExisting
{
    public class CheckEmailIsExistingHandler : IRequestHandler<CheckEmailIsExisting, bool>
    {
        private readonly IUsersRepository _usersRepository;

        public CheckEmailIsExistingHandler(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
        }
        
        public async Task<bool> Handle(CheckEmailIsExisting request, CancellationToken cancellationToken)
        {
            var user = await _usersRepository.GetByEmail(request.Email, cancellationToken);
            return user is not null;
        }
    }
}