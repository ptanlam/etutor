namespace EnrollmentService.Infrastructure.Options
{
    public class RabbitMqOptions
    {
        public const string RabbitMq = "RabbitMq";

        public string Host { get; init; }
        public string Username { get; init; }
        public string Password { get; init; }
    }
}