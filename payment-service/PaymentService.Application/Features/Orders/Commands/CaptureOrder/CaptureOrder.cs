using MediatR;

namespace PaymentService.Application.Features.Orders.Commands.CaptureOrder;

public class CaptureOrder : IRequest
{
    public string Id { get; init; } = string.Empty;
}