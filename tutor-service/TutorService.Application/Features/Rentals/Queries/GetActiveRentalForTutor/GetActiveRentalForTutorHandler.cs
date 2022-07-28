using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TutorService.Application.Contracts.Persistence;

namespace TutorService.Application.Features.Rentals.Queries.GetActiveRentalForTutor
{
    public class GetActiveRentalForTutorHandler : IRequestHandler<GetActiveRentalForTutor, GetTutorActiveRentalResponse>
    {
        private readonly ITutorsRepository _tutorsRepository;
        private readonly IMapper _mapper;

        public GetActiveRentalForTutorHandler(ITutorsRepository tutorsRepository, IMapper mapper)
        {
            _tutorsRepository = tutorsRepository ?? throw new ArgumentNullException(nameof(tutorsRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        
        public async Task<GetTutorActiveRentalResponse> Handle(
            GetActiveRentalForTutor request, 
            CancellationToken cancellationToken)
        {
            var tutor = await _tutorsRepository.GetByIdAsync(request.TutorId);
            if (tutor == null) return new GetTutorActiveRentalResponse();

            return _mapper.Map<GetTutorActiveRentalResponse>(tutor.Rentals.FirstOrDefault()) 
                   ?? new GetTutorActiveRentalResponse();
        }
    }
}