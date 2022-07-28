using PaymentService.Domain.Common;
using PaymentService.Domain.Enums;
using PaymentService.Domain.ValueObjects;

namespace PaymentService.Domain.TransactionAggregate;

public class Transaction : BaseEntity<Guid>, IAggregateRoot
{
    public string OwnerId { get; }
    public string ItemId { get; }
    public ItemType Type { get; }
    public string Action { get; }
    public Money Cost { get; }
    public Tracking Tracking { get; }

    private Transaction()
    {
    }

    public Transaction(string ownerId, decimal costAmount, string costUnit, string itemId, ItemType type, string action)
    {
        OwnerId = ownerId;
        ItemId = itemId;
        Action = action;
        Cost = new Money(costAmount, costUnit);
        Tracking = new Tracking();
        Type = type;
    }
}