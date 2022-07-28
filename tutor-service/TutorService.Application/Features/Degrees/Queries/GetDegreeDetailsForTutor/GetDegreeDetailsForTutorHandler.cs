using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TutorService.Application.Features.Degrees.ViewModels;

namespace TutorService.Application.Features.Degrees.Queries.GetDegreeDetailsForTutor
{
    public class GetDegreeDetailsForTutorHandler : IRequestHandler<GetDegreeDetailsForTutor, DegreeVm>
    {
        private readonly IMapper _mapper;

        public GetDegreeDetailsForTutorHandler(IMapper mapper)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Task<DegreeVm> Handle(GetDegreeDetailsForTutor request,
            CancellationToken cancellationToken)
        {
            var degree = request.Tutor.Degrees.FirstOrDefault(d => d.Id == request.Id);
            return Task.FromResult(degree == null ? null : _mapper.Map<DegreeVm>(degree));
        }
    }
}