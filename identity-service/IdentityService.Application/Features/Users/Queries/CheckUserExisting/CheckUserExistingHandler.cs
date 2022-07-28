using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Persistence;
using MediatR;

namespace IdentityService.Application.Features.Users.Queries.CheckUserExisting
{
    public class CheckUserExistingHandler : IRequestHandler<CheckUserExisting, CheckUserExistingResponse>
    {
        private readonly IUsersRepository _usersRepository;

        public CheckUserExistingHandler(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
        }

        public async Task<CheckUserExistingResponse> Handle(CheckUserExisting request,
            CancellationToken cancellationToken)
        {
            var user = await _usersRepository.GetById(request.Id);
            return new CheckUserExistingResponse
            {
                Id = user is null ? string.Empty : user.UserId
            };
        }
    }
}