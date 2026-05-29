# SmartQR Troubleshooting Guide

This guide covers common issues and their solutions.

## 🔴 Critical Issues

### Issue: "Cannot find module '@supabase/ssr'"
```
Error: Cannot find module '@supabase/ssr'
```

**Solutions:**
1. Run installation again:
   ```bash
   npm install
   ```
2. If still failing:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Verify node_modules exists:
   ```bash
   ls node_modules/@supabase
   ```

---

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
```
Error: Cannot read properties of undefined (reading 'split')
```

**Root Cause:** Environment variables not set

**Solutions:**
1. Create `.env.local` in the **root directory**:
   ```bash
   # Windows
   type nul > .env.local
   
   # macOS/Linux
   touch .env.local
   ```

2. Add content:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **IMPORTANT:** Restart development server
   ```bash
   # Stop: Ctrl+C
   npm run dev
   ```

4. Verify variables loaded:
   - Open http://localhost:3000
   - Open DevTools (F12)
   - In Console, type: `process.env.NEXT_PUBLIC_SUPABASE_URL`
   - Should show your URL, not undefined

---

### Issue: "relation "qr_codes" does not exist"
```
Error: relation "qr_codes" does not exist
```

**Root Cause:** Database tables not created

**Solution:**
1. Go to Supabase dashboard
2. Click **SQL Editor** → **New Query**
3. Paste this setup SQL:

```sql
-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
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

CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_qr_codes_user_id ON public.qr_codes(user_id);
CREATE INDEX idx_qr_codes_slug ON public.qr_codes(slug);
CREATE INDEX idx_qr_analytics_qr_code_id ON public.qr_analytics(qr_code_id);

-- Enable RLS
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own QR codes" ON public.qr_codes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own QR codes" ON public.qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR codes" ON public.qr_codes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own QR codes" ON public.qr_codes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read analytics for their QR codes" ON public.qr_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.qr_codes 
      WHERE qr_codes.id = qr_analytics.qr_code_id 
      AND qr_codes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

4. Click "Run"
5. Verify in **Table Editor** - you should see the tables
6. Refresh the application

---

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
The application handles CORS internally. This usually means:
1. Wrong API endpoint being called
2. Missing `/api` prefix in requests

Check that API calls use:
- ✅ `/api/qr-codes`
- ✅ `/api/qr-codes/[id]`

Not:
- ❌ `https://your-supabase-url/rest/v1/qr_codes`

---

## 🟡 Common Issues

### Issue: "Unauthorized - 401"
```
{
  "error": "Unauthorized"
}
```

**Cause:** User is not authenticated

**Solutions:**
1. **Clear Cookies:**
   ```
   DevTools (F12) → Application → Cookies → Delete all
   ```

2. **Check if logged in:**
   - Refresh page
   - You should be redirected to `/auth/login`
   - If not, session might be invalid

3. **Log out and log in again:**
   - Click "Logout" on dashboard
   - Sign up with new email
   - Check email for verification link
   - Complete sign-up flow

4. **Check Supabase Auth:**
   - Go to Supabase → Authentication → Users
   - Verify your user exists
   - Check "Email Confirmed" status

---

### Issue: "Email verification not working"
```
Didn't receive verification email
```

**Solutions:**
1. **Check spam/junk folder** - verification emails often go there

2. **Resend email:**
   - Unfortunately, the current app doesn't have a resend feature
   - Sign up with a different email address

3. **Check Supabase email settings:**
   - Go to Authentication → Providers
   - Ensure Email is enabled (green toggle)
   - Can't customize email templates in free tier

4. **Use Test Email (Dev only):**
   - Supabase provides test user logins
   - In free projects, use: test@example.com
   - Password: anything
   - (This is for development only!)

---

### Issue: "QR code not saving to database"
```
Error: Failed to save QR code
```

**Solutions:**
1. **Check RLS policies:**
   - Go to Supabase → Authentication → Policies
   - Verify "Users can insert their own QR codes" exists
   - Status should show "Active"

2. **Verify you're logged in:**
   - Check dashboard loads with your email
   - If not, log in again

3. **Check browser console:**
   - Press F12
   - Check Console tab for detailed error
   - Look for 403, 401, or database errors

4. **Check required fields:**
   - QR data is not empty
   - Title is not empty
   - QR type is valid (url, text, wifi, vcard, email, phone)

---

### Issue: "Cannot POST /api/qr-codes"
```
404: Not Found
```

**Cause:** API route doesn't exist or endpoint is wrong

