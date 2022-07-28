namespace PaymentService.Domain.ValueObjects;

public class Tracking
{
    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset? UpdatedAt { get; private set; }
    public DateTimeOffset? DeletedAt { get; private set; }

    public Tracking()
    {
        CreatedAt = DateTimeOffset.Now;
    }
}