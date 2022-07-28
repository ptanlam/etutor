using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Application.Model;
using IdentityService.Application.Options;
using Microsoft.Extensions.Options;

namespace IdentityService.Infrastructure.Services
{
    public class ManagementTokenService : IManagementTokenService 
    {
        private readonly HttpClient _httpClient;
        private readonly Auth0Options _auth0Options;

        public ManagementTokenService(HttpClient httpClient, IOptions<Auth0Options> options)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _auth0Options = options.Value;
        }

        public async Task<ManagementTokenPayload> GetTokenPayload()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/oauth/token");
            request.Content = new StringContent($"{{\"client_id\":\"{_auth0Options.ClientId}\"," + 
                                                $"\"client_secret\":\"{_auth0Options.ClientSecret}\"," + 
                                                $"\"audience\":\"{_auth0Options.Audience}\"," + 
                                                $"\"grant_type\":\"{_auth0Options.GrantType}\"}}",
                Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request);
            var tokenPayload = await response.Content.ReadFromJsonAsync<ManagementTokenPayload>(
                new JsonSerializerOptions {PropertyNameCaseInsensitive = true});
            
            return tokenPayload;
        }
    }
}