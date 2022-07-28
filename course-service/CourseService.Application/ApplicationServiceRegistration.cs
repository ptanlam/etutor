using System;
using System.Reflection;
using CourseService.Application.Options;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CourseService.Application
{
    public static class ApplicationServiceRegistration
    {
        public static void RegisterApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            var grpcOptions = new GrpcOptions();
            configuration.GetSection(GrpcOptions.Name).Bind(grpcOptions);

            services.AddGrpc();

            services.AddGrpcClient<Files.FilesClient>(opt => { opt.Address = new Uri(grpcOptions.StorageService); });

            services.AddGrpcClient<Tutors.TutorsClient>(opt => { opt.Address = new Uri(grpcOptions.TutorsService); });

            services.AddGrpcClient<Constants.ConstantsClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.ConstantsService);
            });

            services.AddGrpcClient<Enrollments.EnrollmentsClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.EnrollmentsService);
            });

            services.AddGrpcClient<Sessions.SessionsClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.SessionsService);
            });
        }
    }
}