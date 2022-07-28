using CourseService.Domain.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseService.Persistence.Configurations
{
    public class SubjectConfiguration : IEntityTypeConfiguration<Subject>
    {
        public void Configure(EntityTypeBuilder<Subject> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name).HasMaxLength(250).IsRequired();
            builder.Property(c => c.TutorId).HasMaxLength(50).IsRequired();
            builder.Property(c => c.EducationalLevelId).HasMaxLength(50).IsRequired();
            builder.Property(c => c.EducationalGradeId).HasMaxLength(50);

            builder.HasIndex(c => new {c.TutorId, c.Name, c.EducationalLevelId, c.EducationalGradeId}).IsUnique();
        }
    }
}