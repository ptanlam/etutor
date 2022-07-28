using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TutorService.Domain.TutorAggregate;

namespace TutorService.Persistence.Configuration
{
    public class RentalConfiguration : IEntityTypeConfiguration<Rental>
    {
        public void Configure(EntityTypeBuilder<Rental> builder)
        {
            builder.ToTable("Rentals");

            builder.OwnsOne(r => r.Cost, c =>
            {
                c.Property(p => p.Amount)
                    .HasColumnType("decimal(10,2)")
                    .HasPrecision(10, 2)
                    .HasColumnName("CostAmount");

                c.Property(p => p.Unit)
                    .HasMaxLength(3)
                    .HasColumnName("CostUnit");
            });
        }
    }
}