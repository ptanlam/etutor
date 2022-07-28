using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PaymentService.Domain.TransactionAggregate;

namespace PaymentService.Persistence.Configurations;

public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transactions");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.ItemId).HasMaxLength(50);
        builder.Property(t => t.OwnerId).HasMaxLength(50);
        builder.Property(t => t.Type).HasMaxLength(250);
        builder.Property(t => t.Action).HasMaxLength(250);

        builder.OwnsOne(t => t.Tracking, t =>
        {
            t.Property(p => p.CreatedAt).HasColumnName("CreatedAt");
            t.Ignore(p => p.UpdatedAt);
            t.Ignore(p => p.DeletedAt);
        });

        builder.OwnsOne(t => t.Cost, c =>
        {
            c.Property(p => p.Amount).HasColumnName("CostAmount").HasColumnType("decimal(17, 2)");
            c.Property(p => p.Unit).HasColumnName("CostUnit").HasMaxLength(3);
        });
    }
}