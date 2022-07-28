namespace TutorService.Infrastructure.IntegrationMessages.Commands
{
    public interface UpdateTutorFullNameCommand
    {
        public string UserId { get; }
        public string FullName { get; }
    }
}