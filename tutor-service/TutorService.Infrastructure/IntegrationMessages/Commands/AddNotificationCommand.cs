namespace TutorService.Infrastructure.IntegrationMessages.Commands
{
    public interface AddNotificationCommand
    {
        public string Email { get; }
        public string UserId { get; }
        public string Title { get; }
        public string Content { get; }
    }
}