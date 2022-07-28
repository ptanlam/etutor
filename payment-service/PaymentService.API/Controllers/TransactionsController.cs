using System.Text.Json;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Features.Transactions.Queries.GetTransactionsForOwner;
using PaymentService.Application.Features.Transactions.ViewModels;

namespace PaymentService.API.Controllers;

[ApiController]
[Route("transactions")]
public class TransactionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TransactionsController(IMediator mediator)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionVm>>> List(
        [FromQuery] GetTransactionsForOwner getTransactionsForOwner, CancellationToken cancellationToken)
    {
        var transactions = await _mediator.Send(getTransactionsForOwner, cancellationToken);

        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(new
        {
            transactions.TotalCount,
            transactions.CurrentPage,
            transactions.PageSize,
            transactions.TotalPage
        }, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        }));

        return Ok(transactions);
    }
}