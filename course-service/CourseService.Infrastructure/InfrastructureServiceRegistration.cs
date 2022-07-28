using System;
using System.Reflection;
using CourseService.Application.Contracts.Infrastructure;
using CourseService.Infrastructure.IntegrationMessages.Commands;
using CourseService.Infrastructure.IntegrationMessages.Consumers;
using CourseService.Infrastructure.Options;
using CourseService.Infrastructure.Services;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;

namespace CourseService.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static void RegisterInfrastructureService(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IFilesService, FilesService>();
            services.AddScoped<ITutorsService, TutorsService>();
            services.AddScoped<IConstantsService, ConstantsService>();
            services.AddScoped<ISessionsService, SessionsService>();
            services.AddScoped<IEnrollmentsService, EnrollmentsService>();
            services.AddScoped<IMessagingService, MessagingService>();

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

                    config.ReceiveEndpoint("subject-add-queue", e =>
                    {
                        e.Consumer<AddSubjectForTutorConsumer>(context);
                        e.Bind("course", s =>
                        {
                            s.RoutingKey = "subject.command.add";
                            s.ExchangeType = ExchangeType.Direct;
                        });
                    });

                    config.Send<BulkCreateSessionCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "session.command.bulk-create");
                    });
                });
            });

            services.AddMassTransitHostedService();
        }
    }
}