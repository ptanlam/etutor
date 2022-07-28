using CourseService.Domain.CourseAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseService.Persistence.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.StartDate).IsRequired();
            builder.Property(c => c.EndDate).IsRequired();
            builder.Property(c => c.LearningDays).HasMaxLength(250).IsRequired();
            builder.Property(c => c.StartAtHour).HasMaxLength(10).IsRequired();
            builder.Property(c => c.StartAtMinute).IsRequired();
            builder.Property(c => c.EndAtHour).IsRequired();
            builder.Property(c => c.EndAtMinute).IsRequired();

            builder.OwnsOne(c => c.TuitionFee, tf =>
            {
                tf.Property(m => m.Amount).HasColumnType("decimal(17, 2)").HasColumnName("TuitionFeeAmount")
                    .IsRequired();
                tf.Property(m => m.Unit).HasMaxLength(3).IsFixedLength().HasColumnName("TuitionFeeUnit")
                    .IsRequired();
            });
        }
    }
}