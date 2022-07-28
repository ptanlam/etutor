using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Persistence.Configuration
{
    public class TutorConfiguration : IEntityTypeConfiguration<Tutor>
    {
        public void Configure(EntityTypeBuilder<Tutor> builder)
        {
            builder.Property(t => t.UserId).IsRequired().HasMaxLength(50);
            builder.Property(t => t.Description).IsRequired();

            builder.HasIndex(t => t.UserId).IsUnique();

            builder.HasMany(t => t.Certificates);
            builder.HasMany(t => t.Degrees);
            builder.HasMany(t => t.Rentals);
        }
    }
}