using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using TutorService.API.Authorization.Handlers;
using TutorService.API.Authorization.Requirements;
using TutorService.API.Constants;
using TutorService.Application.Options;

namespace TutorService.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomAuthorization(this IServiceCollection services,
            IdentityProviderOptions identityProviderOptions)
        {
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizationPolicies.CanCreateTutors, policy =>
                    policy.Requirements.Add(new HasScopeRequirement("create:tutors",
                        identityProviderOptions.Authority)));

                options.AddPolicy(AuthorizationPolicies.CanReadInactiveTutors, policy =>
                    policy.Requirements.Add(new HasScopeRequirement("read:inactive-tutors",
                        identityProviderOptions.Authority)));

                options.AddPolicy(AuthorizationPolicies.CanActivateTutors, policy =>
                    policy.Requirements.Add(new HasScopeRequirement("activate:tutors",
                        identityProviderOptions.Authority)));
            });
        }
    }
}