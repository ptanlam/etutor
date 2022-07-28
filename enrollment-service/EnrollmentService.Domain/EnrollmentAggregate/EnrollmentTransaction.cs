using System;
using EnrollmentService.Domain.Common;
using EnrollmentService.Domain.EnrollmentAggregate.Enums;

namespace EnrollmentService.Domain.EnrollmentAggregate
{
    public class EnrollmentTransaction : BaseEntity<int>
    {
        public string Type { get; private set; }
        public string Notes { get; private set; }
        public Guid PerformerId { get; private set; }
        public Enrollment OldEnrollment { get; private set; }
        public Enrollment NewEnrollment { get; private set; }

        private EnrollmentTransaction()
        {
        }

        public EnrollmentTransaction(TransactionType type, string notes, Guid performerId)
        {
            Type = type.ToString();
            Notes = notes;
            PerformerId = performerId;
        }

        public EnrollmentTransaction(TransactionType type, string notes, Guid performerId,
            Enrollment oldEnrollment, Enrollment newEnrollment)
        {
            Type = type.ToString();
            Notes = notes;
            PerformerId = performerId;
            OldEnrollment = oldEnrollment;
            NewEnrollment = newEnrollment;
        }
    }
}