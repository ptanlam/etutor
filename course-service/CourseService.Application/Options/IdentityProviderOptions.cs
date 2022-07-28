namespace CourseService.Application.Options
{
    public class IdentityProviderOptions
    {
        public const string Name = "IdentityProvider";

        public string Authority { get; init; }
        public string Audience { get; init; }
    }
}