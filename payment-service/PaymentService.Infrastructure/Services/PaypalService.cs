using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PaymentService.Application.Contracts.Infrastructure;
using PaymentService.Application.Features.Orders.ViewModels;
using PaymentService.Infrastructure.Options;
using PaymentService.Infrastructure.Responses;

namespace PaymentService.Infrastructure.Services;

public class PaypalService : IPaypalService
{
    private readonly HttpClient _client;
    private readonly ICachingService _cachingService;
    private readonly PaypalOptions _paypalCreds;
    private readonly JsonSerializerSettings _jsonSettings;

    public PaypalService(IOptions<PaypalOptions> options, HttpClient client, ICachingService cachingService)
    {
        _paypalCreds = options.Value;
        _client = client ?? throw new ArgumentNullException(nameof(client));
        _cachingService = cachingService ?? throw new ArgumentNullException(nameof(cachingService));
        _jsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            }
        };
    }

    public async Task<OrderVm?> CreateNewOrderAsync(decimal costAmount, string costUnit,
        CancellationToken cancellationToken = default)
    {
        var auth = await GetAuthenticationAsync(cancellationToken);
        if (auth == null) return null;

        var request = new HttpRequestMessage(HttpMethod.Post, "v2/checkout/orders");
        request.Headers.Authorization = new AuthenticationHeaderValue(auth.TokenType, auth.AccessToken);
        request.Content = new StringContent(JsonConvert.SerializeObject(new
        {
            intent = "CAPTURE",
            purchase_units = new List<object>
            {
                new
                {
                    amount = new
                    {
                        currency_code = costUnit.ToUpperInvariant(),
                        value = costAmount
                    }
                }
            }
        }), Encoding.UTF8, "application/json");

        var response = await _client.SendAsync(request, cancellationToken);
        var stringContent = await response.Content.ReadAsStringAsync(cancellationToken);
        return JsonConvert.DeserializeObject<OrderVm>(stringContent, _jsonSettings);
    }

    public async Task CaptureOrderAsync(string id, CancellationToken cancellationToken = default)
    {
        var auth = await GetAuthenticationAsync(cancellationToken);
        if (auth == null) return;

        var request = new HttpRequestMessage(HttpMethod.Post, $"/v2/checkout/orders/{id}/capture");
        request.Headers.Authorization = new AuthenticationHeaderValue(auth.TokenType, auth.AccessToken);
        request.Content = new StringContent(string.Empty, Encoding.UTF8, "application/json");

        await _client.SendAsync(request, cancellationToken);
    }

    private async Task<PaypalAuthenticationResponse?> GetAuthenticationAsync(
        CancellationToken cancellationToken = default)
    {
        var cachedAuth = await _cachingService.GetAsync<PaypalAuthenticationResponse>("paypalAuth", cancellationToken);
        if (cachedAuth != null) return cachedAuth;

        var auth = await GetAuthenticationFromRestAsync(cancellationToken);
        if (auth != null) await _cachingService.SetAsync("paypalAuth", auth, auth.ExpiresIn, cancellationToken);

        return auth;
    }

    private async Task<PaypalAuthenticationResponse?> GetAuthenticationFromRestAsync(
        CancellationToken cancellationToken = default)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, "v1/oauth2/token");

        request.Headers.Authorization = new AuthenticationHeaderValue("Basic",
            Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_paypalCreds.ClientId}:{_paypalCreds.Secret}")));
        request.Content = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>
            {new("grant_type", "client_credentials")});

        var response = await _client.SendAsync(request, cancellationToken);
        return JsonConvert.DeserializeObject<PaypalAuthenticationResponse>(
            await response.Content.ReadAsStringAsync(cancellationToken), _jsonSettings);
    }
}