'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Sparkles, 
  Cloud, 
  Share2, 
  Utensils, 
  ArrowUpRight, 
  Palette, 
  Lock, 
  Gauge, 
  Smartphone, 
  ShieldCheck,
  RefreshCw,
  Globe,
  UploadCloud,
  FileText
} from 'lucide-react'
import Footer from '@/components/footer'

type CapabilityType = 'cdn' | 'bio' | 'menu'

export default function FeaturesPage() {
  const [activeCap, setActiveCap] = useState<CapabilityType>('cdn')
  
  // CDN Upload Simulation States
  const [uploadPercent, setUploadPercent] = useState(100)
  const [isUploading, setIsUploading] = useState(false)
  
  // Menu Simulation States
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')

  // Bio Link simulation notifications
  const [bioLog, setBioLog] = useState<string | null>(null)

  const triggerUpload = () => {
    setIsUploading(true)
    setUploadPercent(0)
    const interval = setInterval(() => {
      setUploadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  const triggerBioLink = (linkName: string) => {
    setBioLog(`Scanned & Logged: Visited Olivia's ${linkName}!`)
    setTimeout(() => setBioLog(null), 3000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid Pattern & glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer hover:opacity-85 transition">
              <span
                className="font-black tracking-tight text-2xl font-display"
                style={{
                  background: 'linear-gradient(to right, oklch(0.62 0.18 35) 0%, oklch(0.85 0.04 60) 50%, transparent 60%)',
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
              <Button size="sm" className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all duration-300 flex items-center gap-1 group">
                Get Started 
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-36 pb-16 px-6 text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Platform Capabilities
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
          Engineered for speed, built for <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">publishers</span>.
        </h1>
        <p className="text-foreground/50 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
          Professional-grade dynamic QR codes, cloud CDN integrations, and realtime scan analytics compiled into a cohesive, streamlined layout.
        </p>
      </section>

      {/* SECTION: Live Capabilities Preview Simulator */}
      <section className="py-8 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/25 border border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          
          {/* Left: Capability Options Selector */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-2">Interactive Blueprints</h3>
            
            <button
              onClick={() => setActiveCap('cdn')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 ${
                activeCap === 'cdn'
                  ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/5'
                  : 'border-transparent bg-transparent hover:bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                activeCap === 'cdn' ? 'bg-primary text-white border-primary/20' : 'bg-white/5 text-foreground/50 border-white/5'
              }`}>
                <Cloud className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-white">CDN Document Sharing</h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Upload PDFs and resumes to high-speed CDN.</p>
              </div>
            </button>

            <button
              onClick={() => setActiveCap('bio')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 ${
                activeCap === 'bio'
                  ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/5'
                  : 'border-transparent bg-transparent hover:bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                activeCap === 'bio' ? 'bg-primary text-white border-primary/20' : 'bg-white/5 text-foreground/50 border-white/5'
              }`}>
                <Share2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-white">Social Link Trees</h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Aggregate multiple portfolios and bio pages.</p>
              </div>
            </button>

            <button
              onClick={() => setActiveCap('menu')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 ${
                activeCap === 'menu'
                  ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/5'
                  : 'border-transparent bg-transparent hover:bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                activeCap === 'menu' ? 'bg-primary text-white border-primary/20' : 'bg-white/5 text-foreground/50 border-white/5'
              }`}>
                <Utensils className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-white">Digital Catalogs / Menus</h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Publish contactless restaurant menu listings.</p>
              </div>
            </button>

          </div>

          {/* Right: Simulated Mobile Preview */}
          <div className="lg:col-span-7 h-full min-h-[360px] bg-black/20 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active Simulation</span>
                <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border border-primary/20 bg-primary/5 text-primary">
                  Interactive Preview
                </span>
              </div>

              {/* Render Simulation Frame */}
              <div className="h-52 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                
                {activeCap === 'cdn' && (
                  <div className="flex flex-col items-center gap-4 w-full px-6 text-center">
                    {uploadPercent < 100 ? (
                      <div className="space-y-3 w-full max-w-xs">
                        <div className="flex justify-between text-[10px] text-foreground/45 font-bold uppercase tracking-wider">
                          <span>Uploading File...</span>
                          <span>{uploadPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${uploadPercent}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 animate-slide-in">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Portfolio_Olivia_Sen.pdf</div>
                          <div className="text-[10px] text-foreground/45 mt-0.5">Hosted securely on ImageKit REST CDN</div>
                        </div>
                        <Button 
                          onClick={triggerUpload} 
                          size="sm" 
                          variant="outline"
                          className="border-white/10 hover:bg-white/5 hover:border-white/20 text-[10px] py-1.5 h-auto rounded-lg"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" /> Re-upload Simulation
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeCap === 'bio' && (
                  <div className="flex flex-col items-center gap-3 w-full px-8">
                    <div className="text-[10px] text-foreground/45 font-bold uppercase tracking-wider">Olivia Sen links</div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {['Portfolio Site', 'LinkedIn', 'GitHub', 'Twitter / X'].map((lnk) => (
                        <button
                          key={lnk}
                          onClick={() => triggerBioLink(lnk)}
                          className="py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/80 font-bold hover:bg-white/10 hover:border-primary/30 transition-all text-center"
                        >
                          {lnk}
                        </button>
                      ))}
                    </div>
                    {bioLog && (
                      <div className="absolute bottom-2 left-2 right-2 bg-primary text-white text-[9px] font-bold text-center py-1.5 rounded-lg shadow-lg shadow-primary/10 animate-fade-in-up font-mono">
                        {bioLog}
                      </div>
                    )}
                  </div>
                )}

                {activeCap === 'menu' && (
                  <div className="flex flex-col items-center gap-3 w-full px-6">
                    <div className="flex justify-between items-center w-full pb-1.5 border-b border-white/5">
                      <span className="text-[10px] font-black text-white">Mamma Mia Trattoria</span>
                      <div className="flex bg-black/40 p-0.5 rounded-md border border-white/5">
                        {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                          <button
                            key={curr}
                            onClick={() => setCurrency(curr)}
                            className={`px-1.5 py-0.5 text-[8px] font-black rounded-sm transition-all ${
                              currency === curr ? 'bg-primary text-white' : 'text-foreground/45'
                            }`}
                          >
                            {curr === 'USD' && '$'}
                            {curr === 'EUR' && '€'}
                            {curr === 'GBP' && '£'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="flex justify-between items-center text-[10px]">
                        <div>
                          <div className="font-bold text-white/90">Truffle Pasta</div>
                          <div className="text-[8px] text-foreground/40">Fresh hand-made taglioni</div>
                        </div>
                        <span className="font-black text-primary">
                          {currency === 'USD' && '$28'}
                          {currency === 'EUR' && '€26'}
                          {currency === 'GBP' && '£22'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <div>
                          <div className="font-bold text-white/90">Wagyu Steak</div>
                          <div className="text-[8px] text-foreground/40">Seared cherrywood smoke</div>
                        </div>
                        <span className="font-black text-primary">
                          {currency === 'USD' && '$45'}
                          {currency === 'EUR' && '€42'}
                          {currency === 'GBP' && '£36'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {activeCap === 'cdn' && 'Global Cloud CDN Delivery'}
                  {activeCap === 'bio' && 'Aggregated Bio Handle trees'}
                  {activeCap === 'menu' && 'Contactless Digital Price catalogs'}
                </h3>
                <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                  {activeCap === 'cdn' && 'Scanners download static files instantly. Integrates directly with ImageKit storage APIs to serve PDF resumes and portfolio packages on low-latency global CDN edge nodes.'}
                  {activeCap === 'bio' && 'Generate clean initials-avatar layouts showcasing social profiles. Perfect for personal branding on brochures, packages, business cards, and display boards.'}
                  {activeCap === 'menu' && 'Publish real-time editable restaurant catalogs. Update item headers, dish descriptions, currency markers, and price listings instantly inside our dashboard without reprint.'}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-4 text-[10px] text-foreground/30 font-bold uppercase tracking-wider">
              <span>SmartQR Engine v2.0</span>
              <span>Fully Interactive Client</span>
            </div>
          </div>

        </div>
      </section>

      {/* Bento Grid Features Layout */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Box 1: Large File Sharing (Col Span 7) */}
          <div className="md:col-span-7 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Cloud Document Sharing</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Upload PDF files and resumes directly to secure ImageKit CDN storage. Host media on high-speed global servers and display them on reader-optimized presentation cards instantly.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest font-mono">ImageKit REST API Integration</span>
              <span className="text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-bold">Active CDN <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

          {/* Bento Box 2: Social Trees (Col Span 5) */}
          <div className="md:col-span-5 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Social Link Trees</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Compile LinkedIn, GitHub, Twitter, and custom pages into a mobile bio tree with initials avatar templates.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest font-mono">Dynamic Bio blueprints</span>
            </div>
          </div>

          {/* Bento Box 3: Digital Menus (Col Span 5) */}
          <div className="md:col-span-5 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Digital Restaurant Menus</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Publish contactless menu and catalog listings. Modify item pricing, details, and headers in real-time.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest font-mono">Real-time catalogs</span>
            </div>
          </div>

          {/* Bento Box 4: Instant Redirections & Custom Styles (Col Span 7) */}
          <div className="md:col-span-7 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between min-h-[340px] group relative overflow-hidden">
            <div className="space-y-4 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Instant Redirections & Styles</h3>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">
                Point QR scanners to dynamic redirect records. Modify destination links instantly without re-printing codes. Styling tools allow mapping dot matrices, custom colors, eye patterns, and center branding logos.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px]">
              <span className="font-bold text-foreground/30 uppercase tracking-widest font-mono">Vector exports (SVG, PDF, PNG)</span>
            </div>
          </div>

          {/* Bento Box 5: Utilities (Col Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[260px] group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-bold text-white text-sm">Static Utilities</h4>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">Traditional offline QR codes for WiFi profiles, vCards, Text pre-writes, SMS pre-fills, pre-written emails, and URLs.</p>
            </div>
          </div>

          {/* Bento Box 6: Analytics (Col Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[260px] group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-bold text-white text-sm">Advanced Insights</h4>
              <p className="text-foreground/50 text-xs leading-relaxed font-medium">Track total scans, device agents, referrers, and country geolocation statistics in a private developer dashboard.</p>
            </div>
          </div>

          {/* Bento Box 7: Error Correction (Col Span 4) */}
          <div className="md:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[260px] group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Gauge className="w-4.5 h-4.5" />
              </div>
              <h4 className="font-bold text-white text-sm">Error Correction Options</h4>
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
