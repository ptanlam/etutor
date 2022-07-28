using EnrollmentService.Domain.EnrollmentAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnrollmentService.Persistence.Configurations
{
    public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
    {
        public void Configure(EntityTypeBuilder<Enrollment> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.CourseId).HasMaxLength(50);
            builder.Property(e => e.StudentId).HasMaxLength(50);

            builder.OwnsOne(e => e.Tuition, t =>
            {
                t.Property(p => p.Amount).HasColumnName("TuitionAmount").HasColumnType("decimal(17, 2)");
                t.Property(p => p.Unit).HasColumnName("TuitionName").HasMaxLength(3);
            });
        }
    }
}