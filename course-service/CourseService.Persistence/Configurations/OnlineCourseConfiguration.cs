using CourseService.Domain.CourseAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseService.Persistence.Configurations
{
    public class OnlineCourseConfiguration : IEntityTypeConfiguration<OnlineCourse>
    {
        public void Configure(EntityTypeBuilder<OnlineCourse> builder)
        {
            builder.HasBaseType<Course>();
            builder.ToTable("OnlineCourses");
            builder.Property(c => c.Name).HasMaxLength(250).IsRequired();
            builder.Property(c => c.Description).HasMaxLength(500).IsRequired();
            builder.Property(c => c.MaxNumberOfStudents).IsRequired();
        }
    }
}