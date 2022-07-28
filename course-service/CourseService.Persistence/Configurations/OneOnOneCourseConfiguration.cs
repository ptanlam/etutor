using CourseService.Domain.CourseAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseService.Persistence.Configurations
{
    public class OneOnOneCourseConfiguration : IEntityTypeConfiguration<OneOnOneCourse>
    {
        public void Configure(EntityTypeBuilder<OneOnOneCourse> builder)
        {
            builder.HasBaseType<Course>();
            builder.ToTable("OneOnOneCourses");
        }
    }
}