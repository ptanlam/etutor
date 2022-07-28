using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PaymentService.Application.Options;

namespace PaymentService.Application;

public static class ApplicationServiceRegistration
{
    public static void AddApplicationService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        var grpcOptions = new GrpcOptions();
        configuration.GetSection(GrpcOptions.Name).Bind(grpcOptions);

        services.AddGrpcClient<Courses.CoursesClient>(opt => { opt.Address = new Uri(grpcOptions.CoursesService); });
        services.AddGrpcClient<Tutors.TutorsClient>(opt => { opt.Address = new Uri(grpcOptions.TutorsService); });
    }
}