**Solutions:**
1. **Verify API route exists:**
   - Check: `app/api/qr-codes/route.ts` exists
   - Should have POST handler

2. **Check request path:**
   - Correct: `/api/qr-codes`
   - Wrong: `/api/qrcodes` or `/api/qr-code`

3. **Check request method:**
   - Should be POST, not GET

4. **Verify headers:**
   - Add: `Content-Type: application/json`
   - Body should be JSON string

---

### Issue: "QR codes not loading in dashboard"
```
Dashboard shows "Loading..." forever
OR blank page
```

**Solutions:**
1. **Check network requests:**
   - Press F12 → Network tab
   - Look for requests to `/api/qr-codes`
   - Check response status and body

2. **Check browser console:**
   - Look for JavaScript errors
   - Red errors indicate problems

3. **Verify RLS policies:**
   - "Users can read their own QR codes" policy should exist
   - Go to Supabase → Authentication → Policies

4. **Check database:**
   - Go to Supabase → Table Editor
   - Select qr_codes table
   - Should show any QR codes you created

5. **Try creating new QR code:**
   - Go to `/generator`
   - Fill in data and save
   - Go back to dashboard
   - See if it appears

---

### Issue: "Download QR code doesn't work"
```
Download button doesn't download file
```

**Solutions:**
1. **Check popup blockers:**
   - Browser might be blocking downloads
   - Check browser notification/popup settings
   - Allow downloads for this site

2. **Try different format:**
   - PNG usually works best
   - Try SVG or PDF if PNG fails

3. **Check browser console:**
   - Press F12
   - Look for errors in Console tab
   - May need to allow popups

4. **Browser-specific issues:**
   - Chrome: Usually works
   - Firefox: Usually works
   - Safari: May need popup permission
   - Edge: Should work fine

---

### Issue: "Styles not loading - unstyled page"
```
Page looks broken without CSS
```

**Solutions:**
1. **Wait for CSS to load:**
   - Page might still be loading
   - Wait 2-3 seconds

2. **Clear cache:**
   ```bash
   # Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   # Click "Cached images and files"
   # Click "Clear"
   ```

3. **Restart dev server:**
   ```bash
   # Stop: Ctrl+C in terminal
   npm run dev
   ```

4. **Check for errors:**
   - Press F12 → Console
   - Look for red errors
   - Look for 404s on CSS files

---

## 🟢 Minor Issues

### Issue: "Login redirects to wrong page"
**Solution:** Check `/app/auth/login/page.tsx` line 42
- Should redirect to `/dashboard`
- Not `/protected`

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: "TypeScript errors but app works"
**Solution:** Some TypeScript warnings are non-blocking
- Check `tsconfig.json` has `skipLibCheck: true`
- Build should still succeed

### Issue: "npm install is slow"
**Solutions:**
1. Use pnpm (faster):
   ```bash
   npm install -g pnpm
   pnpm install
   pnpm dev
   ```

2. Or use npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

---

## 📞 Getting Help

1. **Check the error message carefully**
   - Most errors include the file and line number
   - Search online for the exact error

2. **Check browser console (F12)**
   - Console tab shows JavaScript errors
   - Network tab shows HTTP errors
   - Application tab shows cookies/storage

3. **Check Supabase logs:**
   - Supabase → Logs
   - Might show database or auth errors

4. **Read the documentation:**
   - README.md - Overview
   - DEPLOYMENT_GUIDE.md - Setup instructions
   - QUICK_START.md - Fast setup

5. **Debug step by step:**
   - Create simple test
   - Check each part separately
   - Add console.log() statements

---

## 🎯 Quick Checklist to Fix 90% of Issues

- [ ] `.env.local` file exists in root directory
- [ ] Environment variables have correct values
- [ ] Dev server restarted after changes
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Cookies cleared (F12 → Application → Cookies)
- [ ] Supabase tables exist (SQL Editor created them)
- [ ] RLS policies enabled (Authentication → Policies)
- [ ] Email provider enabled (Authentication → Providers)
- [ ] Logged in with valid email account
- [ ] Email verified through verification link

If all checked and still having issues, provide:
- Error message (exact text)
- Browser console errors (F12 → Console)
- Network tab response (F12 → Network)
- Supabase logs (Supabase → Logs)

---

**Last Resort:** Delete everything and start fresh
```bash
# Remove all
rm -rf node_modules .next .env.local

# Reinstall
npm install

# Create fresh .env.local with correct values
```

Happy troubleshooting! 🔧
