using System;
using EnrollmentService.Domain.EnrollmentAggregate;
using EnrollmentService.Domain.EnrollmentAggregate.Enums;
using FluentAssertions;
using Xunit;

namespace EnrollmentService.UnitTesting.Domain
{
    public class EnrollmentTransactionUnitTesting
    {
        [Fact]
        public void Creation_ShouldReturnExpectedEnrollmentTransaction()
        {
            var action = TransactionType.Transfer;
            var notes = "very long note";
            var performerId = Guid.NewGuid();

            var enrollmentTransaction = new EnrollmentTransaction(action, notes, performerId);

            enrollmentTransaction.Type.Should().Be(action.ToString());
            enrollmentTransaction.Notes.Should().Be(notes);
            enrollmentTransaction.PerformerId.Should().Be(performerId);
        }
    }
}