USE [EventTicketDB]
GO

-- Drop existing foreign key constraints if they exist
IF OBJECT_ID('FK_Organizer_Account', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Organizer] DROP CONSTRAINT [FK_Organizer_Account];
IF OBJECT_ID('FK_Sponsor_Account', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Sponsor] DROP CONSTRAINT [FK_Sponsor_Account];
IF OBJECT_ID('FK_SponsorEvent_Sponsor', 'F') IS NOT NULL
    ALTER TABLE [dbo].[SponsorEvent] DROP CONSTRAINT [FK_SponsorEvent_Sponsor];
IF OBJECT_ID('FK_SponsorEvent_Event', 'F') IS NOT NULL
    ALTER TABLE [dbo].[SponsorEvent] DROP CONSTRAINT [FK_SponsorEvent_Event];
IF OBJECT_ID('FK_TicketType_Event', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TicketType] DROP CONSTRAINT [FK_TicketType_Event];
IF OBJECT_ID('FK_Ticket_TicketType', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Ticket] DROP CONSTRAINT [FK_Ticket_TicketType];
IF OBJECT_ID('FK_Ticket_OrderDetail', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Ticket] DROP CONSTRAINT [FK_Ticket_OrderDetail];
IF OBJECT_ID('FK_Booth_SponsorEvent', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Booth] DROP CONSTRAINT [FK_Booth_SponsorEvent];
IF OBJECT_ID('FK_Order_Account', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Order] DROP CONSTRAINT [FK_Order_Account];
IF OBJECT_ID('FK_OrderDetail_Order', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrderDetail] DROP CONSTRAINT [FK_OrderDetail_Order];
IF OBJECT_ID('FK_Payment_Order', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Payment] DROP CONSTRAINT [FK_Payment_Order];
GO

-- Drop existing tables if they exist
IF OBJECT_ID('dbo.Payment', 'U') IS NOT NULL DROP TABLE [dbo].[Payment];
IF OBJECT_ID('dbo.Ticket', 'U') IS NOT NULL DROP TABLE [dbo].[Ticket];
IF OBJECT_ID('dbo.OrderDetail', 'U') IS NOT NULL DROP TABLE [dbo].[OrderDetail];
IF OBJECT_ID('dbo.Order', 'U') IS NOT NULL DROP TABLE [dbo].[Order];
IF OBJECT_ID('dbo.Booth', 'U') IS NOT NULL DROP TABLE [dbo].[Booth];
IF OBJECT_ID('dbo.TicketType', 'U') IS NOT NULL DROP TABLE [dbo].[TicketType];
IF OBJECT_ID('dbo.SponsorEvent', 'U') IS NOT NULL DROP TABLE [dbo].[SponsorEvent];
IF OBJECT_ID('dbo.Event', 'U') IS NOT NULL DROP TABLE [dbo].[Event];
IF OBJECT_ID('dbo.Sponsor', 'U') IS NOT NULL DROP TABLE [dbo].[Sponsor];
IF OBJECT_ID('dbo.Organizer', 'U') IS NOT NULL DROP TABLE [dbo].[Organizer];
IF OBJECT_ID('dbo.Account', 'U') IS NOT NULL DROP TABLE [dbo].[Account];
GO

