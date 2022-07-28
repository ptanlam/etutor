using EnrollmentService.Application.Contracts.Persistence;
using EnrollmentService.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EnrollmentService.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static void RegisterPersistenceService(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(cfg => cfg.UseSqlServer(connectionString));

            services.AddScoped(typeof(IAsyncReadRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IEnrollmentsRepository, EnrollmentsRepository>();
            services.AddScoped<IPerformersRepository, PerformersRepository>();
        }
    }
}