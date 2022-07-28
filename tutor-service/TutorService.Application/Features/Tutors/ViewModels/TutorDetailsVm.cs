using System.Collections.Generic;
using TutorService.Application.Features.Certificates.ViewModels;
using TutorService.Application.Features.Degrees.ViewModels;

namespace TutorService.Application.Features.Tutors.ViewModels
{
    public class TutorDetailsVm : TutorVm
    {
        public string Description { get; init; }
        public IEnumerable<CertificateVm> Certificates { get; set; }
        public IEnumerable<DegreeVm> Degrees { get; set; }

        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}