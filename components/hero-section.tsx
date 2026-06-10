'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Cloud, FileText, Shield, QrCode, ArrowUpRight, Laptop, Sparkle } from 'lucide-react'

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'file' | 'social' | 'menu'>('file')

  // Auto-switch tabs to show simulation if user doesn't interact
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'file') return 'social'
        if (prev === 'social') return 'menu'
        return 'file'
      })
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[#040508]">
      {/* Editorial Grid Grid Lines background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none -z-10" />
      
      {/* Organic, premium warm copper background glow */}
      <div className="absolute top-1/4 right-1/10 w-[500px] h-[500px] bg-[#ea580c]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/10 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Editorial typography and value proposition */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-foreground/70 text-[11px] font-medium tracking-wide">
            <Sparkle className="w-3.5 h-3.5 text-primary text-[#ea580c]" />
            Bespoke QR redirectional hosting
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Create QR codes that <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">speak</span> for themselves.
            </h1>
            <p className="text-sm sm:text-base text-foreground/60 max-w-xl leading-relaxed font-medium">
              Host PDF resumes on global CDNs, design responsive social bio links, or publish digital menus instantly. Point scanners to beautiful web experiences, and update destination content anytime without reprints.
            </p>
          </div>

          {/* Premium editorial action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/generator">
              <Button size="lg" className="bg-gradient-primary hover:opacity-95 text-white px-8 py-6 rounded-xl font-bold shadow-xl shadow-primary/10 flex items-center gap-2 group transition-all duration-300">
                Design Your Code
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 hover:border-white/20 active:scale-95 text-white/90 px-8 py-6 rounded-xl font-bold transition-all duration-200">
                Explore Process
              </Button>
            </Link>
          </div>

          {/* Quick Metrics / Features row */}
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/5 max-w-md">
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">ImageKit CDN</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">Realtime</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">Scan Analytics</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">Dynamic</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">Redirections</div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Mockup Device */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Glassmorphic Mockup Container */}
          <div className="w-full max-w-[500px] bg-white/[0.01] border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-transparent pointer-events-none" />
            
            {/* Interactive Tab bar */}
            <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5 gap-1.5 mb-6">
              <button
                onClick={() => setActiveTab('file')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'file' ? 'bg-[#ea580c] text-white shadow' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                PDF Resume
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'social' ? 'bg-[#ea580c] text-white shadow' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                Social Tree
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'menu' ? 'bg-[#ea580c] text-white shadow' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                Digital Menu
              </button>
            </div>

            {/* Simulated Workspace View */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left: Dynamic Phone Preview Frame */}
              <div className="md:col-span-7 flex justify-center">
                <div className="w-48 h-80 rounded-[30px] border-4 border-neutral-800 bg-neutral-950 p-2.5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  {/* Phone Speaker notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-neutral-800 rounded-b-xl z-20" />
                  
                  {/* Active Template simulation */}
                  <div className="w-full h-full bg-[#08090d] rounded-[20px] overflow-hidden p-3 flex flex-col justify-between relative text-left">
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

                    {activeTab === 'file' && (
                      <div className="space-y-3 pt-4 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[11px] font-black text-white">Olivia_Sen_CV.pdf</div>
                          <div className="text-[9px] text-foreground/50">Senior UI Designer • 2.4 MB</div>
                        </div>
                        <div className="border border-white/5 rounded-lg p-2 bg-white/[0.01] space-y-1.5">
                          <div className="w-full h-2 bg-white/10 rounded" />
                          <div className="w-11/12 h-2 bg-white/10 rounded" />
                          <div className="w-10/12 h-2 bg-white/10 rounded" />
                          <div className="w-8/12 h-2 bg-white/10 rounded" />
                        </div>
                        <button className="w-full bg-[#ea580c] text-[10px] font-bold py-2 rounded-lg text-white shadow shadow-orange-500/20 text-center">
                          Download Document
                        </button>
                      </div>
                    )}

                    {activeTab === 'social' && (
                      <div className="space-y-4 pt-4 animate-fade-in flex flex-col items-center">
                        <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xs shadow-lg">
                          OS
                        </div>
                        <div className="text-center space-y-0.5">
                          <div className="text-[10px] font-black text-white">Olivia Sen</div>
                          <div className="text-[8px] text-foreground/40">Designer & Developer</div>
                        </div>
                        <div className="w-full space-y-1.5">
                          <div className="w-full py-1.5 rounded bg-white/5 border border-white/10 text-center text-[8px] font-bold text-white/80 hover:bg-white/10 cursor-pointer">Portfolio Website</div>
                          <div className="w-full py-1.5 rounded bg-white/5 border border-white/10 text-center text-[8px] font-bold text-white/80 hover:bg-white/10 cursor-pointer">LinkedIn Profile</div>
                          <div className="w-full py-1.5 rounded bg-white/5 border border-white/10 text-center text-[8px] font-bold text-white/80 hover:bg-white/10 cursor-pointer">GitHub Codebase</div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'menu' && (
                      <div className="space-y-3 pt-4 animate-fade-in">
                        <div className="border-b border-white/5 pb-1.5">
                          <div className="text-[10px] font-black text-white">Mamma Mia</div>
                          <div className="text-[8px] text-[#ea580c] font-bold">Ambient Trattoria</div>
                        </div>
                        <div className="space-y-2 max-h-[160px] overflow-hidden">
                          <div className="flex justify-between items-center text-[8px]">
                            <div>
                              <div className="font-bold text-white/90">Wagyu Bolognese</div>
                              <div className="text-[7px] text-foreground/40">Truffle oil, parmesan</div>
                            </div>
                            <span className="font-black text-[#ea580c]">$24</span>
                          </div>
                          <div className="flex justify-between items-center text-[8px]">
                            <div>
                              <div className="font-bold text-white/90">Calamari Fritti</div>
                              <div className="text-[7px] text-foreground/40">Garlic aioli dip</div>
                            </div>
                            <span className="font-black text-[#ea580c]">$16</span>
                          </div>
                          <div className="flex justify-between items-center text-[8px]">
                            <div>
                              <div className="font-bold text-white/90">Tiramisu Cup</div>
                              <div className="text-[7px] text-foreground/40">Espresso, mascarpone</div>
                            </div>
                            <span className="font-black text-[#ea580c]">$11</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center text-[7px] text-foreground/30 border-t border-white/5 pt-1.5">
                      smartqr.io/slug
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Dynamic Styled QR Output Card */}
              <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-3 bg-white rounded-2xl shadow-xl relative group-hover:scale-105 transition-transform duration-300">
                  <QrCode className="w-24 h-24 text-black" />
                  {/* Dynamic laser scanning line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent shadow-lg shadow-orange-500/50 animate-scanning" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">Dynamic Redirect</div>
                  <div className="text-[9px] text-[#ea580c] font-bold uppercase tracking-wider">Point to any URL</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
