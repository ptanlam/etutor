using System;
using FluentAssertions;
using TutorService.Domain.TutorAggregate;
using Xunit;

namespace TutorService.UnitTesting.Domain
{
    public class CertificateUnitTesting
    {
        [Fact]
        public void Creation_ShouldReturnExpectedCertificate()
        {
            var name = "IELTS";
            var dateOfIssue = DateTime.Parse("08/08/2022");
            var placeOfIssue = "British Council";
            var expiresIn = dateOfIssue.AddYears(2);

            var certificate = new Certificate(name, placeOfIssue, dateOfIssue, expiresIn);

            certificate.Name.Should().Be(name);
            certificate.ExpiresIn.Should().Be(expiresIn);
            certificate.DateOfIssue.Should().Be(dateOfIssue);
            certificate.PlaceOfIssue.Should().Be(placeOfIssue);
        }
    }
}