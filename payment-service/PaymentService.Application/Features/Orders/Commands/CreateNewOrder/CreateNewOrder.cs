using MediatR;
using PaymentService.Application.Features.Orders.ViewModels;

namespace PaymentService.Application.Features.Orders.Commands.CreateNewOrder;

public class CreateNewOrder : IRequest<OrderVm?>
{
    public decimal CostAmount { get; init; }
    public string CostUnit { get; init; } = string.Empty;
}