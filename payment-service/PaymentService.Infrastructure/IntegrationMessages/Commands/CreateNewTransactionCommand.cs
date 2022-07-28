namespace PaymentService.Infrastructure.IntegrationMessages.Commands;

public interface CreateNewTransactionCommand
{
    string OwnerId { get; }
    string ItemId { get; }
    string Type { get; }
    string Action { get; }
    decimal CostAmount { get; }
    string CostUnit { get; }
}