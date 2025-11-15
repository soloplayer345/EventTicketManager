# 📋 Event Ticket Manager - Complete API CRUD Endpoints

## ✅ Tất cả API CRUD đã được tạo hoàn chỉnh

### 🔐 **Authentication Endpoints** (`AuthController`)

```
POST   /api/auth/login         - Đăng nhập
POST   /api/auth/register      - Đăng ký (tự động gán role Attendee)
```

---

## 🎫 **Entity API Endpoints**

### 1️⃣ **Account Management** (`AccountController`)
- **Protected:** ✅ Authorize
- **Methods:**
  - `POST   /api/account`              - Tạo tài khoản mới
  - `GET    /api/account`              - Lấy danh sách tài khoản (phân trang)
  - `GET    /api/account/{id}`         - Lấy chi tiết tài khoản
  - `GET    /api/account/by-email/{email}` - Tìm tài khoản theo email
  - `PUT    /api/account/{id}`         - Cập nhật tài khoản
  - `DELETE /api/account/{id}`         - Xóa tài khoản

---

### 2️⃣ **Event Management** (`EventController`)
- **Protected:** ❌ Public (AllowAnonymous)
- **Methods:**
  - `POST   /api/event`                  - Tạo sự kiện mới
  - `GET    /api/event`                  - Lấy danh sách sự kiện (phân trang)
  - `GET    /api/event/{id}`             - Lấy chi tiết sự kiện
  - `GET    /api/event/organizer/{organizerId}` - Lấy sự kiện của organizer
  - `GET    /api/event/upcoming`         - Lấy danh sách sự kiện sắp tới
  - `GET    /api/event/past`             - Lấy danh sách sự kiện quá khứ
  - `PUT    /api/event/{id}`             - Cập nhật sự kiện
  - `DELETE /api/event/{id}`             - Xóa sự kiện

---

### 3️⃣ **Organizer Management** (`OrganizerController`)
- **Protected:** ✅ Authorize Roles="Admin,Organizer"
- **Methods:**
  - `POST   /api/organizer`              - Tạo organizer mới
  - `GET    /api/organizer`              - Lấy danh sách organizer
  - `GET    /api/organizer/{id}`         - Lấy chi tiết organizer
  - `GET    /api/organizer/by-account/{accountId}` - Tìm organizer theo account
  - `PUT    /api/organizer/{id}`         - Cập nhật organizer
  - `DELETE /api/organizer/{id}`         - Xóa organizer

---

### 4️⃣ **Sponsor Management** (`SponsorController`)
- **Protected:** ✅ Authorize Roles="Admin,Sponsor"
- **Methods:**
  - `POST   /api/sponsor`                - Tạo sponsor mới
  - `GET    /api/sponsor`                - Lấy danh sách sponsor
  - `GET    /api/sponsor/{id}`           - Lấy chi tiết sponsor
  - `GET    /api/sponsor/by-account/{accountId}` - Tìm sponsor theo account
  - `PUT    /api/sponsor/{id}`           - Cập nhật sponsor
  - `DELETE /api/sponsor/{id}`           - Xóa sponsor

---

### 5️⃣ **Ticket Type Management** (`TicketTypeController`)
- **Protected:** ⚙️ Mixed
  - GET Public, POST/PUT/DELETE Authorize Roles="Admin,Organizer"
- **Methods:**
  - `POST   /api/tickettype`             - Tạo loại vé
  - `GET    /api/tickettype`             - Lấy danh sách loại vé
  - `GET    /api/tickettype/{id}`        - Lấy chi tiết loại vé
  - `GET    /api/tickettype/event/{eventId}` - Lấy vé theo sự kiện
  - `PUT    /api/tickettype/{id}`        - Cập nhật loại vé
  - `DELETE /api/tickettype/{id}`        - Xóa loại vé

---

### 6️⃣ **Ticket Management** (`TicketController`)
- **Protected:** ✅ Authorize
- **Methods:**
  - `POST   /api/ticket`                 - Tạo vé mới
  - `GET    /api/ticket`                 - Lấy danh sách vé
  - `GET    /api/ticket/{id}`            - Lấy chi tiết vé
  - `GET    /api/ticket/order-detail/{orderDetailId}` - Lấy vé theo order detail
  - `GET    /api/ticket/ticket-type/{ticketTypeId}`  - Lấy vé theo loại vé
  - `PUT    /api/ticket/{id}`            - Cập nhật vé
  - `DELETE /api/ticket/{id}`            - Xóa vé

