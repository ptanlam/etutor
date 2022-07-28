using System;

namespace EnrollmentService.Domain.Common
{
    public class AuditableEntity : BaseEntity<Guid>
    {
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}