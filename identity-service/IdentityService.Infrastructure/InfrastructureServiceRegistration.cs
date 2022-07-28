using System;
using System.Reflection;
using Auth0.ManagementApi;
using IdentityService.Application.Contracts.Infrastructure;
using IdentityService.Infrastructure.IntegrationMessages.Consumers;
using IdentityService.Infrastructure.Options;
using IdentityService.Infrastructure.Services;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using TutorService.Infrastructure.IntegrationMessages.Commands;

namespace IdentityService.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static void AddInfrastructureService(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddSingleton<IManagementConnection, HttpClientManagementConnection>();
            services.AddHttpClient<IManagementTokenService, ManagementTokenService>(client =>
            {
                client.BaseAddress = new Uri($"https://{configuration["Auth0:Domain"]}");
            });

            services.AddScoped<ICachingService, CachingService>();
            services.AddStackExchangeRedisCache(options => options.Configuration = configuration["Redis:Url"]);
            services.AddScoped<IManagementTokenManager, ManagementTokenManager>();

            services.AddScoped<IConstantsService, ConstantsService>();
            services.AddScoped<IFilesService, FilesService>();
            services.AddSingleton<IMessagingService, MessagingService>();

            var rabbitMqOptions = new RabbitMqOptions();
            configuration.GetSection(RabbitMqOptions.RabbitMq).Bind(rabbitMqOptions);

            services.AddMassTransit(x =>
            {
                x.AddConsumers(Assembly.GetExecutingAssembly());

                x.UsingRabbitMq((context, config) =>
                {
                    var host = new Uri(rabbitMqOptions.Host);

                    config.Host(host, h =>
                    {
                        h.Username(rabbitMqOptions.Username);
                        h.Password(rabbitMqOptions.Password);
                    });

                    config.ReceiveEndpoint("role-assign-queue", e =>
                    {
                        e.Consumer<AssignRoleForUserConsumer>(context);
                        e.Bind("identity", s =>
                        {
                            s.RoutingKey = "role.command.assign-for-user";
                            s.ExchangeType = ExchangeType.Direct;
                        });
                    });

                    config.Send<UpdateTutorFullNameCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "tutor.command.update-full-name");
                    });
                });
            });

            services.AddMassTransitHostedService();
        }
    }
}