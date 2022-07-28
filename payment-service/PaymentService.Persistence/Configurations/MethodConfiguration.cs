using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PaymentService.Domain.MethodAggregate;

namespace PaymentService.Persistence.Configurations;

public class MethodConfiguration : IEntityTypeConfiguration<Method>
{
    public void Configure(EntityTypeBuilder<Method> builder)
    {
        builder.ToTable("Methods");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.UserId).HasMaxLength(50);
        builder.Property(m => m.CardNumber).HasMaxLength(250);
        builder.Property(m => m.Expiry).HasMaxLength(10);
        builder.Property(m => m.Name).HasMaxLength(250);
        builder.Property(m => m.Cvc).HasMaxLength(3);

        builder.OwnsOne(m => m.Tracking, t =>
        {
            t.Property(p => p.CreatedAt).HasColumnName("CreatedAt");
            t.Property(p => p.UpdatedAt).HasColumnName("UpdateAt");
            t.Ignore(p => p.DeletedAt);
        });
    }
}