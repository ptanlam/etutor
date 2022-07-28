using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Persistence.Configuration
{
    public class DegreeConfiguration : IEntityTypeConfiguration<Degree>
    {
        public void Configure(EntityTypeBuilder<Degree> builder)
        {
            builder.Property(d => d.Name).IsRequired().HasMaxLength(250);
            builder.Property(d => d.GraduatedUniversity).HasMaxLength(250);
            builder.Property(d => d.Major).IsRequired().HasMaxLength(250);
            builder.Property(d => d.AcademicRankId).IsRequired().HasMaxLength(50);
        }
    }
}