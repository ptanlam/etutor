using System.Text.Json;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Features.Methods.Commands.AddNewMethod;
using PaymentService.Application.Features.Methods.Queries.GetMethodById;
using PaymentService.Application.Features.Methods.Queries.GetMethodsPagedListForUser;
using PaymentService.Application.Features.Methods.ViewModels;
using PaymentService.Application.Responses;

namespace PaymentService.API.Controllers;

[ApiController]
[Route("methods")]
public class MethodsController : ControllerBase
{
    private readonly IMediator _mediator;

    public MethodsController(IMediator mediator)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<MethodVm>>> List(
        [FromQuery] GetMethodsPagedListForUser getMethodsPagedListForUser, CancellationToken cancellationToken)
    {
        var methodsPagedList = await _mediator.Send(getMethodsPagedListForUser, cancellationToken);

        Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(new
        {
            methodsPagedList.TotalCount,
            methodsPagedList.CurrentPage,
            methodsPagedList.PageSize,
            methodsPagedList.TotalPage
        }, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        }));

        return Ok(methodsPagedList);
    }

    [HttpGet("{id:guid}", Name = "GetMethodById")]
    public async Task<ActionResult<MethodVm>> GetById([FromRoute] GetMethodById getMethodById,
        CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(getMethodById, cancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<MethodVm>> Add([FromQuery] string userId, [FromBody] AddNewMethod addNewMethod,
        CancellationToken cancellationToken)
    {
        addNewMethod.UserId = userId;
        var method = await _mediator.Send(addNewMethod, cancellationToken);
        return CreatedAtRoute("GetMethodById", new {id = method.Id}, method);
    }
}