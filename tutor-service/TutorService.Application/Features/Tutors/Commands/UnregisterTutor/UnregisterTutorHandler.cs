using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TutorService.Application.Contracts;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Application.Features.Tutors.Commands.UnregisterTutor
{
    public class UnregisterTutorHandler : IRequestHandler<UnregisterTutor, bool>
    {
        private readonly ITutorsRepository _tutorsRepository;

        public UnregisterTutorHandler(ITutorsRepository tutorsRepository)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
        }

        public async Task<bool> Handle(UnregisterTutor request,
            CancellationToken cancellationToken)
        {
            var success = request.Tutor.Unregister();
            if (!success) return false;

            await _tutorsRepository.UpdateAsync(request.Tutor);
            return true;
        }
    }
}