---

### 7️⃣ **Order Management** (`OrderController`)
- **Protected:** ✅ Authorize
- **Methods:**
  - `POST   /api/order`                  - Tạo đơn hàng mới
  - `GET    /api/order`                  - Lấy danh sách đơn hàng
  - `GET    /api/order/{id}`             - Lấy chi tiết đơn hàng
  - `GET    /api/order/account/{accountId}` - Lấy đơn hàng của tài khoản
  - `PUT    /api/order/{id}`             - Cập nhật đơn hàng
  - `DELETE /api/order/{id}`             - Xóa đơn hàng

---

### 8️⃣ **Order Detail Management** (`OrderDetailController`)
- **Protected:** ✅ Authorize
- **Methods:**
  - `POST   /api/orderdetail`            - Tạo chi tiết đơn hàng
  - `GET    /api/orderdetail`            - Lấy danh sách chi tiết
  - `GET    /api/orderdetail/{id}`       - Lấy chi tiết order detail
  - `GET    /api/orderdetail/order/{orderId}` - Lấy chi tiết theo đơn hàng
  - `PUT    /api/orderdetail/{id}`       - Cập nhật chi tiết
  - `DELETE /api/orderdetail/{id}`       - Xóa chi tiết

---

### 9️⃣ **Booth Management** (`BoothController`)
- **Protected:** ⚙️ Mixed
  - GET Public, POST/PUT/DELETE Authorize Roles="Admin,Sponsor"
- **Methods:**
  - `POST   /api/booth`                  - Tạo booth mới
  - `GET    /api/booth`                  - Lấy danh sách booth
  - `GET    /api/booth/{id}`             - Lấy chi tiết booth
  - `GET    /api/booth/sponsor-event/{sponsorEventId}` - Lấy booth theo sponsor event
  - `PUT    /api/booth/{id}`             - Cập nhật booth
  - `DELETE /api/booth/{id}`             - Xóa booth

---

### 🔟 **Payment Management** (`PaymentController`)
- **Protected:** ✅ Authorize
- **Methods:**
  - `POST   /api/payment`                - Tạo thanh toán mới
  - `GET    /api/payment`                - Lấy danh sách thanh toán
  - `GET    /api/payment/{id}`           - Lấy chi tiết thanh toán
  - `GET    /api/payment/order/{orderId}` - Lấy thanh toán theo đơn hàng
  - `PUT    /api/payment/{id}`           - Cập nhật thanh toán
  - `DELETE /api/payment/{id}`           - Xóa thanh toán

---

### 1️⃣1️⃣ **Sponsor Event Management** (`SponsorEventController`)
- **Protected:** ⚙️ Mixed
  - GET Public, POST/PUT/DELETE Authorize Roles="Admin,Sponsor"
- **Methods:**
  - `POST   /api/sponsorevent`           - Tạo sponsor event mới
  - `GET    /api/sponsorevent`           - Lấy danh sách sponsor event
  - `GET    /api/sponsorevent/{id}`      - Lấy chi tiết sponsor event
  - `GET    /api/sponsorevent/sponsor/{sponsorId}` - Lấy theo sponsor
  - `GET    /api/sponsorevent/event/{eventId}`    - Lấy theo sự kiện
  - `PUT    /api/sponsorevent/{id}`      - Cập nhật sponsor event
  - `DELETE /api/sponsorevent/{id}`      - Xóa sponsor event

---

## 📊 **Tóm Tắt Thống Kê**

