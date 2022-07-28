using PaymentService.Application.Features.Orders.ViewModels;

namespace PaymentService.Application.Contracts.Infrastructure;

public interface IPaypalService
{
    Task<OrderVm?> CreateNewOrderAsync(decimal costAmount, string costUnit,
        CancellationToken cancellationToken = default);

    Task CaptureOrderAsync(string id, CancellationToken cancellationToken = default);
}