using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
 
namespace LifeSpot
{
   public class Startup
   {
       public void ConfigureServices(IServiceCollection services)
       {
       }
 
       public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
       {
           if (env.IsDevelopment())
               app.UseDeveloperExceptionPage();
 
           app.UseRouting();
           app.UseStaticFiles();
           
           // Загружаем отдельные элементы для вставки в шаблон: боковое меню и футер
           string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
           string sideBarHtml =  File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));
 
           // Используем настройку из EndpointMapper.cs
           EndpointMapper.Configure(app);
       }
   }
}