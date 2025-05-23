using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.IO;
using System.Text;

namespace LifeSpot
{
    public static class EndpointMapper
    {
        /// <summary>
        /// Маппинг CSS-файлов
        /// </summary>
        public static void MapCss(this IEndpointRouteBuilder builder)
        {
            var cssFiles = new[] { "index.css" };
            
            foreach (var fileName in cssFiles)
            {
                builder.MapGet($"/Static/CSS/{fileName}", async context =>
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", fileName);
                    var css = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(css);
                });
            }
        }
        
        /// <summary>
        /// Маппинг JS-файлов
        /// </summary>
        public static void MapJs(this IEndpointRouteBuilder builder)
        {
            var jsFiles = new[] { "index.js", "about.js", "testing.js", "slider.js" };
            
            foreach (var fileName in jsFiles)
            {
                builder.MapGet($"/Static/JS/{fileName}", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", fileName);
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
            }
        }
        
        /// <summary>
        /// Маппинг изображений
        /// </summary>
        public static void MapImages(this IEndpointRouteBuilder builder)
        {
            var imageExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            
            builder.MapGet("/img/{imageName}", async context =>
            {
                var imageName = context.Request.RouteValues["imageName"].ToString();
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "img", imageName);
                
                if (File.Exists(imagePath))
                {
                    var imageBytes = await File.ReadAllBytesAsync(imagePath);
                    var extension = Path.GetExtension(imagePath).ToLowerInvariant();
                    
                    string contentType = extension switch
                    {
                        ".jpg" or ".jpeg" => "image/jpeg",
                        ".png" => "image/png",
                        ".gif" => "image/gif",
                        _ => "application/octet-stream"
                    };
                    
                    context.Response.ContentType = contentType;
                    await context.Response.Body.WriteAsync(imageBytes, 0, imageBytes.Length);
                }
                else
                {
                    context.Response.StatusCode = 404;
                    await context.Response.WriteAsync("Image not found");
                }
            });
        }
        
        /// <summary>
        /// Маппинг HTML-страниц
        /// </summary>
        public static void MapHtml(this IEndpointRouteBuilder builder)
        {
            string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            string sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sideBar.html"));
            string sliderHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "slider.html"));
            
            builder.MapGet("/", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
                
                // Загружаем шаблон страницы, вставляя в него элементы
                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml);
                
                await context.Response.WriteAsync(html.ToString());
            });
            
            builder.MapGet("/about", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");
                
                // Загружаем шаблон страницы, вставляя в него элементы
                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml)
                    .Replace("<!--SLIDER-->", sliderHtml);
                
                await context.Response.WriteAsync(html.ToString());
            });
            
            builder.MapGet("/testing", async context =>
            {
                var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");
                
                // Загружаем шаблон страницы, вставляя в него элементы
                var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                    .Replace("<!--SIDEBAR-->", sideBarHtml)
                    .Replace("<!--FOOTER-->", footerHtml);
                
                await context.Response.WriteAsync(html.ToString());
            });
        }

        public static void Configure(IApplicationBuilder app)
        {
            // Настраиваем маршрутизацию
            app.UseRouting();
            
            // Регистрируем маршруты
            app.UseEndpoints(endpoints =>
            {
                // Маппинг статических файлов
                MapCss(endpoints);
                MapJs(endpoints);
                MapImages(endpoints);

                // Маппинг HTML страниц
                MapHtml(endpoints);
            });
        }
    }
}
