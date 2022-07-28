using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Hosting;

namespace TutorService.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var port = int.Parse(Environment.GetEnvironmentVariable("PORT") ?? "80");
            var grpcPORT = int.Parse(Environment.GetEnvironmentVariable("GRPC_PORT") ?? "4000");
            
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(options =>
                    {
                        options.ListenAnyIP(port, listenOptions =>
                        {
                            listenOptions.Protocols = HttpProtocols.Http1;
                        });
                        
                        options.ListenAnyIP(grpcPORT, listenOptions =>
                        {
                            listenOptions.Protocols = HttpProtocols.Http2;
                        });
                    });
                    
                    webBuilder.UseStartup<Startup>();
                });
        }
    }
}