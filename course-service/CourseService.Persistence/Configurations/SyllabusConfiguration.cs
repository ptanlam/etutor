using CourseService.Domain.CourseAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseService.Persistence.Configurations
{
    public class SyllabusConfiguration : IEntityTypeConfiguration<Syllabus>
    {
        public void Configure(EntityTypeBuilder<Syllabus> builder)
        {
            builder.ToTable("Syllabi");
            
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Title).HasMaxLength(250);
            builder.Property(s => s.Description).HasMaxLength(500);
            builder.Property(s => s.Achievements).HasMaxLength(500);
        }
    }
}