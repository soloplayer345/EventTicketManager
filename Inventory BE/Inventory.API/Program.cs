using AutoMapper;
using Inventory.API.Extensions;
using Inventory.BLL.Mappings;
using Inventory.BLL.Services;
using Inventory.DLL;
using Inventory.DLL.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MySample.Middlewares;
using System.Reflection;
using System.Text;

namespace MySample
{
    /// <summary>
    /// 
    /// </summary>
    public class Program
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <exception cref="InvalidOperationException"></exception>
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services using extension methods
            builder.Services.AddInfrastructure(builder.Configuration);
            builder.Services.AddApplicationServices();
            builder.Services.AddAuthenticationAndAuthorization();
            builder.Services.AddCorsConfiguration();
            builder.Services.AddControllers();
            builder.Services.AddSwaggerConfiguration();

            var app = builder.Build();
            var message = builder.Configuration["MyMiddlewareSettings:Message"];
            app.UseMiddleware<LogMiddleware>(message);
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.UseSwagger();
            app.UseSwaggerUI();

            app.Run();
        }
    }
}