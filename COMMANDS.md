# 🔧 Quick Command Reference

## Installation & Setup

```bash
# Install all dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |
| `npm run dev -- -p 3001` | Start on port 3001 |

---

## Environment Setup

### Create `.env.local`

**Windows:**
```bash
type nul > .env.local
```

**macOS/Linux:**
```bash
touch .env.local
```

### Add these values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Common Issues - Quick Fixes

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clear and reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear build cache
```bash
rm -rf .next
npm run build
```

### Clear all and start fresh
```bash
rm -rf node_modules .next .env.local
npm install
npm run dev
```

---

## File Locations

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Landing page |
| `app/generator/page.tsx` | QR generator |
| `app/dashboard/page.tsx` | User dashboard |
| `app/auth/login/page.tsx` | Login page |
| `app/auth/sign-up/page.tsx` | Sign up page |
| `app/api/qr-codes/route.ts` | API endpoints |
| `components/qr-generator.tsx` | QR generation logic |
| `components/dashboard-client.tsx` | Dashboard component |
| `lib/supabase/client.ts` | Browser client |
| `lib/supabase/server.ts` | Server client |
| `.env.local` | Environment variables (you create) |
| `tailwind.config.ts` | Tailwind configuration |

---

## Deployment Commands

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Docker
```bash
# Build image
docker build -t smartqr .

# Run container
docker run -p 3000:3000 smartqr
```

### Using pnpm (faster alternative to npm)
```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

---

## Browser Developer Tools

### Open Developer Tools
```
Chrome/Edge/Firefox: F12 or Ctrl+Shift+I
Safari: Cmd+Option+I
```

### Check for errors
1. Press **F12**
2. Click **Console** tab
3. Look for red error messages

### Check network requests
1. Press **F12**
2. Click **Network** tab
3. Perform action (e.g., login)
4. See requests and responses

### Clear cookies
1. Press **F12**
2. Click **Application** tab
3. Click **Cookies**
4. Delete all cookies
5. Refresh page

---

## API Testing

### Get all QR codes
```bash
curl http://localhost:3000/api/qr-codes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create new QR code
```bash
curl -X POST http://localhost:3000/api/qr-codes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My QR",
    "qr_type": "url",
    "qr_data": "https://example.com"
  }'
```

---

## Database Commands (Supabase CLI)

```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Pull latest schema
supabase db pull

# Push local changes
supabase db push

# View logs
supabase functions logs
```

---

## Git Commands

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit"

# Add GitHub remote
git remote add origin https://github.com/username/smartqr.git

# Push to GitHub
git push -u origin main

# Check status
git status
```

---

## Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Stop dev server |
| `Ctrl+Shift+Delete` | Clear browser cache |
| `F12` | Open developer tools |
| `Ctrl+Shift+J` | Open console |
| `Ctrl+Shift+K` | Search console |
| `Ctrl+L` | Clear console |

---

## Environment Variables Explained

| Variable | What it is | Where to find |
|----------|-----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | Supabase → Settings → API |
| `NEXT_PUBLIC_APP_URL` | Your application URL | http://localhost:3000 (dev) or https://yoursite.com (prod) |

---

## NPM vs PNPM Comparison

| Task | npm | pnpm |
|------|-----|------|
| Install | `npm install` | `pnpm install` |
| Dev | `npm run dev` | `pnpm dev` |
| Build | `npm run build` | `pnpm build` |
| Start | `npm start` | `pnpm start` |

**PNPM is faster and uses less disk space. Recommended!**

---

## Package.json Scripts

View available commands in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  }
}
```

Run with: `npm run <script-name>`

---

## Quick Health Check

```bash
# 1. Check Node version
node --version
# Should be v18+

# 2. Check npm version
npm --version

# 3. Check git version (optional)
git --version

# 4. List installed packages
npm list

# 5. Check for vulnerabilities
npm audit
```

---

## Performance Checks

```bash
# Build analysis
npm run build

# Run lighthouse (Chrome only)
# Press F12 → Lighthouse tab

# Check bundle size
npm run build
# Check `.next` folder size
```

---

## Helpful Resources

- **npm docs**: https://docs.npmjs.com/
- **Next.js CLI**: https://nextjs.org/docs/app/api-reference/next-cli
- **Git cheat sheet**: https://github.github.com/training-kit/
- **Bash cheat sheet**: https://devhints.io/bash

---

**Need help?** Check TROUBLESHOOTING.md
