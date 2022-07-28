using System;
using System.Linq;
using FluentAssertions;
using TutorService.Domain.TutorAggregate;
using Xunit;

namespace TutorService.UnitTesting.Domain
{
    public class TutorAggregateUnitTesting
    {
        private readonly Tutor _tutor = new(Guid.NewGuid().ToString(), "Test Name", "very long description");

        [Fact]
        public void Creation_ShouldReturnExpectedTutor()
        {
            var userId = Guid.NewGuid().ToString();
            var description = "very long description";

            var tutor = new Tutor(userId, "Test Name", description);

            tutor.Description.Should().Be(description);
            tutor.IsActive.Should().BeFalse();
        }

        [Fact]
        public void AddDegree_ShouldAddDegree()
        {
            var name = "Bachelor of IT";
            var university = "HUFLIT";
            var major = "Information of Technology";
            var academicRank = "61e11a834846f7c161fb01db";
            var dateOfIssue = DateTime.Parse("12/12/2020");

            var degree = new Degree(name, major, university, dateOfIssue, academicRank);

            _tutor.AddDegree(degree);

            _tutor.Degrees.Count().Should().Be(1);
            _tutor.Degrees.First().Should().Be(degree);
        }

        [Fact]
        public void AddDegree_DuplicateDegree_ShouldNotAddDegree()
        {
            var name = "Bachelor of IT";
            var university = "HUFLIT";
            var major = "Information of Technology";
            var academicRank = "61e11a834846f7c161fb01db";
            var dateOfIssue = DateTime.Parse("12/12/2020");

            var degree = new Degree(name, major, university, dateOfIssue, academicRank);

            _tutor.AddDegree(degree);
            _tutor.AddDegree(degree);

            _tutor.Degrees.Count().Should().Be(1);
            _tutor.Degrees.First().Should().Be(degree);
        }

        [Fact]
        public void AddCertificate_ShouldAddCertificate()
        {
            var dateOfIssue = DateTime.Parse("11/25/2019");
            var certificate = new Certificate("IELTS", "British Council", dateOfIssue, dateOfIssue.AddYears(2));

            _tutor.AddCertificate(certificate);

            _tutor.Certificates.First().Should().Be(certificate);
            _tutor.Certificates.Count().Should().Be(1);
        }

        [Fact]
        public void AddCertificate_DuplicateCert_ShouldNotAddCertificate()
        {
            var dateOfIssue = DateTime.Parse("11/25/2019");
            var certificate = new Certificate("IELTS", "British Council",
                dateOfIssue, dateOfIssue.AddYears(2));

            _tutor.AddCertificate(certificate);
            _tutor.AddCertificate(certificate);

            _tutor.Certificates.First().Should().Be(certificate);
            _tutor.Certificates.Count().Should().Be(1);
        }

        [Fact]
        public void Deactivate_ShouldSetIsActiveToFalse()
        {
            _tutor.Deactivate();
            _tutor.IsActive.Should().BeFalse();
        }

        [Fact]
        public void Activate_ShouldSetIsActiveToFalse()
        {
            _tutor.Activate();
            _tutor.IsActive.Should().BeTrue();
        }

        [Fact]
        public void Unregister_DeletedAtShouldNotBeNull()
        {
            var success = _tutor.Unregister();

            success.Should().BeTrue();
            _tutor.DeletedAt.Should().NotBeNull();
        }

        [Fact]
        public void Unregister_ActiveTutor_ShouldReturnFalseToUnregister()
        {
            _tutor.Activate();
            var success = _tutor.Unregister();

            success.Should().BeFalse();
            _tutor.DeletedAt.Should().BeNull();
        }
    }
}