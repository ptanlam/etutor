using PaymentService.Domain.Common;
using PaymentService.Domain.ValueObjects;

namespace PaymentService.Domain.MethodAggregate;

public class Method : BaseEntity<Guid>, IAggregateRoot
{
    private Method()
    {
    }

    public Method(string userId, string cardNumber, string expiry, string name, string cvc)
    {
        UserId = userId;
        CardNumber = cardNumber;
        Expiry = expiry;
        Name = name;
        Cvc = cvc;
        IsActive = true;
        IsPreferred = true;
        Tracking = new Tracking();
    }

    public string UserId { get; private set; }
    public string CardNumber { get; private set; }
    public string Expiry { get; private set; }
    public string Name { get; private set; }
    public string Cvc { get; private set; }
    public bool IsPreferred { get; private set; }
    public bool IsActive { get; private set; }
    public Tracking Tracking { get; init; }
}