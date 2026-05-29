# SmartQR - Complete Deployment & Setup Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Supabase Configuration](#supabase-configuration)
3. [Running the Application](#running-the-application)
4. [Production Deployment](#production-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Step 1: Prerequisites
Make sure you have installed:
- **Node.js 18+** - Download from https://nodejs.org
- **Git** (optional) - https://git-scm.com
- **A code editor** - VS Code recommended (https://code.visualstudio.com)

### Step 2: Install Dependencies
```bash
# Navigate to project directory
cd smart-qr-saa-s-web-app

# Install dependencies using npm
npm install

# OR using pnpm (faster, more efficient)
npm install -g pnpm
pnpm install
```

---

## Supabase Configuration

### Creating a Supabase Project

1. **Go to Supabase**
   - Visit https://supabase.com
   - Click "Start your project" or sign in if you have an account
   - Click "New Project"

2. **Create Project**
   - **Project Name**: smartqr-dev (or your preferred name)
   - **Database Password**: Create a strong password (save it securely!)
   - **Region**: Choose the region closest to you
   - Click "Create new project" and wait 2-3 minutes

3. **Get API Credentials**
   - Once created, go to **Project Settings** → **API**
   - Copy these values:
     - **Project URL** (under "Project URL")
     - **Anon Public Key** (under "Anon public")
   - Keep these safe!

### Setting Up Database Tables

1. **Open SQL Editor**
   - In Supabase dashboard, go to **SQL Editor** → **New Query**

2. **Run Database Setup SQL**
   - Copy the SQL from below and paste it into the SQL Editor
   - Click "Run"

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
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
  qr_type TEXT NOT NULL,
  qr_data TEXT NOT NULL,
  destination_url TEXT,
  custom_color TEXT DEFAULT '#6589c5',
  background_color TEXT DEFAULT '#FFFFFF',
  size INTEGER DEFAULT 300,
  error_level TEXT DEFAULT 'M',
  logo_url TEXT,
  scan_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_qr UNIQUE (user_id, slug)
);

-- Create analytics table
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

-- Create indexes
CREATE INDEX idx_qr_codes_user_id ON public.qr_codes(user_id);
CREATE INDEX idx_qr_codes_slug ON public.qr_codes(slug);
CREATE INDEX idx_qr_analytics_qr_code_id ON public.qr_analytics(qr_code_id);
CREATE INDEX idx_qr_analytics_scanned_at ON public.qr_analytics(scanned_at);

-- Enable Row Level Security
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

3. **Verify Tables**
   - Go to **Table Editor**
   - You should see: `user_profiles`, `qr_codes`, `qr_analytics`

### Enabling Email Authentication

1. **Go to Authentication Settings**
   - In Supabase dashboard: **Authentication** → **Providers**

2. **Enable Email Provider**
   - Click on "Email" (it's usually already enabled)
   - Verify it's toggled ON (green)

3. **Configure Email Settings**
   - Go to **Email Templates**
   - Customize if desired, or use defaults

---

## Running the Application

### Step 1: Create `.env.local`

Create a new file named `.env.local` in the root directory:

```bash
# Windows
type nul > .env.local

# macOS/Linux
touch .env.local
```

### Step 2: Add Environment Variables

Open `.env.local` in your editor and paste:

```env
# Get these from Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace:
- `YOUR_PROJECT_ID` with your Supabase project ID
- `YOUR_ANON_KEY` with your Anon Public Key

### Step 3: Start Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```

You should see:
```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
```

### Step 4: Access the Application

1. Open **http://localhost:3000** in your browser
2. You should see the landing page
3. Click **"Get Started"** or **"Dashboard"**
4. Sign up for an account
5. Verify email (check your email inbox)
6. Log in and create QR codes!

---

## Production Deployment

### Deploying to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/smartqr.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Add Environment Variables**
   - In Vercel dashboard: **Settings** → **Environment Variables**
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`
   - Click "Save"

4. **Redeploy**
   - Go to **Deployments**
   - Click the latest deployment
   - Click "Redeploy"

### Deploying to Other Platforms

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Railway
1. Connect GitHub repo
2. Add environment variables
3. Railway auto-deploys on push

#### Heroku
```bash
heroku create smartqr-app
heroku config:set NEXT_PUBLIC_SUPABASE_URL=...
git push heroku main
```

---

## Troubleshooting

### Issue: "Environment variables not found"
**Solution:**
- Make sure `.env.local` exists in the **root directory**
- Restart the dev server (`npm run dev`)
- Check exact variable names match

### Issue: "Cannot find module" errors
**Solution:**
```bash
rm -rf node_modules
npm install
npm run dev
```

### Issue: "QR codes table not found"
**Solution:**
- Go to Supabase SQL Editor
- Run the setup SQL from [Supabase Configuration](#setting-up-database-tables)
- Verify tables in Table Editor

### Issue: "Unauthorized - 401" in dashboard
**Solution:**
1. Clear browser cookies
   - Press F12 → Application → Cookies → Delete all
2. Refresh the page
3. Log in again

### Issue: "Cannot POST to /api/qr-codes"
**Solution:**
- Check you're logged in
- Check browser console for error details
- Verify Supabase API keys are correct
- Ensure RLS policies are enabled

### Issue: "Email verification not working"
**Solution:**
- Check spam/junk folder
- Go to Supabase → Authentication → Providers
- Ensure Email is enabled
- May need to configure custom SMTP

### Issue: App won't build
**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Performance Tips

1. **Enable Caching**
   - Images are auto-optimized
   - Use `next/image` for images

2. **Database Queries**
   - Indexes are created for common queries
   - RLS policies are optimized

3. **Frontend**
   - Components are code-split
   - Use Tailwind CSS (already optimized)

---

## Security Checklist

- ✅ Environment variables in `.env.local` (not committed)
- ✅ Supabase RLS policies enabled
- ✅ HTTPS enforced in production
- ✅ API keys rotated regularly
- ✅ Database backups enabled (Supabase handles this)

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## Next Steps

After setup:
1. Customize colors and branding in `tailwind.config.ts`
2. Add your logo to `public/` folder
3. Update metadata in `app/layout.tsx`
4. Deploy to production
5. Set up domain and SSL certificate

---

**Happy QR Code Generating! 🎉**
