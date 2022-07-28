using System;

namespace TutorService.Application.Features.Degrees.ViewModels
{
    public class DegreeVm
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string Major { get; init; }
        public string GraduatedUniversity { get; init; }
        public DateTime DateOfIssue { get; init; }
        public string AcademicRank { get; set; }
        public File Image { get; set; }
    }
}