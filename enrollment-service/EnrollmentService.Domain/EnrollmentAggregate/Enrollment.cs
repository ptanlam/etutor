using System;
using EnrollmentService.Domain.Common;
using EnrollmentService.Domain.EnrollmentAggregate.Enums;
using EnrollmentService.Domain.ValueObjects;

namespace EnrollmentService.Domain.EnrollmentAggregate
{
    public class Enrollment : AuditableEntity, IAggregateRoot
    {
        public string CourseId { get; private set; }
        public string StudentId { get; private set; }
        public Money Tuition { get; private set; }
        public DateTimeOffset StartDate { get; private set; }
        public DateTimeOffset EndDate { get; private set; }
        public bool IsCancelled { get; private set; }

        private Enrollment()
        {
        }

        public Enrollment(string courseId, string studentId, Money tuition, DateTimeOffset startDate,
            DateTimeOffset endDate)
        {
            CourseId = courseId;
            StudentId = studentId;
            Tuition = tuition;
            StartDate = startDate;
            EndDate = endDate;
            IsCancelled = false;
        }

        public void Transfer(Enrollment enrollment, Guid performerId, string notes = "")
        {
            var transaction = new EnrollmentTransaction(TransactionType.Transfer, notes, performerId, this, enrollment);
            Cancel();
        }

        private void Cancel()
        {
            IsCancelled = true;
        }
    }
}