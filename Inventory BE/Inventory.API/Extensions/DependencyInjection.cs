using AutoMapper;
using Inventory.BLL.Mappings;
using Inventory.BLL.Services;
using Inventory.DLL;
using Inventory.DLL.Repositories;
using Inventory.DLL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;

namespace Inventory.API.Extensions
{
    /// <summary>
    /// Dependency Injection configuration extensions
    /// </summary>
    public static class DependencyInjection
    {
        /// <summary>
        /// Add infrastructure services including database context and repositories
        /// </summary>
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // Database Configuration
            var connectionString = configuration.GetConnectionString("LocalConnection")
                ?? throw new InvalidOperationException("Connection string 'LocalConnection' not found.");

            services.AddDbContext<EventDbContext>(options =>
                options.UseSqlServer(connectionString, b => b.MigrationsAssembly("Inventory.DLL")));

            // Repository and UnitOfWork
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }

        /// <summary>
        /// Add application services including AutoMapper and business logic services
        /// </summary>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // AutoMapper Configuration
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            // Base Service Registration
            services.AddScoped(typeof(IBaseService<,>), typeof(BaseService<,>));

            // Authentication Service
            services.AddScoped<IAuthService, AuthService>();

            // Entity Services
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IOrganizerService, OrganizerService>();
            services.AddScoped<ISponsorService, SponsorService>();
            services.AddScoped<ITicketTypeService, TicketTypeService>();
            services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderDetailService, OrderDetailService>();
            services.AddScoped<IBoothService, BoothService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<ISponsorEventService, SponsorEventService>();

            return services;
        }

        /// <summary>
        /// Add JWT authentication and authorization
        /// </summary>
        public static IServiceCollection AddAuthenticationAndAuthorization(this IServiceCollection services)
        {
            services.AddAuthentication("Bearer").AddJwtBearer("Bearer", options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "your-app",
                    ValidAudience = "your-app",
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes("ThisIsASecretKeyForJwtWith32Chars!!"))
                };
            });

            services.AddAuthorization();

            return services;
        }

        /// <summary>
        /// Add CORS configuration
        /// </summary>
        public static IServiceCollection AddCorsConfiguration(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOnlyInventoryUIApp", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            return services;
        }

        /// <summary>
        /// Add Swagger/OpenAPI configuration
        /// </summary>
        public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Inventory Management API",
                    Version = "v1",
                    Description = "Event Ticket Manager API Documentation"
                });

                // Include XML comments
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);

                // Add JWT Bearer auth definition
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Enter 'Bearer' [space] and then your token.\nExample: Bearer abc123xyz"
                });

                // Make sure Swagger UI requires the token
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            return services;
        }
    }
}
