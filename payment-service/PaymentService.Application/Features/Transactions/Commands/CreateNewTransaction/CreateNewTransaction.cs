using MediatR;
using PaymentService.Application.Features.Transactions.ViewModels;

namespace PaymentService.Application.Features.Transactions.Commands.CreateNewTransaction;

public class CreateNewTransaction : IRequest<TransactionVm>
{
    public string OwnerId { get; init; } = string.Empty;
    public string ItemId { get; init; } = string.Empty;
    public string Type { get; init; } = string.Empty;
    public string Action { get; init; } = string.Empty;
    public decimal CostAmount { get; init; }
    public string CostUnit { get; init; } = string.Empty;
}