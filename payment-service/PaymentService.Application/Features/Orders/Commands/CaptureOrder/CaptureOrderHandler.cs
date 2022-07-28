using MediatR;
using PaymentService.Application.Contracts.Infrastructure;

namespace PaymentService.Application.Features.Orders.Commands.CaptureOrder;

public class CaptureOrderHandler : IRequestHandler<CaptureOrder>
{
    private readonly IPaypalService _paypalService;

    public CaptureOrderHandler(IPaypalService paypalService)
    {
        _paypalService = paypalService ?? throw new ArgumentNullException(nameof(paypalService));
    }

    public async Task<Unit> Handle(CaptureOrder request, CancellationToken cancellationToken)
    {
        await _paypalService.CaptureOrderAsync(request.Id, cancellationToken);
        return Unit.Value;
    }
}