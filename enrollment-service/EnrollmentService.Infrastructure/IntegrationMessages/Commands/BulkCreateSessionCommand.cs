namespace EnrollmentService.Infrastructure.IntegrationMessages.Commands
{
    public interface BulkCreateSessionCommand
    {
        string CourseId { get; }
        string OwnerId { get; }
        string EnrollmentId { get; }
        long StartDate { get; }
        long EndDate { get; }
        string StartAt { get; }
        string EndAt { get; }
        string LearningDays { get; }
    }
}