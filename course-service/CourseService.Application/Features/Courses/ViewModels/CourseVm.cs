using System;
using System.Collections.Generic;
using CourseService.Domain.CourseAggregate;

namespace CourseService.Application.Features.Courses.ViewModels
{
    public class CourseVm
    {
        public Guid Id { get; init; }
        public DateTimeOffset StartDate { get; init; }
        public DateTimeOffset EndDate { get; init; }
        public decimal TuitionFeeAmount { get; init; }
        public string TuitionFeeUnit { get; init; }
        public string LearningDays { get; init; }
        public string StartAt { get; init; }
        public string EndAt { get; init; }
        public Guid SubjectId { get; init; }
        public bool IsActive { get; init; }
        public string SubjectName { get; set; }


        // online course
        public string Name { get; init; }
        public string Description { get; init; }
        public int MaxNumberOfStudents { get; init; }
        public IEnumerable<Syllabus> Syllabi { get; init; }

        // one on one course
        public bool TutorApproved { get; init; }

        // external services
        public File Thumbnail { get; set; }
        public string EducationalLevel { get; set; }
        public string EducationalGrade { get; set; }
        public GetTutorBasicInfoResponse Tutor { get; set; }
        public int NumberOfEnrollments { get; set; }
    }
}