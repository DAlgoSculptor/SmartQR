# SmartQR - Quick Start (5 Minutes)

## TL;DR

This is a **Next.js + Supabase** QR code generation SaaS application. To get it running:

### 1. Install Dependencies (2 min)
```bash
npm install
```

### 2. Create Supabase Account & Get Keys (1 min)
- Go to https://supabase.com → "Start your project"
- Copy your **Project URL** and **Anon Key** from Settings → API

### 3. Setup Database (1 min)
- In Supabase, go to **SQL Editor** → **New Query**
- Copy SQL from `DEPLOYMENT_GUIDE.md` → "Running the Application"
- Click "Run"

### 4. Create `.env.local` (1 min)
Create file `.env.local` in root with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the App
```bash
npm run dev
```

Open **http://localhost:3000** 🚀

---

## What This App Does

✅ **Generate QR Codes** - URL, Text, WiFi, vCard, Email, Phone  
✅ **Customize** - Colors, size, download as PNG/SVG/PDF  
✅ **Dashboard** - Manage all your QR codes  
✅ **Analytics** - Track scan counts  
✅ **Authentication** - Sign up/login with email  

---

## Key Files

| File | Purpose |
|------|---------|
| `/app` | All pages and routes |
| `/app/page.tsx` | Landing page |
| `/app/generator/` | QR code generator |
| `/app/dashboard/` | User dashboard |
| `/app/api/qr-codes/` | API endpoints |
| `/components` | React components |
| `/lib/supabase` | Database client setup |
| `.env.local` | **You create this** with API keys |
| `DEPLOYMENT_GUIDE.md` | Full setup instructions |

---

## Common Issues

**"Environment variables not found"**
- Restart dev server after adding `.env.local`

**"Cannot find table 'qr_codes'"**
- Run SQL setup in Supabase SQL Editor

**"Unauthorized" on dashboard**
- Clear cookies and log in again

---

## Next: Customize & Deploy

1. **Customize**: Edit colors in `tailwind.config.ts` and branding in `app/page.tsx`
2. **Deploy**: Push to GitHub, connect to Vercel (auto-deploys)
3. **Domain**: Add custom domain in Vercel dashboard

See `DEPLOYMENT_GUIDE.md` for detailed steps.

---

**Questions?** Check `README.md` for full documentation.
