import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Utensils, ShieldCheck } from 'lucide-react'

interface MenuItem {
  name: string
  description: string
  price: string
}

interface MenuData {
  type: string
  restaurantName: string
  description: string
  currency: string
  items: MenuItem[]
}

async function getQRCode(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching public QR code:', error)
      return { qrCode: null, error: error.message }
    }
    return { qrCode: data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching QR code:', err)
    return { qrCode: null, error: 'Database fetch failed' }
  }
}

export default async function MenuViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { qrCode, error } = await getQRCode(slug)

  if (error && error.includes('Row-level security policy')) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground">
        <div className="glass p-8 rounded-2xl max-w-lg text-center space-y-6 border border-red-500/20">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Database RLS Policy Required</h1>
          <p className="text-foreground/70 text-sm leading-relaxed">
            The platform is trying to fetch this QR code, but Supabase Row-Level Security (RLS) is blocking public access.
          </p>
          <div className="bg-black/50 p-4 rounded-xl text-left border border-white/5 font-mono text-xs overflow-x-auto">
            <p className="text-green-400 font-semibold mb-1">-- Run this in your Supabase SQL Editor:</p>
            <code>
              CREATE POLICY "Allow public select of QR codes by slug"<br />
              &nbsp;&nbsp;ON public.qr_codes FOR SELECT USING (true);
            </code>
          </div>
          <p className="text-xs text-foreground/50">
            Once this policy is created, refresh this page.
          </p>
        </div>
      </main>
    )
  }

  if (!qrCode) {
    notFound()
  }

  let menuData: MenuData
  try {
    menuData = typeof qrCode.qr_data === 'string'
      ? JSON.parse(qrCode.qr_data)
      : qrCode.qr_data
  } catch (e) {
    console.error('Failed to parse menu data', e)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <p className="text-foreground/70">Invalid QR code content.</p>
      </main>
    )
  }

  const currency = menuData.currency || '$'

  return (
    <main className="min-h-screen bg-[#0d0a08] text-[#f7f2ed] py-16 px-4 md:px-8 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Background decorations - Warm Amber Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Menu Container */}
      <div className="w-full max-w-2xl space-y-12 animate-fade-in">
        {/* Header Block */}
        <div className="text-center space-y-4 pt-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto shadow-md">
            <Utensils className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-amber-100 font-serif">
              {menuData.restaurantName || 'Gourmet Bistro'}
            </h1>
            {menuData.description && (
              <p className="text-sm md:text-base text-amber-100/60 font-medium italic max-w-md mx-auto text-balance">
                {menuData.description}
              </p>
            )}
          </div>
          <div className="w-24 h-[1px] bg-amber-500/20 mx-auto mt-6" />
        </div>

        {/* Menu Items List */}
        <div className="space-y-6">
          {menuData.items && menuData.items.length > 0 ? (
            menuData.items.map((item, idx) => (
              <div
                key={idx}
                className="group border border-amber-500/10 hover:border-amber-500/20 p-5 md:p-6 rounded-2xl bg-[#130f0c] hover:bg-[#181310] transition duration-300 relative shadow-md"
              >
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-base md:text-lg font-bold text-amber-100 group-hover:text-amber-400 transition-colors duration-300">
                    {item.name}
                  </h3>
                  {/* Decorative line */}
                  <div className="flex-1 border-b border-dotted border-amber-500/15 group-hover:border-amber-500/35 transition duration-300 hidden sm:block" />
                  <span className="text-base md:text-lg font-extrabold text-amber-400 font-mono">
                    {currency}
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs md:text-sm text-amber-100/50 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="border border-dashed border-amber-500/10 rounded-2xl p-12 text-center text-amber-100/40 text-sm">
              Our menu is currently being prepared. Check back shortly!
            </div>
          )}
        </div>

        {/* Brand Footer */}
        <div className="pt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center text-white font-bold text-xs">
              Q
            </div>
            <span className="font-semibold text-xs tracking-wider text-amber-100/40 uppercase">SmartQR Digital Menu</span>
          </div>
        </div>
      </div>
    </main>
  )
}
