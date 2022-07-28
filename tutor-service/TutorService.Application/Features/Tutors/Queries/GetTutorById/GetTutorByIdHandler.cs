using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TutorService.Application.Contracts;
using TutorService.Application.Contracts.Persistence;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Tutors.Queries.GetTutorById
{
    public class GetTutorByIdHandler : IRequestHandler<GetTutorById, Tutor>
    {
        private readonly ITutorsRepository _tutorsRepository;

        public GetTutorByIdHandler(ITutorsRepository tutorsRepository)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
        }

        public async Task<Tutor> Handle(GetTutorById request, CancellationToken cancellationToken)
        {
            var tutor = await _tutorsRepository.GetByIdAsync(request.Id);
            return tutor;
        }
    }
}