namespace PaymentService.Infrastructure.Options;

public class PaypalOptions
{
    public const string Paypal = "Paypal";

    public string SandboxUrl { get; init; } = string.Empty;
    public string ClientId { get; init; } = string.Empty;
    public string Secret { get; init; } = string.Empty;
}