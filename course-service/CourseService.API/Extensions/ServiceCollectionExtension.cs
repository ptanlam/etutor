using CourseService.API.Authorization.Handlers;
using CourseService.API.Authorization.Requirements;
using CourseService.API.Constants;
using CourseService.Application.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace CourseService.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomAuthorization(this IServiceCollection services, 
            IdentityProviderOptions identityProviderOptions)
        {
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
            
            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizationPolicies.CanCreateCourses, policy => 
                    policy.Requirements.Add(new HasScopeRequirement("create:courses", 
                        identityProviderOptions.Authority)));
                
                options.AddPolicy(AuthorizationPolicies.CanReadInactiveCourses, policy => 
                    policy.Requirements.Add(new HasScopeRequirement("read:inactive-courses", 
                        identityProviderOptions.Authority)));
                
                options.AddPolicy(AuthorizationPolicies.CanActivateCourses, policy => 
                    policy.Requirements.Add(new HasScopeRequirement("activate:courses", 
                        identityProviderOptions.Authority)));
            });
        }
    }
}