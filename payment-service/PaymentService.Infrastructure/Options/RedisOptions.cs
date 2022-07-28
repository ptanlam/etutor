namespace PaymentService.Infrastructure.Options;

public class RedisOptions
{
    public const string Redis = "Redis";

    public string Url { get; init; }
}