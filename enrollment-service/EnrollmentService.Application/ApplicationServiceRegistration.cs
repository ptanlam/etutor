using System;
using System.Reflection;
using EnrollmentService.Application.Options;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EnrollmentService.Application
{
    public static class ApplicationServiceRegistration
    {
        public static void RegisterApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            var grpcOptions = new GrpcOptions();
            configuration.GetSection(GrpcOptions.Name).Bind(grpcOptions);
            
            services.AddGrpcClient<Courses.CoursesClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.CoursesService);
            });
            
            services.AddGrpcClient<Sessions.SessionsClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.SessionsService);
            });
        }
    }
}