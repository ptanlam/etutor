using System;

namespace TutorService.Application.Features.Certificates.ViewModels
{
    public class CertificateVm
    {
        public int Id { get; init; }
        public string Name { get; set; }
        public string PlaceOfIssue { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime ExpiresIn { get; set; }
        public File Image { get; set; }
    }
}