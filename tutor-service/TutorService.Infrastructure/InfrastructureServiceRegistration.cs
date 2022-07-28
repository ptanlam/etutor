using System;
using System.Reflection;
using CourseService.Infrastructure.IntegrationMessages.Commands;
using IdentityService.Infrastructure.IntegrationMessages.Commands;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using TutorService.Application.Contracts.Infrastructure;
using TutorService.Application.Contracts.Persistence;
using TutorService.Infrastructure.IntegrationMessages.Commands;
using TutorService.Infrastructure.IntegrationMessages.Consumers;
using TutorService.Infrastructure.Options;
using TutorService.Infrastructure.Services;

namespace TutorService.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static void AddInfrastructureService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IFilesService, FilesService>();
            services.AddScoped<ICoursesService, CoursesService>();
            services.AddScoped<IConstantsService, ConstantsService>();
            services.AddScoped<IMessagingService, MessagingService>();
            services.AddScoped<IIdentitiesService, IdentitiesService>();

            var rabbitMqOptions = new RabbitMqOptions();
            configuration.GetSection(RabbitMqOptions.RabbitMq).Bind(rabbitMqOptions);

            services.AddMassTransit(x =>
            {
                x.AddConsumers(Assembly.GetExecutingAssembly());

                x.UsingRabbitMq((context, config) =>
                {
                    config.Host(new Uri(rabbitMqOptions.Host), h =>
                    {
                        h.Username(rabbitMqOptions.Username);
                        h.Password(rabbitMqOptions.Password);
                    });

                    config.Send<UploadImageListForTutorCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "storage.command.upload");
                    });

                    config.Send<AddSubjectForTutorCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "subject.command.add");
                    });

                    config.Send<AssignRoleForUserCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "role.command.assign-for-user");
                    });

                    config.Send<AddNotificationCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "notification.command.add");
                    });

                    config.ReceiveEndpoint("tutor-update-queue", e =>
                    {
                        e.Consumer<UpdateTutorFullNameConsumer>(context);
                        e.Bind("tutor", s =>
                        {
                            s.RoutingKey = "tutor.command.update-full-name";
                            s.ExchangeType = ExchangeType.Direct;
                        });
                    });
                });
            });

            services.AddMassTransitHostedService();
        }
    }
}