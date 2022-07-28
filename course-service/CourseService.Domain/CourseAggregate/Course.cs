using System;
using System.Collections.Generic;
using CourseService.Domain.Common;
using CourseService.Domain.ValueTypes;

namespace CourseService.Domain.CourseAggregate
{
    public class Course : AuditableEntity, IAggregateRoot
    {
        public DateTimeOffset StartDate { get; private set; }
        public DateTimeOffset EndDate { get; private set; }
        public Money TuitionFee { get; private set; }
        public int StartAtHour { get; private set; }
        public int StartAtMinute { get; private set; }
        public int EndAtHour { get; private set; }
        public int EndAtMinute { get; private set; }
        public Guid SubjectId { get; private set; }
        public string LearningDays { get; private set; }
        public bool IsActive { get; private set; }

        protected Course()
        {
        }

        public Course(DateTimeOffset startDate, DateTimeOffset endDate, string learningDays, int startAtHour, 
            int startAtMinute, int endAtHour, int endAtMinute, Money tuitionFee, Guid subjectId)
        {
            StartDate = startDate;
            EndDate = endDate;
            LearningDays = learningDays;
            StartAtHour = startAtHour;
            StartAtMinute = startAtMinute;
            EndAtHour = endAtHour;
            EndAtMinute = endAtMinute;
            TuitionFee = tuitionFee;
            SubjectId = subjectId;
            IsActive = false;
        }

        public void UpdateTuitionFeeAmount(decimal? amount)
        {
            if (amount == null) return;
            TuitionFee = new Money((decimal) amount, TuitionFee.Unit);
        }

        public void UpdateTuitionFeeUnit(string unit)
        {
            if (string.IsNullOrEmpty(unit)) return;
            TuitionFee = new Money(TuitionFee.Amount, unit);
        }

        public void UpdateSubjectId(Guid subjectId)
        {
            if (subjectId == default) return;
            SubjectId = subjectId;
        }

        public void UpdateStartDate(DateTimeOffset startDate)
        {
            if (startDate == default) return;
            StartDate = startDate;
        }

        public void UpdateEndDate(DateTimeOffset endDate)
        {
            if (endDate == default) return;
            EndDate = endDate;
        }
        
        public void UpdateActiveStatus(bool isActive)
        {
            IsActive = isActive;
        }
    }
}