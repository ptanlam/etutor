namespace PaymentService.Domain.ValueObjects;

public class Money
{
    public decimal Amount { get; }
    public string Unit { get; }

    private Money()
    {
    }

    public Money(decimal amount, string unit)
    {
        Amount = amount;
        Unit = unit;
    }
}