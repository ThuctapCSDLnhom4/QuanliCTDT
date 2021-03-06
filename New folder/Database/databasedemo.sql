/****** Object:  Table [dbo].[branch]    Script Date: 05/08/2018 14:51:42 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[branch]') AND type in (N'U'))
DROP TABLE [dbo].[branch]
GO
/****** Object:  Table [dbo].[educationlevel]    Script Date: 05/08/2018 14:51:42 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[educationlevel]') AND type in (N'U'))
DROP TABLE [dbo].[educationlevel]
GO
/****** Object:  Table [dbo].[nation]    Script Date: 05/08/2018 14:51:42 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[nation]') AND type in (N'U'))
DROP TABLE [dbo].[nation]
GO
/****** Object:  Table [dbo].[province]    Script Date: 05/08/2018 14:51:42 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[province]') AND type in (N'U'))
DROP TABLE [dbo].[province]
GO
/****** Object:  Table [dbo].[province]    Script Date: 05/08/2018 14:51:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[province]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[province](
	[code] [varchar](10) NOT NULL,
	[codeview] [varchar](20) NULL,
	[name] [nvarchar](200) NULL,
	[note] [nvarchar](200) NULL,
	[edituser] [varchar](20) NULL,
	[edittime] [datetime] NULL,
	[lock] [smallint] NULL,
	[lockdate] [datetime] NULL,
	[whois] [varchar](64) NULL,
	[begindate] [datetime] NULL,
	[enddate] [datetime] NULL,
	[parentcode] [varchar](10) NULL,
	[thetype] [varchar](50) NULL,
	[postcode] [varchar](10) NULL,
	[mailcode] [varchar](10) NULL,
 CONSTRAINT [PK_province_MY] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[province] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [whois], [begindate], [enddate], [parentcode], [thetype], [postcode], [mailcode]) VALUES (N'P171129001', N'HN', N'Hà nội', NULL, N'00001', CAST(0x0000A83A00ABE4BF AS DateTime), 0, CAST(0x0000A83A00ABE4C1 AS DateTime), NULL, NULL, NULL, N'', N'PROVINCE', NULL, NULL)
/****** Object:  Table [dbo].[nation]    Script Date: 05/08/2018 14:51:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[nation]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[nation](
	[code] [varchar](10) NOT NULL,
	[codeview] [varchar](20) NULL,
	[name] [nvarchar](200) NULL,
	[note] [nvarchar](200) NULL,
	[edituser] [varchar](20) NULL,
	[edittime] [datetime] NULL,
	[lock] [smallint] NULL,
	[lockdate] [datetime] NULL,
	[whois] [varchar](64) NULL,
	[begindate] [datetime] NULL,
	[enddate] [datetime] NULL,
	[postcode] [varchar](10) NULL,
	[mailcode] [varchar](10) NULL,
 CONSTRAINT [PK_nation_MY] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[nation] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [whois], [begindate], [enddate], [postcode], [mailcode]) VALUES (N'1711290001', N'VN', N'Việt Nam', NULL, N'00001', CAST(0x0000A83A00AC252C AS DateTime), 0, CAST(0x0000A83A00AC252D AS DateTime), NULL, NULL, NULL, NULL, NULL)
/****** Object:  Table [dbo].[educationlevel]    Script Date: 05/08/2018 14:51:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[educationlevel]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[educationlevel](
	[code] [varchar](10) NOT NULL,
	[codeview] [nvarchar](20) NULL,
	[name] [nvarchar](1000) NULL,
	[note] [nvarchar](200) NULL,
	[edituser] [varchar](20) NULL,
	[edittime] [datetime] NULL,
	[lock] [smallint] NULL,
	[lockdate] [datetime] NULL,
	[theorder] [int] NULL,
	[thetype] [varchar](20) NULL,
	[comparelevel] [int] NULL,
	[whois] [varchar](64) NULL,
	[lang] [varchar](10) NULL,
 CONSTRAINT [PK_educationlevel_MY] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[educationlevel] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [theorder], [thetype], [comparelevel], [whois], [lang]) VALUES (N'1599725633', N'CD', N'Cao đẳng', N'Cao đẳng', N'', CAST(0x0000A8DA00F226A8 AS DateTime), 0, CAST(0x0000A8DA00F22B66 AS DateTime), 1, N'EDUCATIONLEVEL', 10, N'', NULL)
INSERT [dbo].[educationlevel] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [theorder], [thetype], [comparelevel], [whois], [lang]) VALUES (N'DH', N'DH', N'Đại học', N'Bản ghi đã có', N'', CAST(0x0000A8DA00F18190 AS DateTime), 0, CAST(0xFFFF2E4600000000 AS DateTime), 2, N'EDUCATIONLEVEL', 2, N'2', NULL)
INSERT [dbo].[educationlevel] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [theorder], [thetype], [comparelevel], [whois], [lang]) VALUES (N'SDH', N'CH', N'Cao học', N'NULL', NULL, NULL, 0, NULL, 3, N'EDUCATIONLEVEL', 3, N'NULL', NULL)
INSERT [dbo].[educationlevel] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [theorder], [thetype], [comparelevel], [whois], [lang]) VALUES (N'TS', N'TS', N'Tiến sĩ', N'NULL', NULL, NULL, 0, NULL, 4, N'EDUCATIONLEVEL', 4, N'NULL', NULL)
/****** Object:  Table [dbo].[branch]    Script Date: 05/08/2018 14:51:42 ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[branch]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[branch](
	[code] [varchar](10) NOT NULL,
	[codeview] [varchar](20) NULL,
	[name] [nvarchar](200) NULL,
	[note] [nvarchar](200) NULL,
	[edituser] [varchar](20) NULL,
	[edittime] [datetime] NULL,
	[lock] [smallint] NULL,
	[lockdate] [datetime] NULL,
	[universitycode] [varchar](10) NULL,
	[lang] [varchar](10) NULL,
 CONSTRAINT [PK_branch_MY] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[branch] ([code], [codeview], [name], [note], [edituser], [edittime], [lock], [lockdate], [universitycode], [lang]) VALUES (N'688748161', N'KHUA', N'Khu A Hà nội', N'236 Hoàng Quốc Việt', N'ABC', CAST(0x0000A8D900E7D988 AS DateTime), 0, CAST(0x0000A8D900E7D988 AS DateTime), N'HVKTQS', N'vn')
