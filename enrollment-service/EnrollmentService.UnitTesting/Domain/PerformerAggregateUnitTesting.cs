using EnrollmentService.Domain.PerformerAggregate;
using FluentAssertions;
using Xunit;

namespace EnrollmentService.UnitTesting.Domain
{
    public class PerformerAggregateUnitTesting
    {
        [Fact]
        public void Creation_ShouldReturnExpectedPerformer()
        {
            var name = "Full Name";
            var email = "example@gmail.com";

            var performer = new Performer(name, email);

            performer.Name.Should().Be(name);
            performer.Email.Should().Be(email);
        }
    }
}