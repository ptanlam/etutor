using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Application.Features.Tutors.Queries.CheckUserExisting
{
    public class CheckUserExistingHandler : IRequestHandler<CheckUserExisting, bool>
    {
        private readonly ITutorsRepository _tutorsRepository;

        public CheckUserExistingHandler(ITutorsRepository tutorsRepository)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
        }
        
        public async Task<bool> Handle(CheckUserExisting request, CancellationToken cancellationToken)
        {
            return (await _tutorsRepository.GetForUserAsync(request.UserId)) != null;
        }
    }
}