import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Palette, Download, Smartphone, Lock, Gauge, Cloud, Share2, Utensils, ArrowUpRight } from 'lucide-react'
import Footer from '@/components/footer'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#040508] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid Pattern & glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer hover:opacity-85 transition">
              <span
                className="font-black tracking-tight text-2xl"
                style={{
                  background: 'linear-gradient(to right, #ea580c 0%, #ea580c 28%, transparent 36%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '0.8px rgba(255, 255, 255, 0.85)',
                  display: 'inline-block',
                }}
              >
                SmartQr
              </span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="nav-link text-sm text-primary font-semibold py-1">Features</Link>
            <Link href="/how-it-works" className="nav-link text-sm text-foreground/75 hover:text-foreground font-semibold py-1">How It Works</Link>
            <Link href="/pricing" className="nav-link text-sm text-foreground/75 hover:text-foreground font-semibold py-1">Pricing</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="nav-link text-sm text-foreground/70 hover:text-foreground font-semibold py-1">
              Dashboard
            </Link>
            <Link href="/generator">
              <Button size="sm" className="bg-[#ea580c] hover:bg-[#ea580c]/90 hover:shadow-lg hover:shadow-orange-500/20 text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all duration-300 flex items-center gap-1 group">
                Get Started 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-36 pb-16 px-6 text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Platform Capabilities
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Engineered for speed, built for <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">designers</span>.
        </h1>
        <p className="text-foreground/50 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
          Professional-grade dynamic QR codes, cloud CDN integrations, and realtime scan analytics compiled into a cohesive, streamlined layout.
        </p>
      </section>

      {/* Bento Grid Features Layout */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Box 1: Large File Sharing (Col Span 7) */}
          <div className="md:col-span-7 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Cloud Document Sharing</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Upload PDF files and resumes directly to secure ImageKit CDN storage. Host media on high-speed global servers and display them on reader-optimized presentation cards instantly.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest">ImageKit REST API Integration</span>
              <span className="text-[#ea580c] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">Active CDN <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

          {/* Bento Box 2: Social Trees (Col Span 5) */}
          <div className="md:col-span-5 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Social Link Trees</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Compile LinkedIn, GitHub, Twitter, and custom pages into a mobile bio tree with initials avatar templates.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest">Dynamic Bio blueprints</span>
            </div>
          </div>

          {/* Bento Box 3: Digital Menus (Col Span 5) */}
          <div className="md:col-span-5 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Digital Restaurant Menus</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Publish contactless menu and catalog listings. Modify item pricing, details, and headers in real-time.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest">Real-time catalogs</span>
            </div>
          </div>

          {/* Bento Box 4: Instant Redirections & Custom Styles (Col Span 7) */}
          <div className="md:col-span-7 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Instant Redirections & Styles</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Point QR scanners to dynamic redirect records. Modify destination links instantly without re-printing codes. Styling tools allow mapping dot matrices, custom colors, eye patterns, and center branding logos.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest">Vector exports (SVG, PDF, PNG)</span>
            </div>
          </div>

          {/* Bento Box 5: Utilities (Col Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-[#ea580c]/20 transition-all duration-300 flex flex-col justify-between min-h-[260px] group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-bold text-white text-sm">Static Utilities</h4>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">Traditional offline QR codes for WiFi profiles, vCards, Text pre-writes, SMS pre-fills, pre-written emails, and URLs.</p>
            </div>
          </div>

          {/* Bento Box 6: Analytics (Col Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-[#ea580c]/20 transition-all duration-300 flex flex-col justify-between min-h-[260px] group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-bold text-white text-sm">Advanced Insights</h4>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">Track total scans, device agents, referrers, and country geolocation statistics in a private developer dashboard.</p>
            </div>
          </div>

          {/* Bento Box 7: Error Correction (Col Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-[#ea580c]/20 transition-all duration-300 flex flex-col justify-between min-h-[260px] group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Gauge className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-bold text-white text-sm">Error correction correction</h4>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">Configure L, M, Q, and H correction matrix bounds to preserve readability even when codes are printed on rough packages.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
