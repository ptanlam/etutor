using System;
using Microsoft.AspNetCore.Http;

namespace TutorService.Application.Features.Tutors.Dtos
{
    public class CertificateCreationDto
    {
        public string Name { get; init; }
        public string PlaceOfIssue { get; init; }
        public DateTime DateOfIssue { get; init; }
        public DateTime ExpiresIn { get; init; }
        public IFormFileCollection Images { get; init; }
    }
}