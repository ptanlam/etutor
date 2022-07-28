using System;
using CourseService.Domain.ValueTypes;

namespace CourseService.Domain.CourseAggregate
{
    public class OneOnOneCourse : Course
    {
        public bool TutorApproved { get; private set; }

        private OneOnOneCourse() : base()
        {
        }

        public OneOnOneCourse(DateTimeOffset startDate, DateTimeOffset endDate, string learningDays, int startAtHour,
            int startAtMinute, int endAtHour, int endAtMinute, Money tuitionFee, Guid subjectId) : base(startDate,
            endDate, learningDays, startAtHour, startAtMinute, endAtHour, endAtMinute, tuitionFee, subjectId)
        {
        }

        public void ApproveByTutor()
        {
            TutorApproved = true;
        }
    }
}