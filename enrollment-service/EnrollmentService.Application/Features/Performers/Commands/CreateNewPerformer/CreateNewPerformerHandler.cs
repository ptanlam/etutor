using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Application.Features.Performers.ViewModels;
using EnrollmentService.Domain.PerformerAggregate;
using MediatR;

namespace EnrollmentService.Application.Features.Performers.Commands.CreateNewPerformer
{
    public class CreateNewPerformerHandler :
        IRequestHandler<CreateNewPerformer, PerformerVm>
    {
        private readonly IPerformersRepository _performersRepository;
        private readonly IMapper _mapper;

        public CreateNewPerformerHandler(
            IPerformersRepository performersRepository,
            IMapper mapper)
        {
            _performersRepository = performersRepository ??
                                    throw new ArgumentNullException(
                                        nameof(performersRepository));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<PerformerVm> Handle(CreateNewPerformer request,
            CancellationToken cancellationToken)
        {
            var performer = new Performer(request.Name, request.Email);
            return _mapper.Map<PerformerVm>(
                await _performersRepository.AddAsync(performer));
        }
    }
}