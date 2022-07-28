using System;
using FluentAssertions;
using TutorService.Domain.TutorAggregate;
using Xunit;

namespace TutorService.UnitTesting.Domain
{
    public class DegreeUnitTesting
    {
        private readonly Degree _degree = new("Bachelor", "IT", "HUFLIT", DateTime.Parse("12/29/2022"),
            "61e11a834846f7c161fb01db");

        [Fact]
        public void UpdateName()
        {
            var updatedName = "Updated Name";

            _degree.UpdateName(updatedName);

            _degree.Name.Should().Be(updatedName);
        }
    }
}