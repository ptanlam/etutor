namespace PaymentService.Infrastructure.Responses;

public class PaypalAuthenticationResponse
{
    public string Scope { get; init; } = string.Empty;
    public string AccessToken { get; init; } = string.Empty;
    public string TokenType { get; init; } = string.Empty;
    public string AppId { get; init; } = string.Empty;
    public double ExpiresIn { get; init; } = default;
    public string None { get; init; } = string.Empty;
}