/****** Object:  Table [dbo].[Account]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[account_id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[role] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Organizer]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organizer](
	[organizer_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](max) NULL,
	[contact] [nvarchar](255) NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Organizer] PRIMARY KEY CLUSTERED 
(
	[organizer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Organizer_Account] UNIQUE ([account_id])
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Sponsor]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sponsor](
	[sponsor_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[information] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Sponsor] PRIMARY KEY CLUSTERED 
(
	[sponsor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Sponsor_Account] UNIQUE ([account_id])
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Event]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[event_id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[description] [nvarchar](max) NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NOT NULL,
	[place] [nvarchar](500) NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[event_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[SponsorEvent]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SponsorEvent](
	[sponsorEvent_id] [int] IDENTITY(1,1) NOT NULL,
	[sponsor_id] [int] NOT NULL,
	[event_id] [int] NOT NULL,
	[contribution] [int] NOT NULL,
	[sponsorLevel] [nvarchar](50) NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_SponsorEvent] PRIMARY KEY CLUSTERED 
(
	[sponsorEvent_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TicketType]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TicketType](
	[ticketType_id] [int] IDENTITY(1,1) NOT NULL,
	[event_id] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[price] [int] NOT NULL,
	[description] [nvarchar](max) NULL,
	[quantity] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_TicketType] PRIMARY KEY CLUSTERED 
(
	[ticketType_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Order]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[orderDate] [date] NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[OrderDetail]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[orderDetail_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[total] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[orderDetail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Ticket]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ticket](
	[ticket_id] [int] IDENTITY(1,1) NOT NULL,
	[ticketType_id] [int] NOT NULL,
	[orderDetail_id] [int] NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Ticket] PRIMARY KEY CLUSTERED 
(
	[ticket_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Booth]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booth](
	[booth_id] [int] IDENTITY(1,1) NOT NULL,
	[sponsorEvent_id] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[location] [nvarchar](500) NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Booth] PRIMARY KEY CLUSTERED 
(
	[booth_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Payment]    Script Date: 11/10/2025 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[payment_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[amount] [int] NOT NULL,
	[paymentMethod] [nvarchar](100) NULL,
	[paymentDate] [date] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
	[ModifiedDate] [datetime2](7) NOT NULL DEFAULT GETDATE(),
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Add Foreign Key Constraints
ALTER TABLE [dbo].[Organizer] WITH CHECK ADD CONSTRAINT [FK_Organizer_Account] FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Sponsor] WITH CHECK ADD CONSTRAINT [FK_Sponsor_Account] FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[SponsorEvent] WITH CHECK ADD CONSTRAINT [FK_SponsorEvent_Sponsor] FOREIGN KEY([sponsor_id])
REFERENCES [dbo].[Sponsor] ([sponsor_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[SponsorEvent] WITH CHECK ADD CONSTRAINT [FK_SponsorEvent_Event] FOREIGN KEY([event_id])
REFERENCES [dbo].[Event] ([event_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[TicketType] WITH CHECK ADD CONSTRAINT [FK_TicketType_Event] FOREIGN KEY([event_id])
REFERENCES [dbo].[Event] ([event_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Ticket] WITH CHECK ADD CONSTRAINT [FK_Ticket_TicketType] FOREIGN KEY([ticketType_id])
REFERENCES [dbo].[TicketType] ([ticketType_id])
GO

ALTER TABLE [dbo].[Ticket] WITH CHECK ADD CONSTRAINT [FK_Ticket_OrderDetail] FOREIGN KEY([orderDetail_id])
REFERENCES [dbo].[OrderDetail] ([orderDetail_id])
GO

ALTER TABLE [dbo].[Booth] WITH CHECK ADD CONSTRAINT [FK_Booth_SponsorEvent] FOREIGN KEY([sponsorEvent_id])
REFERENCES [dbo].[SponsorEvent] ([sponsorEvent_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Order] WITH CHECK ADD CONSTRAINT [FK_Order_Account] FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO

ALTER TABLE [dbo].[OrderDetail] WITH CHECK ADD CONSTRAINT [FK_OrderDetail_Order] FOREIGN KEY([order_id])
REFERENCES [dbo].[Order] ([order_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Payment] WITH CHECK ADD CONSTRAINT [FK_Payment_Order] FOREIGN KEY([order_id])
REFERENCES [dbo].[Order] ([order_id])
GO

-- Sample Data (Optional)
-- Uncomment to insert sample data

/*
SET IDENTITY_INSERT [dbo].[Account] ON 
INSERT [dbo].[Account] ([account_id], [email], [password], [role]) 
VALUES 
(1, N'admin@eventticket.com', N'$2a$12$hashedpassword', N'Admin'),
(2, N'organizer@eventticket.com', N'$2a$12$hashedpassword', N'Organizer'),
(3, N'sponsor@eventticket.com', N'$2a$12$hashedpassword', N'Sponsor'),
(4, N'customer@eventticket.com', N'$2a$12$hashedpassword', N'Customer')
SET IDENTITY_INSERT [dbo].[Account] OFF
GO

SET IDENTITY_INSERT [dbo].[Organizer] ON 
INSERT [dbo].[Organizer] ([organizer_id], [account_id], [name], [description], [contact]) 
VALUES (1, 2, N'Event Organizers Inc', N'Professional event management company', N'+1-555-0100')
SET IDENTITY_INSERT [dbo].[Organizer] OFF
GO

SET IDENTITY_INSERT [dbo].[Sponsor] ON 
INSERT [dbo].[Sponsor] ([sponsor_id], [account_id], [name], [information]) 
VALUES (1, 3, N'Tech Corp', N'Leading technology company')
SET IDENTITY_INSERT [dbo].[Sponsor] OFF
GO

SET IDENTITY_INSERT [dbo].[Event] ON 
INSERT [dbo].[Event] ([event_id], [title], [description], [startDate], [endDate], [place]) 
VALUES (1, N'Tech Conference 2025', N'Annual technology conference', '2025-12-01', '2025-12-03', N'Convention Center, New York')
SET IDENTITY_INSERT [dbo].[Event] OFF
GO
*/
