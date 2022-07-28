using System;
using EnrollmentService.Application.Contracts.Infrastructure;
using EnrollmentService.Infrastructure.IntegrationMessages.Commands;
using EnrollmentService.Infrastructure.Options;
using EnrollmentService.Infrastructure.Services;
using IdentityService.Infrastructure.IntegrationMessages.Commands;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EnrollmentService.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static void RegisterInfrastructureService(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddScoped<IMessagingService, MessagingService>();
            services.AddScoped<ICoursesService, CoursesService>();
            services.AddScoped<ISessionsService, SessionsService>();

            var rabbitMqOptions = new RabbitMqOptions();
            configuration.GetSection(RabbitMqOptions.RabbitMq).Bind(rabbitMqOptions);

            services.AddMassTransit(x =>
            {
                x.AddBus(_ => Bus.Factory.CreateUsingRabbitMq(config =>
                {
                    config.Host(new Uri(rabbitMqOptions.Host), h =>
                    {
                        h.Username(rabbitMqOptions.Username);
                        h.Password(rabbitMqOptions.Password);
                    });

                    config.Send<BulkCreateSessionCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "session.command.bulk-create");
                    });
                    
                    config.Send<AssignRoleForUserCommand>(p =>
                    {
                        p.UseRoutingKeyFormatter(_ => "role.command.assign-for-user");
                    });
                }));
            });
        }
    }
}