# SmartQR Installation Checklist

Use this checklist to verify everything is set up correctly.

## ✅ Pre-Setup Requirements

- [ ] Node.js 18+ installed (`node --version` shows v18+)
- [ ] npm or pnpm available (`npm --version`)
- [ ] Code editor ready (VS Code recommended)
- [ ] Supabase account created (https://supabase.com)

## ✅ Step 1: Repository & Dependencies

- [ ] Project cloned/downloaded
- [ ] Opened terminal in project root
- [ ] Ran `npm install` successfully
  - Check: `ls node_modules/@supabase` should list files
  - Check: `ls node_modules/next` should exist

## ✅ Step 2: Supabase Project Setup

- [ ] Supabase project created
- [ ] Project status shows "Running" (green)
- [ ] Copied **Project URL** from Settings → API
- [ ] Copied **Anon Public Key** from Settings → API
- [ ] Both keys saved in secure location

## ✅ Step 3: Database Tables

- [ ] Opened SQL Editor in Supabase
- [ ] Ran database setup SQL (from DEPLOYMENT_GUIDE.md)
- [ ] No SQL errors occurred
- [ ] Can see tables in **Table Editor**:
  - [ ] `user_profiles`
  - [ ] `qr_codes`
  - [ ] `qr_analytics`
- [ ] Can see indexes in each table

## ✅ Step 4: Environment Variables

- [ ] Created `.env.local` in root directory
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Added `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- [ ] File is NOT committed to git (check `.gitignore`)

## ✅ Step 5: Row Level Security (RLS)

- [ ] Checked RLS is enabled in Supabase:
  - Go to **Authentication** → **Policies**
  - Verify policies exist for all tables
- [ ] Policies visible:
  - [ ] user_profiles policies
  - [ ] qr_codes policies
  - [ ] qr_analytics policies

## ✅ Step 6: Authentication Setup

- [ ] Email provider enabled in **Authentication** → **Providers**
- [ ] Email toggle is ON (green)
- [ ] Sign-up enabled in **Authentication** → **Policies**

## ✅ Step 7: Running the Application

- [ ] Opened terminal in project root
- [ ] Ran `npm run dev`
- [ ] Server started without errors:
  - Shows "▲ Next.js 16.2.6"
  - Shows "- Local: http://localhost:3000"
- [ ] No red error messages in terminal

## ✅ Step 8: Testing the Application

- [ ] Opened http://localhost:3000 in browser
- [ ] Landing page loads successfully
- [ ] Can see navigation and buttons
- [ ] "Get Started" button works
- [ ] "Dashboard" button works
- [ ] Clicked sign-up page loads
- [ ] Entered test email and password
- [ ] "Sign up" button submits without errors
- [ ] Redirected to success page or login page
- [ ] Check email inbox for verification link (may be in spam)
- [ ] Can click the verification link
- [ ] Can log in with test credentials
- [ ] Dashboard page loads with authenticated content

## ✅ Step 9: QR Code Generation

- [ ] From dashboard, clicked "Generate New QR Code"
- [ ] Selected QR code type (URL recommended for testing)
- [ ] Entered data (e.g., https://example.com)
- [ ] QR code generates and displays
- [ ] Can customize:
  - [ ] Colors (background and foreground)
  - [ ] Size slider works
- [ ] Download options work:
  - [ ] PNG download creates image
  - [ ] Copy to clipboard works
- [ ] "Save to Cloud" button works
- [ ] Entered title for QR code
- [ ] QR code saved successfully
- [ ] Can see new QR code in dashboard list
- [ ] Scan count shows

## ✅ Step 10: Dashboard Features

- [ ] View all created QR codes
- [ ] Click on QR code to see details
- [ ] Analytics showing (scan count, scan history)
- [ ] Can edit QR code details
- [ ] Can delete QR code with confirmation
- [ ] Logout button works
- [ ] Logged out successfully

## ✅ Step 11: Production Build

- [ ] Ran `npm run build` successfully
- [ ] Build completed without errors
- [ ] `.next` folder created
- [ ] Ran `npm run start`
- [ ] Production server started
- [ ] Application works in production mode

## 🎉 All Done!

If all checkboxes are checked, your SmartQR application is fully functional!

### Next Steps:
1. **Customize**: Edit branding and colors
2. **Deploy**: Push to GitHub and connect to Vercel
3. **Share**: Give users the application URL
4. **Monitor**: Check analytics and usage

---

## ❌ If Something Failed

### Database Issues
- [ ] Run SQL setup again in Supabase SQL Editor
- [ ] Check for SQL syntax errors
- [ ] Verify RLS policies are created

### Authentication Issues
- [ ] Email provider is enabled in Supabase
- [ ] Check spam folder for verification emails
- [ ] Try signing up with different email

### Environment Variable Issues
- [ ] Verify `.env.local` exists (not `.env`)
- [ ] Check exact spelling of variable names
- [ ] Restart dev server after changes
- [ ] No quotes around values

### API Errors
- [ ] Check browser console (F12) for error messages
- [ ] Verify Supabase URL is correct (https://... not http://)
- [ ] Check that tables exist in Supabase
- [ ] Verify RLS policies are set correctly

### Build Errors
- [ ] Run `npm install` again
- [ ] Delete `node_modules` and run `npm install` fresh
- [ ] Update TypeScript: `npm update typescript`
- [ ] Check console for specific error messages

---

**Need help?** Check DEPLOYMENT_GUIDE.md for detailed troubleshooting.
