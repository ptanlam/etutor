using System;
using CourseService.Domain.Common;

namespace CourseService.Domain.SubjectAggregate
{
    public class Subject : BaseEntity<Guid>, IAggregateRoot
    {
        public string Name { get; private set; }
        public string TutorId { get; private set; }
        public string EducationalLevelId { get; private set; }
        public string EducationalGradeId { get; private set; }

        private Subject()
        {
        }

        public Subject(string name, string tutorId, string educationalLevelId, string educationalGradeId = "")
        {
            Name = name;
            TutorId = tutorId;
            EducationalLevelId = educationalLevelId;
            EducationalGradeId = educationalGradeId;
        }

        public void UpdateName(string name)
        {
            if (string.IsNullOrEmpty(name)) return;
            Name = name;
        }

        public void UpdateTutorId(string tutorId)
        {
            if (string.IsNullOrEmpty(tutorId)) return;
            TutorId = tutorId;
        }

        public void UpdateEducationalLevelId(string educationalLevelId)
        {
            if (string.IsNullOrEmpty(educationalLevelId)) return;
            EducationalLevelId = educationalLevelId;
        }

        public void UpdateEducationalGradeId(string educationalGradeId)
        {
            if (string.IsNullOrEmpty(educationalGradeId)) return;
            EducationalGradeId = educationalGradeId;
        }
    }
}