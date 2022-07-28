using MediatR;
using PaymentService.Application.Features.Methods.ViewModels;

namespace PaymentService.Application.Features.Methods.Queries.GetMethodById;

public class GetMethodById : IRequest<MethodVm>
{
    public Guid Id { get; init; }
}