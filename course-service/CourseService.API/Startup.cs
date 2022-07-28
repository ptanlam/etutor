using CourseService.API.Extensions;
using CourseService.Application;
using CourseService.Application.Options;
using CourseService.Infrastructure;
using CourseService.Infrastructure.Services;
using CourseService.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Prometheus;

namespace CourseService.API
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
            services.RegisterApplicationService(Configuration);
            services.RegisterPersistenceService(Configuration.GetConnectionString("DefaultConnection"));
            services.RegisterInfrastructureService(Configuration);
            
            var identityProviderOptions = new IdentityProviderOptions();
            Configuration.GetSection(IdentityProviderOptions.Name).Bind(identityProviderOptions);
            
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = identityProviderOptions.Authority;
                options.Audience = identityProviderOptions.Audience;
            });

            services.AddCors(act => act.AddDefaultPolicy(cfg =>
            {
                cfg.WithOrigins(Configuration["AllowedOrigins"].Split(','))
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .WithExposedHeaders("X-Pagination");
            }));

            services.AddCustomAuthorization(identityProviderOptions);
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "CourseService.API", Version = "v1"
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint(
                    "/swagger/v1/swagger.json", "CourseService.API v1"));
            }

            app.UseHttpsRedirection();
            app.UseCors();
            app.UseRouting();
            app.UseHttpMetrics();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<CoursesService>();
                endpoints.MapControllers();
                endpoints.MapMetrics();
                endpoints.MapHealthChecks("healthz");
            });
        }
    }
}