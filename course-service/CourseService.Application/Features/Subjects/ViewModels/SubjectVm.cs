using System;

namespace CourseService.Application.Features.Subjects.ViewModels
{
    public class SubjectVm
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string TutorId { get; init; }
        public string EducationalLevel { get; set; }
        public string EducationalGrade { get; set; }
    }
}