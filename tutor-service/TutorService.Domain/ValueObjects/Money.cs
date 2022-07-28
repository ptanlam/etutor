namespace TutorService.Domain.ValueObjects
{
    public class Money
    {
        public decimal Amount { get; private set; }
        public string Unit { get; private set; }

        public Money(decimal amount, string unit)
        {
            Amount = amount;
            Unit = unit;
        }
    }
}