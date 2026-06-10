import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileUp, Share2, Utensils, Sparkles, ArrowUpRight } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#040508] text-foreground overflow-hidden flex flex-col justify-between relative">
      {/* Background grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />

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
            <Link href="/features" className="nav-link text-sm text-foreground/75 hover:text-foreground font-semibold py-1">Features</Link>
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

      {/* Hero Header Section */}
      <HeroSection />

      {/* Showcase Visual Layout Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#06070a] border-t border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* Header section with human-designed typography */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-8 border-b border-white/5">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#ea580c] font-black">Dynamic Formats</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Templates designed for the <span className="font-display italic font-semibold text-foreground/80">modern</span> publisher.
              </h2>
            </div>
            <div className="md:col-span-4 text-left md:text-right">
              <p className="text-xs text-foreground/50 max-w-xs md:ml-auto leading-relaxed">
                Choose a dynamic blueprint, upload custom files or links, and configure styling controls dynamically.
              </p>
            </div>
          </div>

          {/* Premium Showcase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Resume File Sharing */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[380px] hover:border-orange-500/20 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <FileUp className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Resumes & Files</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    Upload PDF CVs or product assets to ImageKit cloud CDN. Readers access an optimized presentation card with embedded inline viewing and instant downloads.
                  </p>
                </div>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6">
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">ImageKit CDN</span>
                <Link href="/generator" className="inline-flex items-center text-xs font-bold text-white group-hover:text-[#ea580c] transition-colors gap-1">
                  Try Blueprint <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Social Links Tree */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[380px] hover:border-orange-500/20 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Social Bio Trees</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    Aggregate LinkedIn, GitHub, Twitter, and portfolio links into a unified mobile bio tree. Configured with dynamic color schemes and initials-based avatars.
                  </p>
                </div>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6">
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Link trees</span>
                <Link href="/generator" className="inline-flex items-center text-xs font-bold text-white group-hover:text-[#ea580c] transition-colors gap-1">
                  Try Blueprint <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: Digital Restaurant Menu */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[380px] hover:border-orange-500/20 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">Restaurant Menus</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    Create instant, touch-free menus and catalogs. Customize currency markers, category headers, pricing lists, and dish descriptions in a few clicks.
                  </p>
                </div>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6">
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Digital catalogs</span>
                <Link href="/generator" className="inline-flex items-center text-xs font-bold text-white group-hover:text-[#ea580c] transition-colors gap-1">
                  Try Blueprint <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#040508] relative text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Start Publishing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] max-w-2xl mx-auto text-balance">
            Upgrade your printed media with <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">dynamic</span> redirection.
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-md mx-auto leading-relaxed">
            Configure templates, print high-res vector files once, and modify redirection destination urls at any point in the dashboard.
          </p>
          <div className="pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-[#ea580c] hover:bg-[#ea580c]/90 text-white font-bold rounded-xl px-8 py-6 shadow-xl shadow-orange-500/10">
                Register For Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
