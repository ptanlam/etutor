using System;
using Microsoft.AspNetCore.Http;

namespace TutorService.Application.Features.Tutors.Dtos
{
    public class DegreeCreationDto
    {
        public string Name { get; init; }
        public string Major { get; init; }
        public string GraduatedUniversity { get; init; }
        public DateTime DateOfIssue { get; init; }
        public string AcademicRankId { get; init; }
        public IFormFileCollection Images { get; init; }
    }
}