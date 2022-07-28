using System;
using CourseService.Domain.SubjectAggregate;
using FluentAssertions;
using Xunit;

namespace CourseService.UnitTesting.Domain
{
    public class SubjectAggregateUnitTesting
    {
        private readonly Subject _subject = new("Math", Guid.NewGuid().ToString(), "61e11a384846f7c161fb01cc");

        [Fact]
        public void Creation_ShouldReturnExpectedCourse()
        {
            var name = "Math";
            var tutorId = Guid.NewGuid().ToString();
            var educationalLevelId = "61e11a384846f7c161fb01cc";
            var educationalGradeId = "61e11a834846f7c161fb01db";

            var subject = new Subject(name, tutorId, educationalLevelId, educationalGradeId);

            subject.Name.Should().Be(name);
            subject.TutorId.Should().Be(tutorId);
            subject.EducationalLevelId.Should().Be(educationalLevelId);
            subject.EducationalGradeId.Should().Be(educationalGradeId);
        }

        [Fact]
        public void Creation_WithoutEducationGrade_ShouldReturnExpectedCourse()
        {
            var name = "Math";
            var tutorId = Guid.NewGuid().ToString();
            var educationalLevelId = "61e11a384846f7c161fb01cc";

            var subject = new Subject(name, tutorId, educationalLevelId);

            subject.Name.Should().Be(name);
            subject.TutorId.Should().Be(tutorId);
            subject.EducationalLevelId.Should().Be(educationalLevelId);
            subject.EducationalGradeId.Should().Be(string.Empty);
        }

        [Fact]
        public void UpdateName_ShouldUpdateName()
        {
            var updatedName = "Advanced Math";
            _subject.UpdateName(updatedName);
            _subject.Name.Should().Be(updatedName);
        }
    }
}