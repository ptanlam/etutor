using TutorService.Domain.Common;
using TutorService.Domain.ValueObjects;

namespace TutorService.Domain.TutorAggregate
{
    public class Rental : BaseEntity<int>
    {
        public Money Cost { get; private set; }
        public bool IsActive { get; private set; }

        private Rental()
        {
        }
        
        public Rental(Money cost)
        {
            Cost = cost;
            IsActive = true;
        }

        public void Deactivate()
        {
            IsActive = false;
        }
    }
}