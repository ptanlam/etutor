using EnrollmentService.API.Extensions;
using EnrollmentService.Application;
using EnrollmentService.Application.Options;
using EnrollmentService.Infrastructure;
using EnrollmentService.Infrastructure.Services;
using EnrollmentService.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace EnrollmentService.API
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

            services.AddCors(act => act.AddDefaultPolicy(cfg =>
            {
                cfg.WithOrigins(Configuration["AllowedOrigins"].Split(','))
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .AllowAnyMethod();
            }));

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

            services.AddCustomAuthorization(identityProviderOptions);

            services.AddControllers();
            services.AddGrpc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "EnrollmentService.API", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EnrollmentService.API v1"));
            }

            app.UseHttpsRedirection();
            app.UseCors();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGrpcService<EnrollmentsService>();
            });
        }
    }
}