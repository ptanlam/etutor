namespace PaymentService.Application.Features.Transactions.ViewModels;

public class TransactionVm
{
    public Guid Id { get; set; }
    public string OwnerId { get; set; } = string.Empty;
    public string ItemId { get; set; } = string.Empty;
    public string ItemName { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public decimal CostAmount { get; set; }
    public string CostUnit { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
}