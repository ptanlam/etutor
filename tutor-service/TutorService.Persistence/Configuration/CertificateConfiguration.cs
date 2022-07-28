using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Persistence.Configuration
{
    public class CertificateConfiguration : IEntityTypeConfiguration<Certificate>
    {
        public void Configure(EntityTypeBuilder<Certificate> builder)
        {
            builder.Property(c => c.Name).IsRequired().HasMaxLength(250);
            builder.Property(c => c.PlaceOfIssue).IsRequired().HasMaxLength(250);
        }
    }
}