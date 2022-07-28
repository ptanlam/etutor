using System.Linq;
using System.Threading.Tasks;
using EnrollmentService.API.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;

namespace EnrollmentService.API.Authorization.Handlers
{
    public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            HasScopeRequirement requirement)
        {
            var hasValidScope = context.User.HasClaim(c => c.Type == "scope" &&
                                                           c.Issuer == requirement.Issuer);

            if (!hasValidScope) return Task.CompletedTask;

            var scopes = context.User.FindFirst(c => c.Type == "scope" &&
                                                     c.Issuer == requirement.Issuer)?.Value.Split(' ');

            if (scopes != null && scopes.Any(s => s == requirement.Scope))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }

}