# Event Ticket Manager - Architecture & Design Patterns

## 📚 Mục Lục
1. [Tổng Quan Kiến Trúc](#tổng-quan-kiến-trúc)
2. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
3. [Design Patterns](#design-patterns)
4. [Quy Tắc Code](#quy-tắc-code)
5. [Hướng Dẫn Thêm Chức Năng Mới](#hướng-dẫn-thêm-chức-năng-mới)

---

## 🏗️ Tổng Quan Kiến Trúc

Dự án sử dụng **Clean Architecture** với 3 layers chính:

```
┌─────────────────────────────────────┐
│     Presentation Layer (API)        │
│  - Controllers                      │
│  - Middlewares                      │
│  - Extensions (DI)                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Business Logic Layer (BLL)      │
│  - Services (Interfaces)            │
│  - DTOs                             │
│  - Mappings (AutoMapper)            │
│  - Exceptions                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Data Access Layer (DLL)         │
│  - DbContext                        │
│  - Entities                         │
│  - Repositories (Interfaces)        │
│  - Unit of Work                     │
└─────────────────────────────────────┘
```

---

## 📁 Cấu Trúc Dự Án

### **Inventory.API** (Presentation Layer)
```
Inventory.API/
├── Controllers/
│   ├── BaseController.cs          # Base controller với CRUD chuẩn
│   └── AuthController.cs          # Authentication endpoints
├── Middlewares/
│   ├── ExceptionMiddleware.cs     # Global exception handling
│   └── LogMiddleware.cs           # Request/Response logging
├── Extensions/
│   └── DependencyInjection.cs     # Tất cả DI configuration
├── Program.cs                      # Entry point (gọn gàng)
└── appsettings.json
```

### **Inventory.BLL** (Business Logic Layer)
```
Inventory.BLL/
├── Services/
│   ├── IBaseService.cs            # Interface chung cho services
│   ├── BaseService.cs             # Implementation base service
│   ├── IAuthService.cs            # Interface authentication
│   └── AuthService.cs             # Logic đăng nhập/đăng ký
├── DTOs/
│   ├── AccountDTO.cs
│   ├── LoginRequestDTO.cs
│   ├── RegisterRequestDTO.cs
│   ├── AuthResponseDTO.cs
│   └── [Entity]DTO.cs            # Mỗi entity có 1 DTO
├── Mappings/
│   └── MappingProfile.cs         # AutoMapper configuration
└── Exceptions/
    └── NotFoundException.cs       # Custom exceptions
```

### **Inventory.DLL** (Data Access Layer)
```
Inventory.DLL/
├── Entities/
│   ├── BaseEntity.cs             # Base class cho tất cả entities
│   ├── Account.cs
│   ├── Event.cs
│   ├── Ticket.cs
│   └── [Other entities]
├── Emun/
│   ├── AccountRole.cs
│   ├── OrderStatus.cs
│   └── [Other enums]
├── Repositories/
│   ├── IBaseRepository.cs        # Interface repository
│   └── BaseRepository.cs         # Generic repository implementation
├── UnitOfWork/
│   ├── IUnitOfWork.cs           # Interface Unit of Work
│   └── UnitOfWork.cs            # Quản lý repositories & transactions
└── EventDbContext.cs             # EF Core DbContext
```

---

## 🎨 Design Patterns

### 1. **Repository Pattern**
**Mục đích:** Tách biệt logic truy xuất data khỏi business logic

**Interface:**
```csharp
public interface IBaseRepository<T> where T : class
{
    Task<IEnumerable<T>> Read(Expression<Func<T, bool>>? filter = null,
                             Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                             int pageNumber = 1,
                             int pageSize = 100);
    Task<T?> Read(object id);
    Task<T> Create(T entity);
    Task Update(T entity);
    Task Delete(object id);
}
```

**Cách dùng:**
```csharp
// Trong service
private readonly IBaseRepository<Account> _accountRepo;

public async Task<Account> GetAccountByEmail(string email)
{
    var accounts = await _accountRepo.Read(a => a.Email == email);
    return accounts.FirstOrDefault();
}
```

### 2. **Unit of Work Pattern**
**Mục đích:** Quản lý transactions và tập trung tất cả repositories

**Interface:**
```csharp
public interface IUnitOfWork : IDisposable
{
    IBaseRepository<Account> AccountRepository { get; }
    IBaseRepository<Event> EventRepository { get; }
    // ... other repositories
    
    Task<int> SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();
}
```

**Cách dùng:**
```csharp
// Trong service - Transaction example
private readonly IUnitOfWork _unitOfWork;

public async Task CreateEventWithTickets(EventDTO eventDto)
{
    await _unitOfWork.BeginTransactionAsync();
    try
    {
        var newEvent = await _unitOfWork.EventRepository.Create(eventEntity);
        
        foreach (var ticket in tickets)
        {
            await _unitOfWork.TicketRepository.Create(ticket);
        }
        
        await _unitOfWork.CommitTransactionAsync();
    }
    catch
    {
        await _unitOfWork.RollbackTransactionAsync();
        throw;
    }
}
```

### 3. **Service Layer Pattern**
**Mục đích:** Chứa business logic, validation, mapping

**Interface:**
```csharp
public interface IBaseService<TDto> where TDto : class
{
    Task<TDto> Create(TDto dto);
    Task<List<TDto>> Read(int pageSize, int pageNumber);
    Task<TDto> Read(int id);
    Task Update(TDto dto);
    Task Delete(int id);
}
```

**Implementation:**
```csharp
public class BaseService<TEntity, TDto> : IBaseService<TDto>
    where TEntity : class
    where TDto : class
{
    private readonly IBaseRepository<TEntity> _repository;
    private readonly IMapper _mapper;

    public BaseService(IBaseRepository<TEntity> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public virtual async Task<TDto> Create(TDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        var newEntity = await _repository.Create(entity);
        return _mapper.Map<TDto>(newEntity);
    }
    // ... other methods
}
```

### 4. **Dependency Injection Pattern**
**Mục đích:** Loose coupling, dễ test, dễ maintain

**File: `Extensions/DependencyInjection.cs`**
```csharp
public static class DependencyInjection
{
    // Infrastructure (Database, Repositories, UnitOfWork)
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<EventDbContext>(options => ...);
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;
    }

    // Application Services (Business Logic)
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddSingleton<IMapper>(mapper);
        services.AddScoped<IAuthService, AuthService>();
        return services;
    }

    // Authentication & Authorization
    public static IServiceCollection AddAuthenticationAndAuthorization(this IServiceCollection services)
    {
        services.AddAuthentication("Bearer").AddJwtBearer(...);
        return services;
    }
}
```

**Program.cs được đơn giản hóa:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Gọi các extension methods
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddAuthenticationAndAuthorization();
builder.Services.AddCorsConfiguration();
builder.Services.AddControllers();
builder.Services.AddSwaggerConfiguration();

var app = builder.Build();
```

### 5. **DTO Pattern**
**Mục đích:** Tách biệt data structure giữa layers, validation

**Ví dụ:**
```csharp
public class LoginRequestDTO
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public required string Password { get; set; }
}

public class AuthResponseDTO
{
    public int AccountId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
```

### 6. **Middleware Pattern**
**Mục đích:** Cross-cutting concerns (logging, exception handling)

**Exception Middleware:**
```csharp
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }
}
```

---

## 📏 Quy Tắc Code

### **Naming Conventions**

| Loại | Convention | Ví dụ |
|------|-----------|--------|
| Interface | `I[Name]` | `IAuthService`, `IUnitOfWork` |
| Service | `[Name]Service` | `AuthService`, `EventService` |
| Repository | `[Name]Repository` | `BaseRepository<T>` |
| DTO | `[Name]DTO` | `LoginRequestDTO`, `EventDTO` |
| Controller | `[Name]Controller` | `AuthController`, `EventController` |
| Entity | `[Name]` | `Account`, `Event`, `Ticket` |

### **File Organization**

```
✅ ĐÚNG:
- 1 file = 1 class/interface
- Tên file = Tên class
- Group theo feature trong folder

❌ SAI:
- Nhiều classes trong 1 file
- Tên file khác tên class
```

### **Dependency Rules**

```
API (Controllers) 
  ↓ phụ thuộc
BLL (Services, DTOs)
  ↓ phụ thuộc
DLL (Repositories, Entities)

❌ KHÔNG BAO GIỜ:
- DLL reference BLL
- BLL reference API
```

### **Authentication & Authorization**

**JWT Token Structure:**
```csharp
Claims:
- NameIdentifier: account.Id
- Email: account.Email
- Role: account.accountRole (Admin, Organizer, Sponsor, Attendee)

Expires: 7 days
Secret: Configured in DependencyInjection.cs
```

**Controller Authorization:**
```csharp
[Authorize(Roles = "Admin")]              // Chỉ Admin
[Authorize(Roles = "Admin,Organizer")]    // Admin HOẶC Organizer
[AllowAnonymous]                          // Public endpoint
```

---

## 🚀 Hướng Dẫn Thêm Chức Năng Mới

### **Scenario 1: Thêm Entity Mới (VD: Review)**

#### Bước 1: Tạo Entity trong DLL
```csharp
// Inventory.DLL/Entities/Review.cs
public class Review : BaseEntity
{
    public Guid EventId { get; set; }
    public Guid AccountId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    
    // Navigation properties
    public Event Event { get; set; } = null!;
    public Account Account { get; set; } = null!;
}
```

#### Bước 2: Update DbContext
```csharp
// Inventory.DLL/EventDbContext.cs
public DbSet<Review> Reviews { get; set; } = null!;

// Trong OnModelCreating
modelBuilder.Entity<Review>()
    .HasOne(r => r.Event)
    .WithMany()
    .HasForeignKey(r => r.EventId);
```

#### Bước 3: Thêm vào UnitOfWork
```csharp
// IUnitOfWork.cs
IBaseRepository<Review> ReviewRepository { get; }

// UnitOfWork.cs
private IBaseRepository<Review>? _reviewRepository;

public IBaseRepository<Review> ReviewRepository
{
    get
    {
        if (_reviewRepository == null)
            _reviewRepository = new BaseRepository<Review>(_context);
        return _reviewRepository;
    }
}
```

#### Bước 4: Tạo DTO
```csharp
// Inventory.BLL/DTOs/ReviewDTO.cs
public class ReviewDTO
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public int AccountId { get; set; }
    
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
    
    [MaxLength(500)]
    public string Comment { get; set; } = string.Empty;
}
```

#### Bước 5: Thêm Mapping
```csharp
// Inventory.BLL/Mappings/MappingProfile.cs
CreateMap<Review, ReviewDTO>().ReverseMap();
```

#### Bước 6: Tạo Service (nếu cần logic đặc biệt)
```csharp
// Inventory.BLL/Services/IReviewService.cs
public interface IReviewService : IBaseService<ReviewDTO>
{
    Task<List<ReviewDTO>> GetReviewsByEventId(Guid eventId);
}

// Inventory.BLL/Services/ReviewService.cs
public class ReviewService : BaseService<Review, ReviewDTO>, IReviewService
{
    private readonly IUnitOfWork _unitOfWork;
    
    public ReviewService(IUnitOfWork unitOfWork, IMapper mapper) 
        : base(unitOfWork.ReviewRepository, mapper)
    {
        _unitOfWork = unitOfWork;
    }
    
    public async Task<List<ReviewDTO>> GetReviewsByEventId(Guid eventId)
    {
        var reviews = await _unitOfWork.ReviewRepository
            .Read(r => r.EventId == eventId);
        return _mapper.Map<List<ReviewDTO>>(reviews);
    }
}
```

#### Bước 7: Register Service trong DI
```csharp
// Inventory.API/Extensions/DependencyInjection.cs
public static IServiceCollection AddApplicationServices(this IServiceCollection services)
{
    // ... existing services
    services.AddScoped<IReviewService, ReviewService>();
    return services;
}
```

#### Bước 8: Tạo Controller
```csharp
// Inventory.API/Controllers/ReviewController.cs
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowOnlyInventoryUIApp")]
public class ReviewController : BaseController<IReviewService, ReviewDTO>
{
    private readonly IReviewService _reviewService;
    
    public ReviewController(IReviewService reviewService) : base(reviewService)
    {
        _reviewService = reviewService;
    }
    
    [HttpGet("event/{eventId}")]
    public async Task<IActionResult> GetByEventId(Guid eventId)
    {
        var reviews = await _reviewService.GetReviewsByEventId(eventId);
        return Ok(reviews);
    }
}
```

#### Bước 9: Migration
```powershell
# Trong Package Manager Console
Add-Migration AddReviewEntity
Update-Database
```

---

### **Scenario 2: Thêm Endpoint Đặc Biệt**

**VD: Thống kê số vé bán được theo sự kiện**

#### Bước 1: Tạo DTO Response
```csharp
// Inventory.BLL/DTOs/EventStatisticsDTO.cs
public class EventStatisticsDTO
{
    public Guid EventId { get; set; }
    public string EventName { get; set; } = string.Empty;
    public int TotalTicketsSold { get; set; }
    public decimal TotalRevenue { get; set; }
    public Dictionary<string, int> TicketTypeBreakdown { get; set; } = new();
}
```

#### Bước 2: Thêm method trong Service
```csharp
// IEventService.cs
Task<EventStatisticsDTO> GetEventStatistics(Guid eventId);

// EventService.cs
public async Task<EventStatisticsDTO> GetEventStatistics(Guid eventId)
{
    var eventEntity = await _unitOfWork.EventRepository.Read(eventId);
    if (eventEntity == null)
        throw new NotFoundException("Event not found");
    
    var tickets = await _unitOfWork.TicketRepository
        .Read(t => t.TicketType.EventId == eventId && t.Status == TicketStatus.Sold);
    
    var statistics = new EventStatisticsDTO
    {
        EventId = eventId,
        EventName = eventEntity.Name,
        TotalTicketsSold = tickets.Count(),
        TotalRevenue = tickets.Sum(t => t.Price),
        TicketTypeBreakdown = tickets
            .GroupBy(t => t.TicketType.Name)
            .ToDictionary(g => g.Key, g => g.Count())
    };
    
    return statistics;
}
```

#### Bước 3: Thêm endpoint trong Controller
```csharp
[HttpGet("{eventId}/statistics")]
[Authorize(Roles = "Admin,Organizer")]
public async Task<IActionResult> GetStatistics(Guid eventId)
{
    var stats = await _eventService.GetEventStatistics(eventId);
    return Ok(stats);
}
```

---

### **Scenario 3: Xử Lý Transaction Phức Tạp**

**VD: Đặt vé (Order) với nhiều loại vé**

```csharp
public async Task<OrderDTO> CreateOrder(CreateOrderRequestDTO request)
{
    await _unitOfWork.BeginTransactionAsync();
    
    try
    {
        // 1. Tạo Order
        var order = new Order
        {
            AccountId = request.AccountId,
            Status = OrderStatus.Pending,
            TotalAmount = 0
        };
        var createdOrder = await _unitOfWork.OrderRepository.Create(order);
        
        decimal totalAmount = 0;
        
        // 2. Tạo OrderDetails cho từng loại vé
        foreach (var item in request.Items)
        {
            var ticketType = await _unitOfWork.TicketTypeRepository.Read(item.TicketTypeId);
            if (ticketType == null)
                throw new NotFoundException($"TicketType {item.TicketTypeId} not found");
            
            var orderDetail = new OrderDetail
            {
                OrderId = createdOrder.Id,
                TicketTypeId = item.TicketTypeId,
                Quantity = item.Quantity,
                UnitPrice = ticketType.Price
            };
            await _unitOfWork.OrderDetailRepository.Create(orderDetail);
            
            // 3. Tạo Tickets
            for (int i = 0; i < item.Quantity; i++)
            {
                var ticket = new Ticket
                {
                    TicketTypeId = item.TicketTypeId,
                    OrderDetailId = orderDetail.Id,
                    Status = TicketStatus.Reserved,
                    Price = ticketType.Price
                };
                await _unitOfWork.TicketRepository.Create(ticket);
            }
            
            totalAmount += ticketType.Price * item.Quantity;
        }
        
        // 4. Update Order total amount
        createdOrder.TotalAmount = totalAmount;
        await _unitOfWork.OrderRepository.Update(createdOrder);
        
        // 5. Commit transaction
        await _unitOfWork.CommitTransactionAsync();
        
        return _mapper.Map<OrderDTO>(createdOrder);
    }
    catch (Exception)
    {
        await _unitOfWork.RollbackTransactionAsync();
        throw;
    }
}
```

---

## 🔐 Security Best Practices

### **1. Password Hashing**
```csharp
// ĐANG DÙNG: SHA256 (Basic)
private string HashPassword(string password)
{
    using (var sha256 = SHA256.Create())
    {
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }
}

// RECOMMENDED: BCrypt hoặc PBKDF2
// Install: BCrypt.Net-Next
using BCrypt.Net;

private string HashPassword(string password)
{
    return BCrypt.HashPassword(password);
}

private bool VerifyPassword(string inputPassword, string storedHash)
{
    return BCrypt.Verify(inputPassword, storedHash);
}
```

### **2. JWT Configuration**
```csharp
// Nên lưu trong appsettings.json hoặc Azure Key Vault
{
  "JwtSettings": {
    "Secret": "your-super-secret-key-minimum-32-characters",
    "Issuer": "your-app-name",
    "Audience": "your-app-name",
    "ExpiryInDays": 7
  }
}
```

### **3. Input Validation**
```csharp
// Sử dụng Data Annotations trong DTOs
[Required(ErrorMessage = "Email is required.")]
[EmailAddress(ErrorMessage = "Invalid email format.")]
public string Email { get; set; }

[RegularExpression(@"^(?=.*[A-Z])(?=.*[\W_]).{12,}$", 
    ErrorMessage = "Password must be at least 12 characters...")]
public string Password { get; set; }
```

---

## 🧪 Testing Guidelines

### **Unit Test Structure**
```csharp
public class AuthServiceTests
{
    private readonly Mock<EventDbContext> _mockContext;
    private readonly Mock<IMapper> _mockMapper;
    private readonly AuthService _authService;
    
    public AuthServiceTests()
    {
        _mockContext = new Mock<EventDbContext>();
        _mockMapper = new Mock<IMapper>();
        _authService = new AuthService(_mockContext.Object, _mockMapper.Object);
    }
    
    [Fact]
    public async Task Register_WithValidData_ShouldReturnAuthResponse()
    {
        // Arrange
        var registerDto = new RegisterRequestDTO
        {
            Email = "test@example.com",
            Password = "SecurePass123!",
            Role = "Attendee"
        };
        
        // Act
        var result = await _authService.Register(registerDto);
        
        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Token);
    }
}
```

---

## 📊 Database Schema Reference

### **Core Entities Relations**
```
Account (1) ──┬──> (0..1) Organizer
              └──> (0..1) Sponsor
              └──> (*) Order

