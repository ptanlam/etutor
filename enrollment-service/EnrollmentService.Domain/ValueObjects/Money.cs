namespace EnrollmentService.Domain.ValueObjects
{
    public class Money
    {
        public decimal Amount { get; init; }
        public string Unit { get; init; }

        public Money(decimal amount, string unit)
        {
            Amount = amount;
            Unit = unit;
        }
    }
}