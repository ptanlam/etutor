using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TutorService.Application.Features.Certificates.ViewModels;

namespace TutorService.Application.Features.Certificates.Queries.GetCertificateDetailsForTutor
{
    public class GetCertificateDetailsForTutorHandler : IRequestHandler<GetCertificateDetailsForTutor, CertificateVm>
    {
        private readonly IMapper _mapper;

        public GetCertificateDetailsForTutorHandler(IMapper mapper)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Task<CertificateVm> Handle(GetCertificateDetailsForTutor request,
            CancellationToken cancellationToken)
        {
            var certificate = request.Tutor.Certificates.FirstOrDefault(c => c.Id == request.Id);
            return Task.FromResult(certificate == null ? null : _mapper.Map<CertificateVm>(certificate));
        }
    }
}