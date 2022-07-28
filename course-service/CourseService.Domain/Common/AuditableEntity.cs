using System;

namespace CourseService.Domain.Common
{
    public class AuditableEntity : BaseEntity<Guid>
    {
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}