using System;
using EnrollmentService.Domain.EnrollmentAggregate;
using EnrollmentService.Domain.ValueObjects;
using FluentAssertions;
using Xunit;

namespace EnrollmentService.UnitTesting.Domain
{
    public class EnrollmentAggregateUnitTesting
    {
        private readonly Enrollment _enrollment = new(Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString(), new Money(4000000, "vnd"), DateTime.Now,
            DateTime.Now.AddMonths(3));

        [Fact]
        public void Creation_ShouldReturnExpectedEnrollment()
        {
            var courseId = Guid.NewGuid().ToString();
            var ownerId = Guid.NewGuid().ToString();
            var cost = new Money(12000000, "VND");
            var fromDate = DateTime.Now;
            var toDate = fromDate.AddMonths(3);

            var enrollment = new Enrollment(courseId, ownerId, cost, fromDate,
                toDate);

            enrollment.CourseId.Should().Be(courseId);
            enrollment.StudentId.Should().Be(ownerId);
            enrollment.Tuition.Should().Be(cost);
            enrollment.StartDate.Should().Be(fromDate);
            enrollment.EndDate.Should().Be(toDate);
        }

        [Fact]
        public void TransferEnrollment_ShouldCreateNewEnrollmentTransaction()
        {
            var performerId = Guid.NewGuid();
            var enrollment = new Enrollment(
                _enrollment.CourseId,
                Guid.NewGuid().ToString(),
                new Money(4000000, "vnd"),
                DateTime.Now,
                DateTime.Now.AddMonths(3));

            _enrollment.Transfer(enrollment, performerId);

            _enrollment.IsCancelled.Should().BeTrue();
        }
    }
}