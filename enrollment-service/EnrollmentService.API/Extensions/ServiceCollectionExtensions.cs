
using EnrollmentService.API.Authorization.Handlers;
using EnrollmentService.API.Authorization.Requirements;
using EnrollmentService.API.Constants;
using EnrollmentService.Application.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace EnrollmentService.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomAuthorization(
            this IServiceCollection services,
            IdentityProviderOptions identityProviderOptions)
        {
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizationPolicies.CanCreateEnrollments, policy =>
                    policy.Requirements.Add(new HasScopeRequirement("create:enrollments",
                        identityProviderOptions.Authority)));
            });
        }

    }
}