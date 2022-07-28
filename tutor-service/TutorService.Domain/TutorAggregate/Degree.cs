using System;
using TutorService.Domain.Common;

namespace TutorService.Domain.TutorAggregate
{
    public class Degree : BaseEntity<int>
    {
        public Degree(string name, string major, string graduatedUniversity, DateTime dateOfIssue,
            string academicRankId)
        {
            Name = name;
            Major = major;
            GraduatedUniversity = graduatedUniversity;
            DateOfIssue = dateOfIssue;
            AcademicRankId = academicRankId;
        }

        public string Name { get; private set; }
        public string Major { get; private set; }
        public string GraduatedUniversity { get; private set; }
        public DateTime DateOfIssue { get; private set; }
        public string AcademicRankId { get; private set; }

        public void UpdateName(string name)
        {
            if (string.IsNullOrEmpty(name)) return;
            Name = name;
        }

        public void UpdateMajor(string major)
        {
            if (string.IsNullOrEmpty(major)) return;
            Major = major;
        }

        public void UpdateGraduatedUniversity(string graduatedUniversity)
        {
            if (string.IsNullOrEmpty(graduatedUniversity)) return;
            GraduatedUniversity = graduatedUniversity;
        }

        public void UpdateDateOfIssue(DateTime dateOfIssue)
        {
            if (dateOfIssue == default) return;
            DateOfIssue = dateOfIssue;
        }

        public void UpdateAcademicRankId(string academicRankId)
        {
            AcademicRankId = academicRankId;
        }
    }
}