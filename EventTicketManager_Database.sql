-- ==========================================
-- EVENT TICKET MANAGER - DATABASE SCHEMA
-- Microsoft SQL Server
-- ==========================================

-- ==========================================
-- CREATE DATABASE
-- ==========================================

-- Drop database if it exists
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'EventTicketManagerDB')
BEGIN
    ALTER DATABASE EventTicketManagerDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE EventTicketManagerDB;
END
GO

-- Create new database
CREATE DATABASE EventTicketManagerDB
    ON PRIMARY (
        NAME = 'EventTicketManager_Data',
        FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15\MSSQL.1\DATA\EventTicketManager_Data.mdf',
        SIZE = 100MB,
        MAXSIZE = UNLIMITED,
        FILEGROWTH = 10MB
    )
    LOG ON (
        NAME = 'EventTicketManager_Log',
        FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15\MSSQL.1\DATA\EventTicketManager_Log.ldf',
        SIZE = 50MB,
        MAXSIZE = UNLIMITED,
        FILEGROWTH = 10MB
    );
GO

-- Use the newly created database
USE EventTicketManagerDB;
GO

-- ==========================================
-- DROP EXISTING TABLES (if re-running script)
-- ==========================================

-- Drop existing tables if they exist (in reverse order of dependencies)
IF OBJECT_ID('dbo.Booth', 'U') IS NOT NULL DROP TABLE dbo.Booth;
IF OBJECT_ID('dbo.Ticket', 'U') IS NOT NULL DROP TABLE dbo.Ticket;
IF OBJECT_ID('dbo.Payment', 'U') IS NOT NULL DROP TABLE dbo.Payment;
IF OBJECT_ID('dbo.OrderDetail', 'U') IS NOT NULL DROP TABLE dbo.OrderDetail;
IF OBJECT_ID('dbo.[Order]', 'U') IS NOT NULL DROP TABLE dbo.[Order];
IF OBJECT_ID('dbo.SponsorEvent', 'U') IS NOT NULL DROP TABLE dbo.SponsorEvent;
IF OBJECT_ID('dbo.TicketType', 'U') IS NOT NULL DROP TABLE dbo.TicketType;
IF OBJECT_ID('dbo.Event', 'U') IS NOT NULL DROP TABLE dbo.Event;
IF OBJECT_ID('dbo.Sponsor', 'U') IS NOT NULL DROP TABLE dbo.Sponsor;
IF OBJECT_ID('dbo.Organizer', 'U') IS NOT NULL DROP TABLE dbo.Organizer;
IF OBJECT_ID('dbo.Account', 'U') IS NOT NULL DROP TABLE dbo.Account;

GO

-- ==========================================
-- CREATE TABLES
-- ==========================================

-- 1. Account Table
CREATE TABLE dbo.Account (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    Email NVARCHAR(255) NOT NULL UNIQUE,
    [Password] NVARCHAR(MAX) NOT NULL,
    AccountRole INT NOT NULL, -- 1: Admin, 2: Organizer, 3: Sponsor, 4: Attendee
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0
);

-- 2. Organizer Table
CREATE TABLE dbo.Organizer (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    AccountId UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    Contact NVARCHAR(255) NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Organizer_Account FOREIGN KEY (AccountId) REFERENCES dbo.Account(Id) ON DELETE CASCADE
);

-- 3. Sponsor Table
CREATE TABLE dbo.Sponsor (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    AccountId UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    Information NVARCHAR(MAX) NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Sponsor_Account FOREIGN KEY (AccountId) REFERENCES dbo.Account(Id) ON DELETE CASCADE
);

-- 4. Event Table
CREATE TABLE dbo.Event (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    Title NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    Place NVARCHAR(255) NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0
);

-- 5. SponsorEvent Table (Many-to-Many)
CREATE TABLE dbo.SponsorEvent (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    SponsorId UNIQUEIDENTIFIER NOT NULL,
    EventId UNIQUEIDENTIFIER NOT NULL,
    Contribution INT NOT NULL,
    SponsorLevel INT NOT NULL, -- Enum value
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_SponsorEvent_Sponsor FOREIGN KEY (SponsorId) REFERENCES dbo.Sponsor(Id) ON DELETE CASCADE,
    CONSTRAINT FK_SponsorEvent_Event FOREIGN KEY (EventId) REFERENCES dbo.Event(Id) ON DELETE CASCADE
);

-- 6. TicketType Table
CREATE TABLE dbo.TicketType (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    EventId UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    Quantity INT NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_TicketType_Event FOREIGN KEY (EventId) REFERENCES dbo.Event(Id) ON DELETE CASCADE
);

