using EnrollmentService.Domain.EnrollmentAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnrollmentService.Persistence.Configurations
{
    public class EnrollmentTransactionConfiguration : IEntityTypeConfiguration<EnrollmentTransaction>
    {
        public void Configure(EntityTypeBuilder<EnrollmentTransaction> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.Type).HasMaxLength(20);
            builder.Property(e => e.Notes).HasMaxLength(250);
            builder.Property(e => e.PerformerId).HasMaxLength(50);

            builder.HasOne(e => e.OldEnrollment);
            builder.HasOne(e => e.NewEnrollment);
        }
    }
}