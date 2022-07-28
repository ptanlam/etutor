using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PaymentService.Application.Contracts.Persistence;
using PaymentService.Persistence.Repositories;

namespace PaymentService.Persistence;

public static class PersistenceServiceRegistration
{
    public static void AddPersistenceService(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));

        services.AddScoped(typeof(IReadRepository<>), typeof(BaseRepository<>));
        services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IMethodsRepository, MethodsRepository>();
        services.AddScoped<ITransactionsRepository, TransactionsRepository>();
    }
}