using ReservationProject.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;

namespace ReservationProject
{
    public class Program
    {
        public static void Main(string[] args)
        {
          //  CreateWebHostBuilder(args).Build().Run();

          var host = CreateWebHostBuilder(args).Build();
          CreateDbIfNotExists(host);
          host.Run();
        }

        private static void CreateDbIfNotExists(IWebHost host)
        {
          using (var scope = host.Services.CreateScope())
          {
            var services = scope.ServiceProvider;
            try
            {
              var context = services.GetRequiredService<ReservationContext>();
              DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
              var logger = services.GetRequiredService<ILogger<Program>>();
              logger.LogError(ex, "An error occurred creating the DB.");
            }
          }
        }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
