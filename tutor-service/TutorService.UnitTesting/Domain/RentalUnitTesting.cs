using FluentAssertions;
using TutorService.Domain.TutorAggregate;
using TutorService.Domain.ValueObjects;
using Xunit;

namespace TutorService.UnitTesting.Domain
{
    public class RentalUnitTesting
    {
        private readonly Rental _rental = new Rental(new Money(150_000, "VND"));
        
        [Fact]
        public void Creation_ShouldReturnExpectedRental()
        {
            var cost = new Money(150_000, "VND");

            var rental = new Rental(cost);

            rental.Cost.Amount.Should().Be(cost.Amount);
            rental.Cost.Unit.Should().Be(cost.Unit);
            rental.IsActive.Should().BeTrue();
        }

        [Fact]
        public void Deactivate_ShouldBeInactive()
        {
            _rental.Deactivate();
            _rental.IsActive.Should().BeFalse();
        }
    }
}