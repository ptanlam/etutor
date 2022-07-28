namespace IdentityService.Infrastructure.IntegrationMessages.Commands
{
    public interface AssignRoleForUserCommand
    {
        public string UserId { get; }
        public string Role { get; }
    }
}
