using CourseService.Application.Contracts.Persistence;
using CourseService.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CourseService.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static void RegisterPersistenceService(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(cfg => cfg.UseSqlServer(connectionString));

            services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IAsyncReadRepository<>), typeof(BaseRepository<>));

            services.AddScoped<ISubjectsRepository, SubjectsRepository>();
            services.AddScoped<ICoursesRepository, CoursesRepository>();
            
            services.AddHealthChecks().AddDbContextCheck<ApplicationDbContext>();

        }
    }
}