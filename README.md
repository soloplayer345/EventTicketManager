# EventTicketManager
Event Ticket Management System

**ARCHITECTURE DIAGRAM**

![Architecture](https://raw.githubusercontent.com/soloplayer345/EventTicketManager/main/docs/architecture.png)

**COMPONENT DESCRIPTIONS**

**AUTHENTICATION & AUTHORIZATION FLOW**
1.	User Login:
o	User submits credentials → /api/auth/login.
o	Backend:
	Validates password policy.
	Checks lockout count.
	Issues JWT (access token) + refresh token or secure cookie.
o	Frontend stores token securely (HttpOnly cookie or memory).
2.	Role Display:
o	After login, the backend returns { username, role }.
o	React app shows: “Welcome, Editor” or “Welcome, Viewer”.
3.	Token Persistence:
o	Refresh token stored in DB.
o	/api/auth/refresh-token can issue new JWT when access token expires.
4.	Failed Login Lockout:
o	After 5 consecutive failures → IsLockedOut = true for X minutes.

**INVENTORY MANAGEMENT FLOW**

Hệ thống quản lý vé sự kiện cho phép quản lý người tổ chức, sự kiện, vé, đơn hàng và thanh toán.

Role	Permissions
Viewer	GET (xem danh sách/chi tiết)
Editor	GET, POST, PUT, DELETE (toàn quyền)

**EXAMPLE FLOW**
1.	Viewer gọi /api/events → trả về danh sách sự kiện chỉ đọc.
2.	Editor gọi:
o	POST /api/events → thêm sự kiện mới.
o	PUT /api/events/{id} → cập nhật sự kiện.
o	DELETE /api/events/{id} → xóa sự kiện.
3.	Middleware kiểm tra Role claim trong JWT để áp dụng quyền hạn.

**DATA MODEL OVERVIEW**
User Table
Field	Type	Notes
Id	GUID	Primary Key
Username	string	Unique
PasswordHash	string	Hashed (e.g., PBKDF2 or bcrypt)
Role	enum(Viewer, Editor)	Used for RBAC
FailedAttempts	int	Track login failures
IsLockedOut	bool	Prevent login when true

Event Table
Field	Type
Id	GUID
Name	string
Description	string
EventDate	DateTime
OrganizerId	GUID (FK)

Ticket Table
Field	Type
Id	GUID
EventId	GUID (FK)
TicketTypeId	GUID (FK)
Quantity	int
Price	decimal

**DEPLOYMENTS**
1. Chạy DB Scripts (file EventTicketManager_Database.sql) để tạo cơ sở dữ liệu (yêu cầu SQL Server 2022 trở lên, trước tiên cần tạo cơ sở dữ liệu mới có tên "EventTicketManager")
2. Chạy ứng dụng Backend từ thư mục "Inventory BE" (yêu cầu Visual Studio 2022), có thể cần sửa ConnectionStrings trong appsettings.json nếu tên SQL instance khác
3. Chạy ứng dụng Frontend từ thư mục "Inventory FE" bằng VS Code hoặc terminal:
   - Chạy lệnh: `npm install`
   - Sau đó chạy: `npm start`
   - Nếu gặp vấn đề, vui lòng làm mới trang hoặc xóa dữ liệu trang từ tab Application trong Browser

**TÀI KHOẢN TEST**
- Editor: Peter / dUY@NH123456
- Viewer: Mark / dUY@NH112233

**TECHNICAL DEBT**
1. Một số ràng buộc kinh doanh không thể hoàn thành do hạn chế về thời gian
2. Chưa áp dụng Lập trình Bất đồng bộ để đạt được các hoạt động Không chặn
3. Cần xem xét lại toàn bộ mã nguồn do thiếu thời gian
4. Có thể xảy ra một số vấn đề về hiệu suất trong phiên bản này (cơ chế Phân trang chưa được triển khai, Tối ưu hóa SQL,...)


