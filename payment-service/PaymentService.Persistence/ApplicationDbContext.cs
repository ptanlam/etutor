using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PaymentService.Domain.MethodAggregate;
using PaymentService.Domain.TransactionAggregate;

namespace PaymentService.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public DbSet<Method> Methods { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
}