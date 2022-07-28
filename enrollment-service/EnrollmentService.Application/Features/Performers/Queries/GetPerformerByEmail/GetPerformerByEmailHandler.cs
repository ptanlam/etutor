using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Application.Features.Performers.ViewModels;
using MediatR;

namespace EnrollmentService.Application.Features.Performers.Queries.GetPerformerByEmail
{
    public class GetPerformerByEmailHandler :
        IRequestHandler<GetPerformerByEmail, PerformerVm>
    {
        private readonly IPerformersRepository _performersRepository;
        private readonly IMapper _mapper;

        public GetPerformerByEmailHandler(
            IPerformersRepository performersRepository, IMapper mapper)
        {
            _performersRepository = performersRepository ??
                                    throw new ArgumentNullException(
                                        nameof(performersRepository));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<PerformerVm> Handle(
            GetPerformerByEmail request,
            CancellationToken cancellationToken)
        {
            var performer =
                await _performersRepository.GetByEmailAsync(request.Email);

            return performer == null
                ? null
                : _mapper.Map<PerformerVm>(performer);
        }
    }
}