namespace CourseService.Infrastructure.IntegrationMessages.Commands
{
    public class SubjectCreationDto
    {
        public string Name { get; init; }
        public string EducationalLevelId { get; init; }
        public string EducationalGradeId { get; init; }
    }
}