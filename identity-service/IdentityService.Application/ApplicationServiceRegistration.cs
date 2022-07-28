using System;
using System.Reflection;
using FluentValidation;
using IdentityService.Application.Options;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Application
{
    public static class ApplicationServiceRegistration
    {
        public static void AddApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            services.Configure<Auth0Options>(configuration.GetSection(Auth0Options.Name));

            services.AddGrpc();
            
            var grpcOptions = new GrpcOptions();
            configuration.GetSection(GrpcOptions.Grpc).Bind(grpcOptions);
            
            services.AddGrpcClient<Constants.ConstantsClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.ConstantsService);
            });
            
            services.AddGrpcClient<Files.FilesClient>(opt =>
            {
                opt.Address = new Uri(grpcOptions.StorageService);
            });
        }
    }
}