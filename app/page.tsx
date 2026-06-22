'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  FileUp, 
  Share2, 
  Utensils, 
  Sparkles, 
  ArrowUpRight, 
  RefreshCw, 
  Smartphone, 
  Server, 
  BarChart3, 
  Globe, 
  FileText,
  MousePointerClick,
  Activity,
  Cpu,
  Clock,
  Send,
  Palette
} from 'lucide-react'
import HeroSection from '@/components/hero-section'
import Footer from '@/components/footer'
import CustomQR from '@/components/custom-qr'

type RedirectionType = 'resume' | 'social' | 'menu'
type AnalyticsTab = 'days' | 'devices' | 'sources'
type PhoneTheme = 'obsidian' | 'champagne' | 'terracotta' | 'emerald'

interface SimulatedScan {
  city: string
  country: string
  device: string
  browser: string
  source: string
  dayIndex: number 
  devIndex: number 
  srcIndex: number 
  x: number // Map coordinate percentage X
  y: number // Map coordinate percentage Y
}

const mockLocations: SimulatedScan[] = [
  { city: 'Paris', country: 'France 🇫🇷', device: 'iPhone 15 Pro', browser: 'Safari', source: 'Instagram Referral Link', dayIndex: 0, devIndex: 0, srcIndex: 1, x: 49, y: 32 },
  { city: 'Tokyo', country: 'Japan 🇯🇵', device: 'Pixel 8 Pro', browser: 'Chrome', source: 'Direct Physical Scan', dayIndex: 1, devIndex: 1, srcIndex: 0, x: 84, y: 44 },
  { city: 'New York', country: 'USA 🇺🇸', device: 'iPad Air', browser: 'Safari', source: 'LinkedIn Catalog Clicks', dayIndex: 2, devIndex: 2, srcIndex: 2, x: 26, y: 38 },
  { city: 'London', country: 'UK 🇬🇧', device: 'Samsung S24', browser: 'Chrome', source: 'Direct Physical Scan', dayIndex: 3, devIndex: 1, srcIndex: 0, x: 47, y: 30 },
  { city: 'Sydney', country: 'Australia 🇦🇺', device: 'MacBook Pro', browser: 'Safari', source: 'Twitter/X Shortener', dayIndex: 4, devIndex: 2, srcIndex: 3, x: 88, y: 82 },
  { city: 'Berlin', country: 'Germany 🇩🇪', device: 'Xiaomi 14', browser: 'Firefox', source: 'Direct Physical Scan', dayIndex: 5, devIndex: 1, srcIndex: 0, x: 51, y: 31 },
  { city: 'San Francisco', country: 'USA 🇺🇸', device: 'iPhone 15', browser: 'Instagram', source: 'Instagram Referral Link', dayIndex: 6, devIndex: 0, srcIndex: 1, x: 19, y: 40 },
]

