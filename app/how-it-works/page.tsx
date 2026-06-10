'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, UploadCloud, Settings, QrCode, BarChart3, ChevronRight } from 'lucide-react'
import Footer from '@/components/footer'

const steps = [
  {
    step: '01',
    icon: UploadCloud,
    title: 'Select Template & Upload Assets',
    description: 'Select your dynamic QR destination template: PDF/File Sharing, Social Link Tree, or Digital Menu. For files, upload them directly to secure ImageKit CDN cloud storage in one click.',
    badge: 'Fast Cloud Upload',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    hoverBorder: 'hover:border-blue-500/50 shadow-blue-500/5',
    iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    step: '02',
    icon: Settings,
    title: 'Customize Styling & Content',
    description: 'Fill in your social links, upload files, or list menu items. Then, style your physical QR code. Customize dot patterns, eye designs, colors, and upload your brand logo for maximum brand recognition.',
    badge: 'Fully Customizable',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
    hoverBorder: 'hover:border-purple-500/50 shadow-purple-500/5',
    iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    step: '03',
    icon: QrCode,
    title: 'Generate & Export High-Res',
    description: 'Instantly generate your dynamic QR code. Preview it directly in the generator and export in high-resolution, print-ready SVG, PNG, or vector PDF formats for websites, stickers, or packaging.',
    badge: 'Print-Ready Formats',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    hoverBorder: 'hover:border-amber-500/50 shadow-amber-500/5',
    iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'Track Scans & Edit on the Fly',
    description: 'Print your QR code once—change it forever. Update files, edit menu pricing, or swap social handles at any time. Monitor analytics on scan counts, device types, top referrers, and country demographics.',
    badge: 'Dynamic Redirection',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50 shadow-emerald-500/5',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
]

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <main className="min-h-screen bg-[#040508] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid Pattern & glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

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
            <Link href="/how-it-works" className="nav-link text-sm text-primary font-semibold py-1">How It Works</Link>
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
      <section className="pt-36 pb-12 px-6 text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Roadmap
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Engineered for simplicity, updated in <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">realtime</span>.
        </h1>
        <p className="text-foreground/50 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
          Create dynamic, trackable QR codes in four streamlined steps. Modify destination configurations anytime without re-printing.
        </p>
      </section>

      {/* Step Info Tabs Infographic */}
      <section className="py-8 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          {/* Left: Step Selectors (Interactive) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-2">Interactive Guide</h3>
            {steps.map((item, idx) => {
              const isActive = idx === activeStep
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 ${
                    isActive
                      ? 'bg-white/5 border-orange-500/20 shadow-lg shadow-orange-500/5'
                      : 'border-transparent bg-transparent hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${
                    isActive ? 'bg-[#ea580c] text-white border-orange-500/20' : 'bg-white/5 text-foreground/50 border-white/5'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-foreground/75'}`}>
                      {item.title}
                    </h4>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Detailed Infographic Display Panel */}
          <div className="lg:col-span-7 h-full min-h-[350px] bg-black/20 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient inner glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#ea580c] uppercase tracking-widest">Step {steps[activeStep].step}</span>
                <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border bg-gradient-to-r ${steps[activeStep].color}`}>
                  {steps[activeStep].badge}
                </span>
              </div>

              {/* Graphic Viewholder Mockup */}
              <div className="h-44 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/10 transition-colors duration-300">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                
                {/* Dynamically render step graphic mockup */}
                {activeStep === 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xl ${steps[0].iconColor}`}>
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/70">Upload PDF, Resumes, Images</span>
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[#ea580c] font-bold text-xs">P</div>
                      <div className="w-8 h-8 rounded bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold text-xs">S</div>
                      <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">M</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 animate-spin-slow">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/70">Style Dot Matrices & Add Logo</span>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-2xl">
                      <QrCode className="w-12 h-12 text-black" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">Export Options</div>
                      <div className="flex gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-foreground/70 font-semibold border border-white/5">SVG</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-foreground/70 font-semibold border border-white/5">PNG</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-foreground/70 font-semibold border border-white/5">PDF</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="flex flex-col items-center gap-2.5 w-full px-8">
                    <div className="flex justify-between items-center w-full px-4 text-xs font-semibold text-foreground/60 border-b border-white/5 pb-2">
                      <span>Live Stats</span>
                      <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Realtime</span>
                    </div>
                    <div className="flex gap-3 items-end h-12 w-full px-4">
                      <div className="w-full bg-orange-500/20 border border-orange-500/30 rounded-t h-1/3 animate-pulse" />
                      <div className="w-full bg-orange-500/40 border border-orange-500/50 rounded-t h-2/3" />
                      <div className="w-full bg-[#ea580c] rounded-t h-full" />
                      <div className="w-full bg-orange-500/30 border border-orange-500/40 rounded-t h-1/2" />
                    </div>
                    <span className="text-[10px] text-foreground/50">Modify Destination Instantly Without Re-Printing</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{steps[activeStep].title}</h3>
                <p className="text-foreground/50 text-xs leading-relaxed font-medium">{steps[activeStep].description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-4">
              <span className="text-[10px] text-foreground/30 font-bold">SmartQR Engine v2.0</span>
              <Button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                size="sm"
                variant="ghost"
                className="text-xs hover:text-white flex items-center gap-1.5 text-[#ea580c] font-bold"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Timeline Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-black text-white text-center mb-12">Step-by-Step Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between min-h-[280px] transition-all duration-300 group shadow-lg ${step.hoverBorder}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-white/10 group-hover:text-orange-500/20 transition-colors">{step.step}</span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${step.iconColor}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#ea580c] transition-colors">{step.title}</h3>
                  <p className="text-foreground/50 text-xs leading-relaxed font-medium">{step.description}</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4">
                  <span className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest">{step.badge}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-[#06070a] border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.1]">
            Experience Dynamic Simplicity.
          </h2>
          <p className="text-xs sm:text-sm text-foreground/50 max-w-md mx-auto leading-relaxed">
            Ready to design your first custom QR tree or restaurant catalog? No account is required to generate basic static codes.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link href="/generator">
              <Button size="lg" className="bg-[#ea580c] hover:bg-[#ea580c]/90 text-white font-bold rounded-xl px-6 py-4">
                Create Dynamic QR Now
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
