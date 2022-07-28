using System;
using System.Collections.Generic;
using CourseService.Domain.CourseAggregate;
using CourseService.Domain.ValueTypes;
using FluentAssertions;
using Xunit;

namespace CourseService.UnitTesting.Domain
{
    public class CourseAggregateUnitTesting
    {
        private readonly Course _course = new(DateTime.Parse("2022-09-09"), DateTime.Parse("2022-12-09"), "Monday, " +
            "Tuesday", 18, 0, 19, 15, new Money(10_000_000, "VND"), Guid.NewGuid());
        
        [Fact]
        public void Creation_ShouldReturnExpectedCourseDetails()
        {
            var startDate = DateTime.Parse("2022-09-09");
            var endDate = startDate.AddMonths(3);
            var learningDays = "Monday, Tuesday, Wednesday";
            var startAtHour = 18;
            var startAtMinute = 15;
            var endAtHour = 19;
            var endAtMinute = 15;
            var tuitionFee = new Money(10_000_000, "VND");
            var subjectId = Guid.NewGuid();

            var course = new Course(startDate, endDate, learningDays, startAtHour, startAtMinute, endAtHour, 
                endAtMinute, tuitionFee, subjectId);

            course.StartDate.Should().Be(startDate);
            course.EndDate.Should().Be(endDate);
            course.SubjectId.Should().Be(subjectId);
        }
    }
}