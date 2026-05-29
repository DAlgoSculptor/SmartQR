# SmartQR - Setup & Installation Guide

## Quick Start

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm or pnpm
- Supabase account (https://supabase.com)

### Step 1: Install Dependencies
```bash
npm install
# OR
pnpm install
```

### Step 2: Configure Supabase

1. Create a Supabase project at https://supabase.com
2. Go to Project Settings → API to find your credentials
3. Copy your:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Anon Public Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Step 3: Set Up Database Tables

Go to your Supabase SQL Editor and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (Supabase handles auth, but we store profile data)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create QR codes table
CREATE TABLE public.qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  qr_type TEXT NOT NULL, -- 'url', 'text', 'wifi', 'vcard', 'email', 'phone'
  qr_data TEXT NOT NULL, -- The actual data encoded in QR
  destination_url TEXT, -- The URL to redirect to when QR is scanned
  custom_color TEXT DEFAULT '#6589c5', -- Foreground color
  background_color TEXT DEFAULT '#FFFFFF', -- Background color
  size INTEGER DEFAULT 300,
  error_level TEXT DEFAULT 'M', -- L, M, H, Q
  logo_url TEXT,
  scan_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_qr UNIQUE (user_id, slug)
);

-- Create analytics table for tracking QR scans
CREATE TABLE public.qr_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  qr_code_id UUID NOT NULL REFERENCES public.qr_codes(id) ON DELETE CASCADE,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  referer TEXT,
  scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_qr_codes_user_id ON public.qr_codes(user_id);
CREATE INDEX idx_qr_codes_slug ON public.qr_codes(slug);
CREATE INDEX idx_qr_analytics_qr_code_id ON public.qr_analytics(qr_code_id);
CREATE INDEX idx_qr_analytics_scanned_at ON public.qr_analytics(scanned_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can read their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for qr_codes
CREATE POLICY "Users can read their own QR codes" ON public.qr_codes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own QR codes" ON public.qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR codes" ON public.qr_codes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own QR codes" ON public.qr_codes
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for qr_analytics
CREATE POLICY "Users can read analytics for their QR codes" ON public.qr_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.qr_codes 
      WHERE qr_codes.id = qr_analytics.qr_code_id 
      AND qr_codes.user_id = auth.uid()
    )
  );
```

### Step 4: Update Environment Variables

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Run the Development Server

```bash
npm run dev
# OR
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

✅ **QR Code Generation**
- Generate QR codes for URLs, text, WiFi, vCards, emails, and phone numbers
- Customize colors and size
- Download as PNG, SVG, or PDF

✅ **Authentication**
- Sign up with email
- Secure login/logout
- Session management with Supabase

✅ **Dashboard**
- View all your created QR codes
- Track scan analytics
- Edit and delete QR codes

✅ **Analytics**
- Track QR code scans
- View scan history and metrics

## Project Structure

```
├── app/
│   ├── page.tsx                 # Home/landing page
│   ├── generator/               # QR code generator
│   ├── dashboard/               # User dashboard
│   ├── auth/                    # Authentication pages
│   ├── api/                     # API routes
│   └── qr/                      # Public QR code viewer
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── qr-generator.tsx         # QR code generator component
│   ├── qr-customizer.tsx        # Customization options
│   └── dashboard-client.tsx     # Dashboard component
├── lib/
│   ├── supabase/                # Supabase clients
│   ├── qr-utils.ts              # QR code utilities
│   └── utils.ts                 # General utilities
├── styles/
│   └── globals.css              # Global styles (Tailwind)
└── middleware.ts                # Next.js middleware for auth
```

## Build for Production

```bash
npm run build
npm run start
```

## Troubleshooting

### "Environment variables not found"
- Ensure `.env.local` is in the root directory
- Restart the dev server after adding environment variables

### "Database connection error"
- Check your Supabase URL and API key
- Ensure the database tables are created
- Verify RLS policies are enabled

### "Unauthorized" on dashboard
- Clear browser cookies and localStorage
- Log out and log back in
- Check that Supabase auth is properly configured

## Support

For issues or questions, check the documentation:
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