Event (1) ──> (*) TicketType
          └──> (*) SponsorEvent

TicketType (1) ──> (*) Ticket

Order (1) ──> (*) OrderDetail
          └──> (*) Payment

OrderDetail (1) ──> (*) Ticket

SponsorEvent (1) ──> (*) Booth
```

---

## 🎯 Common Tasks Checklist

### **Khi thêm feature mới:**
- [ ] Tạo Entity trong DLL/Entities
- [ ] Update DbContext (DbSet + relationships)
- [ ] Tạo DTO trong BLL/DTOs
- [ ] Thêm AutoMapper mapping
- [ ] Tạo Interface và Service trong BLL/Services
- [ ] Register service trong DependencyInjection.cs
- [ ] Tạo Controller trong API/Controllers
- [ ] Thêm migration và update database
- [ ] Test endpoints trong Swagger
- [ ] Viết unit tests

### **Khi sửa bug:**
- [ ] Xác định layer bị lỗi (API/BLL/DLL)
- [ ] Check logs trong LogMiddleware
- [ ] Debug từ Controller → Service → Repository
- [ ] Fix và viết test case để tránh regression

---

## 📞 Support & Resources

**Documentation:**
- Entity Framework Core: https://docs.microsoft.com/ef/core
- ASP.NET Core: https://docs.microsoft.com/aspnet/core
- AutoMapper: https://docs.automapper.org

**Tools:**
- Swagger UI: `/swagger` (khi chạy API)
- SQL Server Management Studio (SSMS)
- Postman (testing APIs)

---

**Last Updated:** November 15, 2025  
**Version:** 1.0  
**Maintained by:** Development Team
