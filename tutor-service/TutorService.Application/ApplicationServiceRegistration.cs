using System;
using System.Reflection;
using CourseService.Application;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TutorService.Application.Options;

namespace TutorService.Application
{
    public static class ApplicationServiceRegistration
    {
        public static void AddApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddGrpc();
            
            var grpcOptions = new GrpcOptions();
            configuration.GetSection(GrpcOptions.Grpc).Bind(grpcOptions);

            services.AddGrpcClient<Files.FilesClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.StorageService);
            });
            
            services.AddGrpcClient<Courses.CoursesClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.CoursesService);
            });
            
            services.AddGrpcClient<Constants.ConstantsClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.ConstantsService);
            });
            
            services.AddGrpcClient<Identities.IdentitiesClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.IdentitiesService);
            });
        }
    }
}