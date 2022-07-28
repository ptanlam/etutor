using System;
using CourseService.Domain.CourseAggregate;
using FluentAssertions;
using Xunit;

namespace CourseService.UnitTesting.Domain
{
    public class SyllabusUnitTesting
    {
        [Fact]
        public void Creation_ShouldReturnExpectedSyllabus()
        {
            var fromDate = DateTime.Parse("2022-09-09");
            var toDate = fromDate.AddDays(21);
            var title = "Title";
            var description = @"
                - Getting started with basic Math concepts.
            ";
            var achievements = @"
                - Basic Math knowledge.
                - Basic calculations.
                - Basic algorithms.
            ";

            var syllabus = new Syllabus(title, description, achievements, fromDate, toDate);

            syllabus.Description.Should().Be(description);
            syllabus.Achievements.Should().Be(achievements);
            syllabus.FromDate.Should().Be(fromDate);
            syllabus.ToDate.Should().Be(toDate);
        }
    }
}