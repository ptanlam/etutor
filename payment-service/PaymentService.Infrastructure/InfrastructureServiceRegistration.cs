using System.Net.Http.Headers;
using System.Reflection;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PaymentService.Application.Contracts.Infrastructure;
using PaymentService.Infrastructure.IntegrationMessages.Consumers;
using PaymentService.Infrastructure.Options;
using PaymentService.Infrastructure.Services;
using RabbitMQ.Client;

namespace PaymentService.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static void AddInfrastructureService(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<PaypalOptions>(configuration.GetSection(PaypalOptions.Paypal));
        var paypalOptions = new PaypalOptions();
        configuration.GetSection(PaypalOptions.Paypal).Bind(paypalOptions);
        services.AddHttpClient<IPaypalService, PaypalService>(client =>
        {
            client.BaseAddress = new Uri(paypalOptions.SandboxUrl);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        });

        var redisOptions = new RedisOptions();
        configuration.GetSection(RedisOptions.Redis).Bind(redisOptions);
        services.AddStackExchangeRedisCache(options => options.Configuration = redisOptions.Url);
        services.AddScoped<ICachingService, CachingService>();

        var rabbitMqOptions = new RabbitMqOptions();
        configuration.GetSection(RabbitMqOptions.RabbitMq).Bind(rabbitMqOptions);

        services.AddMassTransit(x =>
        {
            x.AddConsumers(Assembly.GetExecutingAssembly());

            var host = new Uri(rabbitMqOptions.Host);
            x.UsingRabbitMq((context, config) =>
            {
                config.Host(host, h =>
                {
                    h.Username(rabbitMqOptions.Username);
                    h.Password(rabbitMqOptions.Password);
                });

                config.ReceiveEndpoint("transaction-create-queue", e =>
                {
                    e.Consumer<CreateNewTransactionConsumer>(context);
                    e.Bind("payment", s =>
                    {
                        s.RoutingKey = "transaction.command.create";
                        s.ExchangeType = ExchangeType.Direct;
                    });
                });
            });
        });

        services.AddSingleton<ICoursesService, CoursesService>();
        services.AddSingleton<ITutorsService, TutorsService>();
    }
}