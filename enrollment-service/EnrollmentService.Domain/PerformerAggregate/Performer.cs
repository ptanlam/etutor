using System;
using EnrollmentService.Domain.Common;

namespace EnrollmentService.Domain.PerformerAggregate
{
    public class Performer : BaseEntity<Guid>, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Email { get; private set; }
        
        private Performer()
        {
        }

        public Performer(string name, string email)
        {
            Name = name;
            Email = email;
        }
    }
}