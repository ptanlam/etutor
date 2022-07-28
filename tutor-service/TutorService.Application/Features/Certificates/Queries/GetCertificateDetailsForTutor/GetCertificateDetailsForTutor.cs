using MediatR;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Application.Features.Certificates.Queries.GetCertificateDetailsForTutor
{
    public class GetCertificateDetailsForTutor : IRequest<CertificateVm>
    {
        public Tutor Tutor { get; init; }
        public int Id { get; init; }
    }
}