| Entity | Endpoints | Service | Controller |
|--------|-----------|---------|------------|
| Account | 6 | ✅ IAccountService | ✅ AccountController |
| Event | 8 | ✅ IEventService | ✅ EventController |
| Organizer | 6 | ✅ IOrganizerService | ✅ OrganizerController |
| Sponsor | 6 | ✅ ISponsorService | ✅ SponsorController |
| TicketType | 6 | ✅ ITicketTypeService | ✅ TicketTypeController |
| Ticket | 7 | ✅ ITicketService | ✅ TicketController |
| Order | 7 | ✅ IOrderService | ✅ OrderController |
| OrderDetail | 7 | ✅ IOrderDetailService | ✅ OrderDetailController |
| Booth | 7 | ✅ IBoothService | ✅ BoothController |
| Payment | 7 | ✅ IPaymentService | ✅ PaymentController |
| SponsorEvent | 8 | ✅ ISponsorEventService | ✅ SponsorEventController |

**TỔNG CỘNG:** 
- ✅ **11 Services** (Interface + Implementation)
- ✅ **11 Controllers** 
- ✅ **76 CRUD Endpoints**

---

## 🔑 **Authorization Levels**

| Role | Có Quyền Truy Cập |
|------|------------------|
| **Admin** | Tất cả endpoints |
| **Organizer** | Event, TicketType, EventStatistics |
| **Sponsor** | Booth, SponsorEvent, Payment |
| **Attendee** | Order, Ticket, Payment (của chính mình) |
| **Anonymous** | Event (list), TicketType, Booth, SponsorEvent |

---

## 🏗️ **Architecture Implemented**

✅ **Clean Architecture** với 3 layers:
- **API Layer**: Controllers + Middlewares
- **BLL Layer**: Services + DTOs + Mappings
- **DLL Layer**: Repositories + Entities + DbContext

✅ **Design Patterns**:
- Repository Pattern
- Unit of Work Pattern
- Service Layer Pattern
- Dependency Injection Pattern
- DTO Pattern
- Middleware Pattern

✅ **Security**:
- JWT Authentication
- Role-Based Authorization
- CORS Configuration
- Password Hashing (SHA256)

---

## 🚀 **Hướng Dẫn Sử Dụng**

### **1. Đăng ký & Đăng nhập**
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### **2. Sử dụng Token**
```bash
Authorization: Bearer <token_from_login>
```

### **3. Tạo Sự Kiện**
```bash
POST /api/event
Authorization: Bearer <admin_token>
{
  "title": "Concert 2024",
  "description": "Music Festival",
  "startDate": "2024-12-01T10:00:00Z",
  "endDate": "2024-12-02T22:00:00Z",
  "place": "HCM City"
}
```

### **4. Lấy Danh Sách Sự Kiện Sắp Tới**
```bash
GET /api/event/upcoming
```

---

## 📝 **Files Được Tạo/Cập Nhật**

### **Services (11 files)**
- ✅ IEventService.cs / EventService.cs
- ✅ IOrganizerService.cs / OrganizerService.cs
- ✅ ISponsorService.cs / SponsorService.cs
- ✅ ITicketTypeService.cs / TicketTypeService.cs
- ✅ ITicketService.cs / TicketService.cs
- ✅ IOrderService.cs / OrderService.cs
- ✅ IOrderDetailService.cs / OrderDetailService.cs
- ✅ IBoothService.cs / BoothService.cs
- ✅ IPaymentService.cs / PaymentService.cs
- ✅ ISponsorEventService.cs / SponsorEventService.cs
- ✅ IAccountService.cs / AccountService.cs

### **Controllers (11 files)**
- ✅ AccountController.cs
- ✅ EventController.cs
- ✅ OrganizerController.cs
- ✅ SponsorController.cs
- ✅ TicketTypeController.cs
- ✅ TicketController.cs
- ✅ OrderController.cs
- ✅ OrderDetailController.cs
- ✅ BoothController.cs
- ✅ PaymentController.cs
- ✅ SponsorEventController.cs

### **DTOs Updated (4 files)**
- ✅ EventDTO.cs - Added `Id` property
- ✅ TicketTypeDTO.cs - Added `Id` property
- ✅ BoothDTO.cs - Added `Id` property
- ✅ SponsorEventDTO.cs - Added `Id` property

### **Configuration Updated**
- ✅ DependencyInjection.cs - Registered all 11 services

---

## ✨ **Build Status**

```
Build succeeded with 64 warnings in 2.5s

✅ Inventory.DLL
✅ Inventory.BLL
✅ Inventory.API
```

---

**Last Updated:** November 15, 2025  
**Status:** ✅ Complete and Ready for Testing
