using System;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using EnrollmentService.Domain.Common;
using EnrollmentService.Domain.EnrollmentAggregate;
using EnrollmentService.Domain.PerformerAggregate;
using Microsoft.EntityFrameworkCore;

namespace EnrollmentService.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<EnrollmentTransaction> EnrollmentTransactions { get; set; }
        public DbSet<Performer> Performers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Detached:
                        break;
                    case EntityState.Unchanged:
                        break;
                    case EntityState.Deleted:
                        break;
                    case EntityState.Modified:
                        entry.Entity.UpdatedAt = DateTime.UtcNow;
                        break;
                    case EntityState.Added:
                        entry.Entity.CreatedAt = DateTime.UtcNow;
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
            
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}