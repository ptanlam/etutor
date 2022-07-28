using System;
using CourseService.Domain.Common;

namespace CourseService.Domain.CourseAggregate
{
    public class Syllabus : AuditableEntity
    {
        public string Title { get; set; }
        public string Description { get; private set; }
        public string Achievements { get; private set; }
        public DateTime FromDate { get; private set; }
        public DateTime ToDate { get; private set; }

        public Syllabus(string title, string description, string achievements, DateTime fromDate, DateTime toDate)
        {
            Title = title;
            Description = description;
            Achievements = achievements;
            FromDate = fromDate;
            ToDate = toDate;
        }

        public void UpdateTitle(string title)
        {
            if (string.IsNullOrEmpty(title)) return;
            Title = title;
        }

        public void UpdateDescription(string description)
        {
            if (string.IsNullOrEmpty(description)) return;
            Description = description;
        }

        public void UpdateAchievements(string achievements)
        {
            if (string.IsNullOrEmpty(achievements)) return;
            Achievements = achievements;
        }

        public void UpdateFromDate(DateTime fromDate)
        {
            if (fromDate == default) return;
            FromDate = fromDate;
        }
        
        public void UpdateToDate(DateTime toDate)
        {
            if (toDate == default) return;
            ToDate = toDate;
        }
    }
}