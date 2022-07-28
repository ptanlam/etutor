using MediatR;
using PaymentService.Application.Features.Methods.ViewModels;

namespace PaymentService.Application.Features.Methods.Commands.AddNewMethod;

public class AddNewMethod : IRequest<MethodVm>
{
    public string UserId { get; set; } = string.Empty;
    public string CardNumber { get; init; } = string.Empty;
    public string Expiry { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Cvc { get; init; } = string.Empty;
}