-- 7. Order Table
CREATE TABLE dbo.[Order] (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    AccountId UNIQUEIDENTIFIER NOT NULL,
    OrderDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [Status] INT NOT NULL, -- 0: Pending, 1: Paid, 2: Cancelled
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Order_Account FOREIGN KEY (AccountId) REFERENCES dbo.Account(Id) ON DELETE CASCADE
);

-- 8. OrderDetail Table
CREATE TABLE dbo.OrderDetail (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER NOT NULL,
    Total INT NOT NULL,
    Quantity INT NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_OrderDetail_Order FOREIGN KEY (OrderId) REFERENCES dbo.[Order](Id) ON DELETE CASCADE
);

-- 9. Ticket Table
CREATE TABLE dbo.Ticket (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    TicketTypeId UNIQUEIDENTIFIER NOT NULL,
    OrderDetailId UNIQUEIDENTIFIER NOT NULL,
    [Status] INT NOT NULL, -- Enum value for TicketStatus
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Ticket_TicketType FOREIGN KEY (TicketTypeId) REFERENCES dbo.TicketType(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Ticket_OrderDetail FOREIGN KEY (OrderDetailId) REFERENCES dbo.OrderDetail(Id) ON DELETE CASCADE
);

-- 10. Payment Table
CREATE TABLE dbo.Payment (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER NOT NULL,
    Amount INT NOT NULL,
    PaymentMethod INT NOT NULL, -- 0: Cash, 1: CreditCard, 2: BankTransfer, 3: EWallet
    PaymentDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Payment_Order FOREIGN KEY (OrderId) REFERENCES dbo.[Order](Id) ON DELETE CASCADE
);

-- 11. Booth Table
CREATE TABLE dbo.Booth (
    Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
    SponsorEventId UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    Location NVARCHAR(255) NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy NVARCHAR(255),
    ModifiedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ModifiedBy NVARCHAR(255),
    IsDeleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_Booth_SponsorEvent FOREIGN KEY (SponsorEventId) REFERENCES dbo.SponsorEvent(Id) ON DELETE CASCADE
);

GO

-- ==========================================
-- CREATE INDEXES
-- ==========================================

-- Account indexes
CREATE INDEX IX_Account_Email ON dbo.Account(Email);
CREATE INDEX IX_Account_AccountRole ON dbo.Account(AccountRole);
CREATE INDEX IX_Account_IsDeleted ON dbo.Account(IsDeleted);

-- Organizer indexes
CREATE INDEX IX_Organizer_AccountId ON dbo.Organizer(AccountId);
CREATE INDEX IX_Organizer_IsDeleted ON dbo.Organizer(IsDeleted);

-- Sponsor indexes
CREATE INDEX IX_Sponsor_AccountId ON dbo.Sponsor(AccountId);
CREATE INDEX IX_Sponsor_IsDeleted ON dbo.Sponsor(IsDeleted);

-- Event indexes
CREATE INDEX IX_Event_StartDate ON dbo.Event(StartDate);
CREATE INDEX IX_Event_EndDate ON dbo.Event(EndDate);
CREATE INDEX IX_Event_IsDeleted ON dbo.Event(IsDeleted);

-- SponsorEvent indexes
CREATE INDEX IX_SponsorEvent_SponsorId ON dbo.SponsorEvent(SponsorId);
CREATE INDEX IX_SponsorEvent_EventId ON dbo.SponsorEvent(EventId);
CREATE INDEX IX_SponsorEvent_SponsorLevel ON dbo.SponsorEvent(SponsorLevel);
CREATE INDEX IX_SponsorEvent_IsDeleted ON dbo.SponsorEvent(IsDeleted);

-- TicketType indexes
CREATE INDEX IX_TicketType_EventId ON dbo.TicketType(EventId);
CREATE INDEX IX_TicketType_IsDeleted ON dbo.TicketType(IsDeleted);

-- Order indexes
CREATE INDEX IX_Order_AccountId ON dbo.[Order](AccountId);
CREATE INDEX IX_Order_OrderDate ON dbo.[Order](OrderDate);
CREATE INDEX IX_Order_Status ON dbo.[Order]([Status]);
CREATE INDEX IX_Order_IsDeleted ON dbo.[Order](IsDeleted);

-- OrderDetail indexes
CREATE INDEX IX_OrderDetail_OrderId ON dbo.OrderDetail(OrderId);
CREATE INDEX IX_OrderDetail_IsDeleted ON dbo.OrderDetail(IsDeleted);

-- Ticket indexes
CREATE INDEX IX_Ticket_TicketTypeId ON dbo.Ticket(TicketTypeId);
CREATE INDEX IX_Ticket_OrderDetailId ON dbo.Ticket(OrderDetailId);
CREATE INDEX IX_Ticket_Status ON dbo.Ticket([Status]);
CREATE INDEX IX_Ticket_IsDeleted ON dbo.Ticket(IsDeleted);

-- Payment indexes
CREATE INDEX IX_Payment_OrderId ON dbo.Payment(OrderId);
CREATE INDEX IX_Payment_PaymentMethod ON dbo.Payment(PaymentMethod);
CREATE INDEX IX_Payment_PaymentDate ON dbo.Payment(PaymentDate);
CREATE INDEX IX_Payment_IsDeleted ON dbo.Payment(IsDeleted);

-- Booth indexes
CREATE INDEX IX_Booth_SponsorEventId ON dbo.Booth(SponsorEventId);
CREATE INDEX IX_Booth_IsDeleted ON dbo.Booth(IsDeleted);

GO

-- ==========================================
-- INSERT SAMPLE DATA (Optional)
-- ==========================================

-- Sample Account (Admin)
INSERT INTO dbo.Account (Email, [Password], AccountRole)
VALUES ('admin@eventticket.com', 'hashed_password_admin', 1);

-- Sample Account (Organizer)
DECLARE @OrganizerAccountId UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.Account (Id, Email, [Password], AccountRole)
VALUES (@OrganizerAccountId, 'organizer@eventticket.com', 'hashed_password_organizer', 2);

-- Sample Organizer
INSERT INTO dbo.Organizer (AccountId, [Name], [Description], Contact)
VALUES (@OrganizerAccountId, 'Tech Event Organizers', 'Professional event organizing company', '0123456789');

-- Sample Event
DECLARE @EventId UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.Event (Id, Title, [Description], StartDate, EndDate, Place)
VALUES (@EventId, 'Tech Conference 2025', 'Annual technology conference', '2025-06-01 08:00:00', '2025-06-03 17:00:00', 'Convention Center, City');

-- Sample TicketTypes
DECLARE @TicketType1 UNIQUEIDENTIFIER = NEWID();
DECLARE @TicketType2 UNIQUEIDENTIFIER = NEWID();

INSERT INTO dbo.TicketType (Id, EventId, [Name], Price, [Description], Quantity)
VALUES 
    (@TicketType1, @EventId, 'Early Bird', 500000, 'Early bird discount ticket', 100),
    (@TicketType2, @EventId, 'Regular', 750000, 'Regular ticket', 200);

-- Sample Account (Attendee)
DECLARE @AttendeeAccountId UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.Account (Id, Email, [Password], AccountRole)
VALUES (@AttendeeAccountId, 'attendee@eventticket.com', 'hashed_password_attendee', 4);

-- Sample Order
DECLARE @OrderId UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.[Order] (Id, AccountId, OrderDate, [Status])
VALUES (@OrderId, @AttendeeAccountId, GETUTCDATE(), 0);

-- Sample OrderDetail
DECLARE @OrderDetailId UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.OrderDetail (Id, OrderId, Total, Quantity)
VALUES (@OrderDetailId, @OrderId, 1000000, 2);

-- Sample Ticket
INSERT INTO dbo.Ticket (TicketTypeId, OrderDetailId, [Status])
VALUES (@TicketType1, @OrderDetailId, 0);

-- Sample Payment
INSERT INTO dbo.Payment (OrderId, Amount, PaymentMethod, PaymentDate)
VALUES (@OrderId, 1000000, 1, GETUTCDATE());

GO

-- ==========================================
-- VERIFICATION QUERIES
-- ==========================================

-- Show all tables
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME;

-- Show total records in each table
SELECT 'Account' AS TableName, COUNT(*) AS RecordCount FROM dbo.Account UNION ALL
SELECT 'Organizer', COUNT(*) FROM dbo.Organizer UNION ALL
SELECT 'Sponsor', COUNT(*) FROM dbo.Sponsor UNION ALL
SELECT 'Event', COUNT(*) FROM dbo.Event UNION ALL
SELECT 'SponsorEvent', COUNT(*) FROM dbo.SponsorEvent UNION ALL
SELECT 'TicketType', COUNT(*) FROM dbo.TicketType UNION ALL
SELECT '[Order]', COUNT(*) FROM dbo.[Order] UNION ALL
SELECT 'OrderDetail', COUNT(*) FROM dbo.OrderDetail UNION ALL
SELECT 'Ticket', COUNT(*) FROM dbo.Ticket UNION ALL
SELECT 'Payment', COUNT(*) FROM dbo.Payment UNION ALL
SELECT 'Booth', COUNT(*) FROM dbo.Booth
ORDER BY TableName;

GO
