namespace IdentityService.Application.Options
{
    public class Auth0Options
    {
        public const string Name = "Auth0";
        
        public string Token { get; init; }
        public string Domain { get; init; }
        public string ClientId { get; init; }
        public string ClientSecret { get; init; }
        public string Audience { get; init; }
        public string GrantType { get; init; }
    }
}