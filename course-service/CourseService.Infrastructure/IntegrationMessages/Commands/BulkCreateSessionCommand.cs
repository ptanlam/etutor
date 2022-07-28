namespace CourseService.Infrastructure.IntegrationMessages.Commands
{
    public interface BulkCreateSessionCommand
    {
        string CourseId { get; }
        string OwnerId { get; }
        string StudentId { get; }
        long StartDate { get; }
        long EndDate { get; }
        string StartAt { get; }
        string EndAt { get; }
        string LearningDays { get; }
        string Timezone { get; }
    }
}
