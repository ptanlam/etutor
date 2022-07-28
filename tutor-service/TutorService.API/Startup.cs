using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TutorService.API.Extensions;
using TutorService.Application;
using TutorService.Application.Options;
using TutorService.Infrastructure;
using TutorService.Infrastructure.Services;
using TutorService.Persistence;

namespace TutorService.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationService(Configuration);
            services.AddPersistenceService(Configuration);
            services.AddInfrastructureService(Configuration);

            var identityProviderOptions = new IdentityProviderOptions();
            Configuration.GetSection(IdentityProviderOptions.Name).Bind(identityProviderOptions);
                
            services.AddCors(cfg => cfg.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins(Configuration["AllowedOrigins"].Split(","))
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }));
            
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = identityProviderOptions.Authority;
                options.Audience = identityProviderOptions.Audience;
            });

            services.AddCustomAuthorization(identityProviderOptions);
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseCors();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGrpcService<TutorsService>();
            });
        }
    }
}