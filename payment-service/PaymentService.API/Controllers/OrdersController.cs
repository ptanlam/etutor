using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Features.Orders.Commands.CaptureOrder;
using PaymentService.Application.Features.Orders.Commands.CreateNewOrder;

namespace PaymentService.API.Controllers;

[ApiController]
[Route("orders")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrdersController(IMediator mediator)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    [HttpPost]
    public async Task<IActionResult> CreateNew([FromBody] CreateNewOrder createNewOrder,
        CancellationToken cancellationToken)
    {
        var order = await _mediator.Send(createNewOrder, cancellationToken);
        return Ok(order);
    }

    [HttpPost("{id}/capture")]
    public async Task<IActionResult> Capture([FromRoute] CaptureOrder captureOrder, CancellationToken cancellationToken)
    {
        await _mediator.Send(captureOrder, cancellationToken);
        return Ok();
    }
}