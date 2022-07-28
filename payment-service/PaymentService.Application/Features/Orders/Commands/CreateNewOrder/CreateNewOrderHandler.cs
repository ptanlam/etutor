using MediatR;
using PaymentService.Application.Contracts.Infrastructure;
using PaymentService.Application.Features.Orders.ViewModels;

namespace PaymentService.Application.Features.Orders.Commands.CreateNewOrder;

public class CreateNewOrderHandler : IRequestHandler<CreateNewOrder, OrderVm?>
{
    private readonly IPaypalService _paypalService;

    public CreateNewOrderHandler(IPaypalService paypalService)
    {
        _paypalService = paypalService ?? throw new ArgumentNullException(nameof(paypalService));
    }

    public async Task<OrderVm?> Handle(CreateNewOrder request, CancellationToken cancellationToken)
    {
        return await _paypalService.CreateNewOrderAsync(request.CostAmount, request.CostUnit, cancellationToken);
    }
}