export default function Home() {
  // Redirection Simulator State
  const [redirectTarget, setRedirectTarget] = useState<RedirectionType>('resume')
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [customUrl, setCustomUrl] = useState('https://smartqr.io/olivia-profile')
  const [customUrlInput, setCustomUrlInput] = useState('https://smartqr.io/olivia-profile')
  const [phoneTheme, setPhoneTheme] = useState<PhoneTheme>('obsidian')
  const [redirectLogs, setRedirectLogs] = useState<string[]>([
    'Router ready. Standing by for dynamic scans.'
  ])

  // Latency Monitor States
  const [dbLatency, setDbLatency] = useState(2.1)
  const [dnsLatency, setDnsLatency] = useState(12.4)
  const [cdnLatency, setCdnLatency] = useState(24.8)

  // Chart Scan Counter States
  const [dayCounts, setDayCounts] = useState([120, 240, 180, 390, 320, 480, 410])
  const [deviceRatios, setDeviceRatios] = useState([62, 31, 7]) 
  const [sourceCounts, setSourceCounts] = useState([1420, 410, 220, 90]) 

  // Live Toast Stream state
  const [activeToast, setActiveToast] = useState<string | null>(null)
  const [totalScans, setTotalScans] = useState(2140)
  const [activeScanPoint, setActiveScanPoint] = useState<SimulatedScan | null>(null)

  // Analytics Tab State
  const [analyticsTab, setAnalyticsTab] = useState<AnalyticsTab>('days')

  // Gentle latency fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setDbLatency(parseFloat((1.5 + Math.random() * 1.2).toFixed(1)))
      setDnsLatency(parseFloat((10.1 + Math.random() * 4.5).toFixed(1)))
      setCdnLatency(parseFloat((20.4 + Math.random() * 6.8).toFixed(1)))
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  // Trigger redirection scanner animation on select change
  const handleRedirectChange = (target: RedirectionType) => {
    if (target === redirectTarget) return
    setIsRedirecting(true)
    
    setRedirectLogs([
      'Scan event captured by edge load balancer...',
      'Mapping scan token inside Postgres index...'
    ])

    setTimeout(() => {
      setRedirectTarget(target)
      let resolved = ''
      if (target === 'resume') resolved = 'CV_Olivia_Sen.pdf (ImageKit Edge CDN)'
      if (target === 'social') resolved = 'Olivia Bio Tree (Dynamic Links view)'
      if (target === 'menu') resolved = 'Mamma Mia Digital Menu catalog'

      setRedirectLogs((prev) => [
        ...prev,
        `Index found! Relaying scanner target...`,
        `Dynamic redirectional redirect routing to: ${resolved}`,
        `HTTP 302 Found. Redirect complete in 2.1ms.`
      ])
      setIsRedirecting(false)
    }, 800)
  }

  // Handle Custom URL form submissions
  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customUrlInput.trim()) return
    setIsRedirecting(true)

    setRedirectLogs([
      `Requesting dynamic redirection alias update...`,
      `Updating Postgres record for token 'olivia-profile'...`,
    ])

    setTimeout(() => {
      setCustomUrl(customUrlInput)
      setRedirectLogs((prev) => [
        ...prev,
        `Postgres record saved. DNS tables purged at CDN nodes.`,
        `Dynamic redirection updated to: ${customUrlInput}`,
        `Relayed target successfully synced.`
      ])
      setIsRedirecting(false)
    }, 900)
  }

  // Simulate a live scan trigger & map beacon pulse
  const handleTriggerSimScan = () => {
    const randomScan = mockLocations[Math.floor(Math.random() * mockLocations.length)]
    
    // Trigger toast notification
    setActiveToast(
      `🔔 Scan from ${randomScan.city}, ${randomScan.country} via ${randomScan.device} (${randomScan.browser})`
    )

    // Trigger map coordinates pulse
    setActiveScanPoint(randomScan)

    // Increment overall counter
    setTotalScans((prev) => prev + 1)

    // Increment specific graph data
    setDayCounts((prev) => {
      const next = [...prev]
      next[randomScan.dayIndex] += 1
      return next
    })

    setDeviceRatios((prev) => {
      const next = [...prev]
      next[randomScan.devIndex] += 1
      const total = next.reduce((a, b) => a + b, 0)
      return next.map((val) => Math.round((val / total) * 100))
    })

    setSourceCounts((prev) => {
      const next = [...prev]
      next[randomScan.srcIndex] += 1
      return next
    })

    // Clear toast and active map beacon after 3.5s
    setTimeout(() => {
      setActiveToast((curr) => {
        if (curr?.includes(randomScan.city)) return null
        return curr
      })
      setActiveScanPoint((curr) => {
        if (curr?.city === randomScan.city) return null
        return curr
      })
    }, 3500)
  }

  // Map theme variables to CSS colors
  const phoneThemeStyles = {
    obsidian: {
      bg: 'bg-[#08090d]',
      text: 'text-foreground/80',
      headerText: 'text-white',
      accent: 'text-primary',
      btnBg: 'bg-primary',
      cardBg: 'bg-white/[0.01]',
      border: 'border-white/5',
      pillBg: 'bg-white/5 border-white/10'
    },
    champagne: {
      bg: 'bg-[#f4f3ef]',
      text: 'text-[#1c1917]/75',
      headerText: 'text-[#1c1917]',
      accent: 'text-[#c5a059]',
      btnBg: 'bg-[#c5a059]',
      cardBg: 'bg-black/[0.03]',
      border: 'border-black/[0.06]',
      pillBg: 'bg-black/[0.04] border-black/[0.08]'
    },
    terracotta: {
      bg: 'bg-[#2b1b17]',
      text: 'text-[#dfd7c5]/75',
      headerText: 'text-[#dfd7c5]',
      accent: 'text-[#e26a45]',
      btnBg: 'bg-[#e26a45]',
      cardBg: 'bg-white/[0.02]',
      border: 'border-white/5',
      pillBg: 'bg-white/5 border-white/10'
    },
    emerald: {
      bg: 'bg-[#0a1c17]',
      text: 'text-[#a7f3d0]/75',
      headerText: 'text-[#a7f3d0]',
      accent: 'text-[#059669]',
      btnBg: 'bg-[#059669]',
      cardBg: 'bg-white/[0.02]',
      border: 'border-white/5',
      pillBg: 'bg-white/5 border-white/10'
    }
  }

  const activeTheme = phoneThemeStyles[phoneTheme]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col justify-between relative">
      {/* Background grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />

      {/* Toast Alert overlay */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-premium px-5 py-4 border-primary/30 max-w-sm animate-fade-in-up flex items-center gap-3">
          <Activity className="w-5 h-5 text-primary animate-pulse shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Scanner Event Detected</span>
            <span className="text-foreground/75 mt-0.5 block">{activeToast}</span>
          </div>
        </div>
      )}

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
            <Link href="/features" className="nav-link text-sm text-foreground/75 hover:text-foreground font-semibold py-1">Features</Link>
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

      {/* Hero Header Section */}
      <HeroSection />

      {/* SECTION: Interactive Redirection Simulator */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-card/10 border-t border-border relative">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-primary/3 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-primary font-black">Live Redirection Mechanics</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] font-display">
              Change the link. <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Keep the print.</span>
            </h2>
            <p className="text-sm text-foreground/50 max-w-xl mx-auto leading-relaxed">
              When dynamic QR codes are scanned, they check our secure redirect database. Modify the destination handle anytime without re-printing stickers or catalogs. Try routing the code below:
            </p>
          </div>

          {/* Interactive simulator dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-card/25 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            
            {/* Left: Printed QR */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-black/30 border border-white/5 rounded-2xl text-center space-y-5 h-full relative overflow-hidden group">
              <div className="relative p-2 bg-white rounded-xl shadow-lg">
                <CustomQR
                  value={customUrl}
                  size={140}
                  fgColor="#1c1917"
                  bgColor="#ffffff"
                  qrStyle="rounded"
                  qrFrame="none"
                />
                {isRedirecting && (
                  <div className="absolute inset-2 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                    <RefreshCw className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Printed Sticker / Menu</h4>
                <p className="text-[10px] text-foreground/45 max-w-[200px] leading-normal font-mono truncate">{customUrl}</p>
              </div>
            </div>

            {/* Center: Controller & Router */}
            <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-foreground/45 tracking-widest text-center">Router Settings</h4>
                
                {/* Router select presets */}
                <div className="grid grid-cols-3 gap-2">
                  {(['resume', 'social', 'menu'] as RedirectionType[]).map((type) => {
                    const isActive = redirectTarget === type
                    return (
                      <button
                        key={type}
                        onClick={() => handleRedirectChange(type)}
                        className={`py-2 px-1 text-center rounded-xl text-[10px] font-bold border transition-all ${
                          isActive
                            ? 'bg-primary/10 border-primary text-white shadow-lg'
                            : 'bg-black/35 border-white/5 text-foreground/50 hover:text-white'
                        }`}
                      >
                        <span className="capitalize">{type}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Custom URL target input */}
                <form onSubmit={handleCustomUrlSubmit} className="space-y-2">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider block">Custom Target Alias URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="flex-1 bg-black/45 border border-white/5 text-white rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none font-medium"
                      placeholder="https://..."
                    />
                    <Button type="submit" size="sm" className="bg-primary hover:bg-primary/95 text-white text-xs rounded-xl px-3.5">
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>

                {/* Phone Template Theme Picker */}
                <div className="space-y-2 pt-1">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider block flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-primary" /> Smartphone Mockup Theme
                  </label>
                  <div className="flex gap-2">
                    {(['obsidian', 'champagne', 'terracotta', 'emerald'] as PhoneTheme[]).map((thm) => (
                      <button
                        key={thm}
                        onClick={() => setPhoneTheme(thm)}
                        className={`flex-1 py-1.5 text-[9px] font-bold border rounded-lg transition-all capitalize ${
                          phoneTheme === thm
                            ? 'bg-white/10 border-primary text-white'
                            : 'bg-black/25 border-white/5 text-foreground/45 hover:text-foreground'
                        }`}
                      >
                        {thm === 'obsidian' ? 'dark' : thm === 'champagne' ? 'light' : thm}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Console log lines */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-1.5 font-mono text-[9px] text-foreground/55 h-32 overflow-y-auto">
                <span className="text-[8px] font-bold text-primary block uppercase tracking-wider">Edge Server Logs</span>
                {redirectLogs.map((log, index) => (
                  <div key={index} className="flex gap-1.5 leading-relaxed">
                    <span className="text-primary/70 shrink-0 select-none">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Scanned Phone Simulation */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-80 rounded-[30px] border-4 border-neutral-800 bg-neutral-950 p-2.5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-neutral-800 rounded-b-xl z-20" />
                
                {/* Simulated Web View */}
                <div className={`w-full h-full rounded-[20px] overflow-hidden p-3 flex flex-col justify-between relative text-left transition-colors duration-500 ${activeTheme.bg}`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                  {isRedirecting ? (
                    <div className="m-auto flex flex-col items-center gap-2 animate-pulse">
                      <Smartphone className={`w-6 h-6 animate-bounce ${activeTheme.accent}`} />
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${activeTheme.text}`}>Relaying...</span>
                    </div>
                  ) : (
                    <>
                      {redirectTarget === 'resume' && (
                        <div className="space-y-3 pt-4 animate-slide-in">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${activeTheme.pillBg} ${activeTheme.accent}`}>
                            <FileText className="w-4.5 h-4.5" />
                          </div>
                          <div className="space-y-1">
                            <div className={`text-[11px] font-black ${activeTheme.headerText}`}>Olivia_Sen_CV.pdf</div>
                            <div className={`text-[8px] ${activeTheme.text} opacity-60`}>Senior UI Designer • 2.4 MB</div>
                          </div>
                          <div className={`border rounded-lg p-2 ${activeTheme.cardBg} ${activeTheme.border} space-y-1.5`}>
                            <div className={`w-full h-2 rounded opacity-15 ${activeTheme.headerText} bg-current`} />
                            <div className={`w-11/12 h-2 rounded opacity-15 ${activeTheme.headerText} bg-current`} />
                            <div className={`w-9/12 h-2 rounded opacity-15 ${activeTheme.headerText} bg-current`} />
                          </div>
                          <button className={`w-full text-[9px] font-bold py-2 rounded-lg text-white shadow text-center cursor-pointer ${activeTheme.btnBg}`}>
                            Download Document
                          </button>
                        </div>
                      )}

                      {redirectTarget === 'social' && (
                        <div className="space-y-3 pt-4 animate-slide-in flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-lg text-white ${activeTheme.btnBg}`}>
                            OS
                          </div>
                          <div className="text-center space-y-0.5">
                            <div className={`text-[10px] font-black ${activeTheme.headerText}`}>Olivia Sen</div>
                            <div className={`text-[8px] ${activeTheme.text} opacity-60`}>Designer & Developer</div>
                          </div>
                          <div className="w-full space-y-1.5">
                            <div className={`w-full py-1.5 rounded text-center text-[7px] font-bold border ${activeTheme.pillBg} ${activeTheme.headerText}`}>Portfolio Website</div>
                            <div className={`w-full py-1.5 rounded text-center text-[7px] font-bold border ${activeTheme.pillBg} ${activeTheme.headerText}`}>LinkedIn Profile</div>
                          </div>
                        </div>
                      )}

                      {redirectTarget === 'menu' && (
                        <div className="space-y-3 pt-4 animate-slide-in">
                          <div className={`border-b pb-1 ${activeTheme.border}`}>
                            <div className={`text-[9px] font-black ${activeTheme.headerText}`}>Mamma Mia</div>
                            <div className={`text-[7px] font-bold ${activeTheme.accent}`}>Ambient Trattoria</div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[7px]">
                              <div>
                                <div className={`font-bold ${activeTheme.headerText}`}>Wagyu Bolognese</div>
                                <div className={`text-[6px] ${activeTheme.text} opacity-60`}>Truffle oil, parmesan</div>
                              </div>
                              <span className={`font-black ${activeTheme.accent}`}>$24</span>
                            </div>
                            <div className="flex justify-between items-center text-[7px]">
                              <div>
                                <div className={`font-bold ${activeTheme.headerText}`}>Calamari Fritti</div>
                                <div className={`text-[6px] ${activeTheme.text} opacity-60`}>Garlic aioli dip</div>
                              </div>
                              <span className={`font-black ${activeTheme.accent}`}>$16</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className={`text-center text-[7px] border-t pt-1.5 truncate ${activeTheme.border} ${activeTheme.text} opacity-40`}>
                    {customUrl}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Showcase Visual Layout Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-background border-t border-border relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.01] rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-20">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-8 border-b border-border">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-primary font-black">Dynamic Blueprints</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] font-display">
                Templates designed for the <span className="font-semibold italic text-foreground/80">modern</span> publisher.
              </h2>
            </div>
            <div className="md:col-span-4 text-left md:text-right">
              <p className="text-xs text-foreground/50 max-w-xs md:ml-auto leading-relaxed">
                Choose a dynamic blueprint, upload custom files or links, and configure styling controls dynamically.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[380px] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <FileUp className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Resumes & Files</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    Upload PDF CVs or product assets to ImageKit cloud CDN. Readers access an optimized presentation card with embedded inline viewing and instant downloads.
                  </p>
                </div>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6">
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest font-mono">ImageKit CDN</span>
                <Link href="/generator" className="inline-flex items-center text-xs font-bold text-white group-hover:text-primary transition-colors gap-1">
                  Try Blueprint <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[380px] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Social Bio Trees</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    Aggregate LinkedIn, GitHub, Twitter, and portfolio links into a unified mobile bio tree. Configured with dynamic color schemes and initials-based avatars.
                  </p>
                </div>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6">
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest font-mono">Link trees</span>
                <Link href="/generator" className="inline-flex items-center text-xs font-bold text-white group-hover:text-primary transition-colors gap-1">
                  Try Blueprint <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[380px] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden">
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Restaurant Menus</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed">
                    Create instant, touch-free menus and catalogs. Customize currency markers, category headers, pricing lists, and dish descriptions in a few clicks.
                  </p>
                </div>
              </div>
              <div className="pt-8 flex items-center justify-between border-t border-white/5 mt-6">
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest font-mono">Digital catalogs</span>
                <Link href="/generator" className="inline-flex items-center text-xs font-bold text-white group-hover:text-primary transition-colors gap-1">
                  Try Blueprint <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Interactive Analytics Chart Mockup */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-card/10 border-t border-border relative">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-secondary/3 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-secondary font-black">Scan Metrics Dashboard</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] font-display">
              Insights that drive <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">decisions.</span>
            </h2>
            <p className="text-sm text-foreground/50 max-w-xl mx-auto leading-relaxed">
              Every printed QR code feeds data back into your analytics dashboard. Click the tabs below to explore scans by demographics, platforms, and referrers with live micro-animations.
            </p>
          </div>

          {/* Interactive Chart Container */}
          <div className="max-w-4xl mx-auto bg-card/25 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-8 relative">
            
            {/* Top row: Metrics readout and LIVE TRIGGER scan simulation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-white/5 pb-6">
              
              {/* Latency Monitors Dials */}
              <div className="grid grid-cols-3 gap-4 w-full sm:w-auto">
                <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center space-y-1.5">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[8px] font-bold text-foreground/45 uppercase tracking-wider">DB Index Hit</span>
                  <span className="text-xs font-black text-white font-mono">{dbLatency}ms</span>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center space-y-1.5">
                  <Activity className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[8px] font-bold text-foreground/45 uppercase tracking-wider">DNS Relay</span>
                  <span className="text-xs font-black text-white font-mono">{dnsLatency}ms</span>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center space-y-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[8px] font-bold text-foreground/45 uppercase tracking-wider">CDN Edge Ping</span>
                  <span className="text-xs font-black text-white font-mono">{cdnLatency}ms</span>
                </div>
              </div>

              {/* Total count and trigger button */}
              <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <span className="text-[8px] font-bold text-foreground/45 uppercase tracking-wider block">Total Recorded Scans</span>
                  <span className="text-xl font-black text-white font-mono">{totalScans}</span>
                </div>
                
                <button
                  onClick={handleTriggerSimScan}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-secondary/15 animate-bounce hover:animate-none cursor-pointer"
                >
                  <MousePointerClick className="w-4 h-4" />
                  Simulate Scan
                </button>
              </div>

            </div>

            {/* Split row: Left visual world map dots, Right charts */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left: SVG World Map Coordinate Grid */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-black/40 border border-white/5 rounded-2xl relative min-h-[190px]">
                <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest absolute top-3 left-3 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-secondary" /> Edge traffic map
                </span>

                <div className="w-full h-36 relative mt-4">
                  {/* Clean SVG dot world map simulation representation */}
                  <svg viewBox="0 0 360 180" className="w-full h-full text-foreground/15 fill-current select-none">
                    {/* Continents outlines represented as soft aesthetic dots blocks */}
                    {/* NA */}
                    <circle cx="60" cy="50" r="16" />
                    <circle cx="85" cy="65" r="18" />
                    <circle cx="110" cy="75" r="14" />
                    {/* SA */}
                    <circle cx="115" cy="115" r="12" />
                    <circle cx="130" cy="140" r="10" />
                    {/* Europe */}
                    <circle cx="175" cy="45" r="12" />
                    <circle cx="185" cy="55" r="10" />
                    {/* Africa */}
                    <circle cx="190" cy="100" r="16" />
                    <circle cx="205" cy="120" r="10" />
                    {/* Asia */}
                    <circle cx="260" cy="55" r="22" />
                    <circle cx="290" cy="70" r="18" />
                    <circle cx="310" cy="75" r="12" />
                    {/* Oceania */}
                    <circle cx="315" cy="130" r="14" />
                    <circle cx="330" cy="145" r="10" />
                  </svg>

                  {/* Active Simulation coordinate marker beacon expands */}
                  {activeScanPoint && (
                    <div 
                      className="absolute w-4 h-4 -translate-x-2 -translate-y-2 z-10 pointer-events-none"
                      style={{ 
                        left: `${activeScanPoint.x}%`, 
                        top: `${activeScanPoint.y}%` 
                      }}
                    >
                      {/* Pulse circle expanding */}
                      <span className="absolute inset-0 rounded-full bg-secondary opacity-75 animate-ping" />
                      {/* Solid center dot */}
                      <span className="absolute inset-1 rounded-full bg-secondary border border-white" />
                      
                      {/* Floating geo marker tag label */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow whitespace-nowrap z-20">
                        {activeScanPoint.city}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Charts switch */}
              <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
                {/* Tab selector */}
                <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-xl">
                  {(['days', 'devices', 'sources'] as AnalyticsTab[]).map((tab) => {
                    const isActive = analyticsTab === tab
                    return (
                      <button
                        key={tab}
                        onClick={() => setAnalyticsTab(tab)}
                        className={`flex-1 py-2 text-center rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          isActive
                            ? 'bg-secondary text-secondary-foreground shadow-lg font-black'
                            : 'text-foreground/45 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab === 'days' ? 'Scan Volume' : tab === 'devices' ? 'User Devices' : 'Traffic Sources'}
                      </button>
                    )
                  })}
                </div>

                <div className="h-48 flex flex-col justify-end gap-3.5 border-b border-white/5 pb-2 px-2 relative">
                  {analyticsTab === 'days' && (
                    <div className="flex items-end justify-between h-full w-full gap-3 pt-6">
                      {[
                        { label: 'Mon', count: dayCounts[0] },
                        { label: 'Tue', count: dayCounts[1] },
                        { label: 'Wed', count: dayCounts[2] },
                        { label: 'Thu', count: dayCounts[3] },
                        { label: 'Fri', count: dayCounts[4] },
                        { label: 'Sat', count: dayCounts[5] },
                        { label: 'Sun', count: dayCounts[6] },
                      ].map((bar, i) => {
                        const totalMax = Math.max(...dayCounts)
                        const computedPct = totalMax > 0 ? (bar.count / totalMax) * 100 : 0
                        
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                            <div className="text-[9px] font-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity font-bold">{bar.count}</div>
                            <div 
                              className="w-full bg-secondary/20 hover:bg-secondary border border-secondary/30 rounded-t-lg transition-all duration-500 shadow-md hover:shadow-secondary/20 relative overflow-hidden"
                              style={{ height: `${Math.max(12, computedPct)}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                            </div>
                            <div className="text-[9px] text-foreground/45 font-bold">{bar.label}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {analyticsTab === 'devices' && (
                    <div className="flex flex-col justify-center h-full w-full space-y-4 px-2">
                      {[
                        { name: 'iOS Device Agent', percent: deviceRatios[0], color: 'bg-primary' },
                        { name: 'Android OS Client', percent: deviceRatios[1], color: 'bg-secondary' },
                        { name: 'Desktop Web Browser', percent: deviceRatios[2], color: 'bg-amber-500' },
                      ].map((dev, i) => (
                        <div key={i} className="space-y-1.5 group cursor-pointer">
                          <div className="flex justify-between text-[10px] font-bold text-white">
                            <span className="flex items-center gap-1.5 text-foreground/75"><span className={`w-2 h-2 rounded-full ${dev.color}`} /> {dev.name}</span>
                            <span className="font-mono">{dev.percent}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                            <div 
                              className={`h-full ${dev.color} rounded-full transition-all duration-700 shadow-lg`} 
                              style={{ width: `${dev.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {analyticsTab === 'sources' && (
                    <div className="flex flex-col justify-center h-full w-full space-y-3.5 px-2">
                      {[
                        { name: 'Direct Physical Scan', count: `${sourceCounts[0]} scans`, percent: Math.round((sourceCounts[0] / totalScans) * 100), color: 'bg-emerald-500' },
                        { name: 'Instagram Referral Link', count: `${sourceCounts[1]} scans`, percent: Math.round((sourceCounts[1] / totalScans) * 100), color: 'bg-purple-500' },
                        { name: 'LinkedIn Catalog Clicks', count: `${sourceCounts[2]} scans`, percent: Math.round((sourceCounts[2] / totalScans) * 100), color: 'bg-blue-500' },
                        { name: 'Twitter/X Shortener', count: `${sourceCounts[3]} scans`, percent: Math.round((sourceCounts[3] / totalScans) * 100), color: 'bg-neutral-400' },
                      ].map((src, i) => (
                        <div key={i} className="space-y-1 group cursor-pointer">
                          <div className="flex justify-between text-[10px] font-bold text-white">
                            <span className="flex items-center gap-1.5 text-foreground/75"><span className={`w-2 h-2 rounded-full ${src.color}`} /> {src.name}</span>
                            <span className="text-[9px] text-foreground/45 font-mono">{src.count} ({src.percent}%)</span>
                          </div>
                          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                            <div 
                              className={`h-full ${src.color} rounded-full transition-all duration-700 shadow-lg`} 
                              style={{ width: `${src.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="flex justify-between items-center text-[10px] text-foreground/35 font-bold uppercase tracking-widest pt-2 border-t border-white/5">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Client Sync</span>
              <span>Updated Just Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-background relative text-center border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Start Publishing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] max-w-2xl mx-auto text-balance font-display">
            Upgrade your printed media with <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">dynamic</span> redirection.
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-md mx-auto leading-relaxed">
            Configure templates, print high-res vector files once, and modify redirection destination urls at any point in the dashboard.
          </p>
          <div className="pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-8 py-6 shadow-xl shadow-primary/10">
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
