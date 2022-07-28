using PaymentService.Application;
using PaymentService.Infrastructure;
using PaymentService.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddPersistenceService(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddInfrastructureService(builder.Configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(act => act.AddDefaultPolicy(cfg =>
{
    cfg.WithOrigins(builder.Configuration["AllowedOrigins"].Split(','))
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod()
        .WithExposedHeaders("X-Pagination");
}));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();