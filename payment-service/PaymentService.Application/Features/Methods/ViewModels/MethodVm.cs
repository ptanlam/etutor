namespace PaymentService.Application.Features.Methods.ViewModels;

public class MethodVm
{
    public Guid Id { get; init; }
    public string CardNumber { get; init; } = string.Empty;
    public string Expiry { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Cvc { get; init; } = string.Empty;
    public bool IsActive { get; init; }
    public bool IsPreferred { get; init; }
}