'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Check, X, HelpCircle, Calculator, Info } from 'lucide-react'
import Footer from '@/components/footer'

type PlanName = 'Free' | 'Professional' | 'Enterprise'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  
  // Interactive Calculator States
  const [expectedScans, setExpectedScans] = useState(1000) // slider range [100 to 500000]
  const [expectedQrs, setExpectedQrs] = useState(2)       // slider range [1 to 100]

  // Calculate recommended plan
  let recommendedPlan: PlanName = 'Free'
  if (expectedScans > 100000 || expectedQrs > 20) {
    recommendedPlan = 'Enterprise'
  } else if (expectedScans > 100 || expectedQrs > 1) {
    recommendedPlan = 'Professional'
  }

  const plans = [
    {
      name: 'Free' as PlanName,
      description: 'Ideal for personal use or testing out QR capabilities.',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        '5 Static QR Codes (URL, Text, WiFi, etc.)',
        '1 Dynamic QR Code',
        '100 Scan redirects per month',
        'Basic Custom Styling',
        'SmartQR Branding on landing pages',
      ],
      notIncluded: [
        'ImageKit CDN File Uploads',
        'Social Link Trees templates',
        'Digital Restaurant Menus templates',
        'Custom Logo overlay',
        'Detailed Analytics (City, Device, Referrer)',
        'White-label Domains & URL masking',
      ],
      buttonText: 'Get Started Free',
      buttonLink: '/generator',
      popular: false,
      color: 'border-white/5 bg-white/[0.01] hover:border-white/10',
    },
    {
      name: 'Professional' as PlanName,
      description: 'Perfect for creators, consultants, and small business owners.',
      price: {
        monthly: 9,
        yearly: 79,
      },
      features: [
        'Unlimited Static QR Codes',
        '20 Dynamic QR Codes',
        'Unlimited scans & redirections',
        'No SmartQR branding (White-label)',
        'Direct PDF & Resume upload (ImageKit Cloud)',
        'Full access to Social Bio Trees templates',
        'Full access to Digital Menu catalogs',
        'Custom brand logo overlay on QRs',
        'Advanced Analytics (Device, Referrer, City)',
      ],
      notIncluded: [
        'API generation endpoints',
        'Custom Domain delegation',
        'Dedicated account representative',
      ],
      buttonText: 'Start Pro Trial',
      buttonLink: '/auth/sign-up?plan=pro',
      popular: true,
      color: 'border-primary/20 bg-primary/[0.02] hover:border-primary/30 shadow-lg shadow-primary/5',
    },
    {
      name: 'Enterprise' as PlanName,
      description: 'Designed for retail chains, agencies, and large operations.',
      price: {
        monthly: 49,
        yearly: 399,
      },
      features: [
        'Unlimited Static & Dynamic QR Codes',
        'Unlimited scans & bandwidth redirection',
        'Dedicated high-speed CDN assets cloud',
        'Whitelabel Custom domains URL masking',
        'Multi-user workspace and team management',
        'Bulk QR Code generation and CSV importing',
        'Developer API endpoints access',
        '24/7 Priority Support & SLA uptime guarantee',
      ],
      notIncluded: [],
      buttonText: 'Contact Enterprise',
      buttonLink: 'mailto:enterprise@smartqr.io?subject=Enterprise Inquiry',
      popular: false,
      color: 'border-white/5 bg-white/[0.01] hover:border-white/10',
    },
  ]

  const featureComparison = [
    { name: 'Static QR Codes', free: '5 Codes', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Dynamic QR Codes', free: '1 Code', pro: '20 Codes', enterprise: 'Unlimited' },
    { name: 'Scan Analytics', free: 'Total Counts only', pro: 'Advanced (City, Device, Referrer)', enterprise: 'Advanced + Export logs' },
    { name: 'ImageKit File Uploads', free: '❌', pro: '✅ (up to 10MB)', enterprise: '✅ (up to 100MB)' },
    { name: 'Social Link Trees', free: '❌', pro: '✅', enterprise: '✅' },
    { name: 'Digital Menus', free: '❌', pro: '✅', enterprise: '✅' },
    { name: 'Branding Removal', free: '❌', pro: '✅', enterprise: '✅' },
    { name: 'Custom Domains / URLs', free: '❌', pro: '❌', enterprise: '✅' },
    { name: 'API Generation Access', free: '❌', pro: '❌', enterprise: '✅' },
    { name: 'Customer Support', free: 'Community', pro: 'Email Support', enterprise: '24/7 Priority SLA' },
  ]

  // Formatter helpers
  const formatScans = (val: number) => {
    if (val >= 100000) return `${(val / 1000).toFixed(0)}k+`
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`
    return val.toString()
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid Pattern & glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

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
            <Link href="/pricing" className="nav-link text-sm text-primary font-semibold py-1">Pricing</Link>
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
      <section className="pt-36 pb-8 px-6 text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Transparent Pricing Plans
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
          Pricing that scales with <span className="font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">your</span> output.
        </h1>
        <p className="text-foreground/50 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
          Create static codes for free forever, or upgrade to a Professional account to unlock CDN cloud hosting, custom logo themes, and unlimited scan redirection.
        </p>

        {/* Toggle Switch */}
        <div className="pt-6 flex justify-center items-center gap-4">
          <span className={`text-xs font-bold transition-colors duration-200 ${billingPeriod === 'monthly' ? 'text-white' : 'text-foreground/45'}`}>Monthly Billing</span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6 rounded-full bg-white/5 border border-white/10 flex items-center p-0.5 relative transition-colors hover:border-primary/25"
          >
            <div className={`w-4.5 h-4.5 rounded-full bg-primary transition-all duration-300 ${billingPeriod === 'yearly' ? 'translate-x-6' : ''}`} />
          </button>
          <span className={`text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-white' : 'text-foreground/45'}`}>
            Yearly Billing
            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
          </span>
        </div>
      </section>

      {/* SECTION: Dynamic Pricing Calculator Slider */}
      <section className="py-8 px-6 max-w-4xl mx-auto w-full">
        <div className="bg-card/25 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3">
            <Calculator className="w-4 h-4 text-primary" />
            <span>Interactive Cost Calculator</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Slider 1: Expected Monthly Scans */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-foreground/70">
                <span>Expected Monthly Scans</span>
                <span className="text-primary font-black font-mono">{formatScans(expectedScans)} scans</span>
              </div>
              <input
                type="range"
                min="50"
                max="250000"
                step="50"
                value={expectedScans}
                onChange={(e) => setExpectedScans(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-black/40 border border-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[9px] text-foreground/40 font-semibold font-mono">
                <span>50 scans</span>
                <span>250k+ scans</span>
              </div>
            </div>

            {/* Slider 2: Dynamic QRs needed */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-foreground/70">
                <span>Dynamic QR Codes Required</span>
                <span className="text-primary font-black font-mono">{expectedQrs} codes</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={expectedQrs}
                onChange={(e) => setExpectedQrs(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-black/40 border border-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[9px] text-foreground/40 font-semibold font-mono">
                <span>1 code</span>
                <span>50 codes</span>
              </div>
            </div>
          </div>

          {/* Estimated Infrastructure Resource Footprint */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-5">
            <div className="bg-black/35 border border-white/5 rounded-2xl p-4 text-center">
              <span className="text-[9px] font-bold text-foreground/45 uppercase tracking-widest block mb-1">CDN Edge Bandwidth</span>
              <span className="text-sm font-black text-white font-mono">
                {((expectedScans * 1.45) / 1024).toFixed(2)} GB/mo
              </span>
            </div>
            <div className="bg-black/35 border border-white/5 rounded-2xl p-4 text-center">
              <span className="text-[9px] font-bold text-foreground/45 uppercase tracking-widest block mb-1">Peak Queries Load</span>
              <span className="text-sm font-black text-white font-mono">
                {((expectedScans / 2592000) * 3.6).toFixed(3)} QPS
              </span>
            </div>
            <div className="bg-black/35 border border-white/5 rounded-2xl p-4 text-center">
              <span className="text-[9px] font-bold text-foreground/45 uppercase tracking-widest block mb-1">DB Read Queries</span>
              <span className="text-sm font-black text-white font-mono">
                {expectedScans.toLocaleString()} reads/mo
              </span>
            </div>
          </div>

          {/* Calculator recommendation badge */}
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-start gap-3 text-xs text-foreground/75 leading-relaxed font-medium animate-slide-in">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              Based on your requirements, the <span className="font-bold text-white uppercase">{recommendedPlan} Plan</span> is your best match! It covers up to{' '}
              <span className="text-white font-bold">{recommendedPlan === 'Free' ? '100' : recommendedPlan === 'Professional' ? '100k' : 'unlimited'} scans</span>{' '}
              and <span className="text-white font-bold">{recommendedPlan === 'Free' ? '1' : recommendedPlan === 'Professional' ? '20' : 'unlimited'} dynamic redirect codes</span>.
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            const calculatedPrice = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
            const unitText = plan.price.monthly === 0 ? '' : billingPeriod === 'monthly' ? '/mo' : '/yr'
            const isRecommended = recommendedPlan === plan.name

            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 group ${plan.color} ${
                  isRecommended
                    ? 'ring-2 ring-primary border-primary scale-[1.02] shadow-2xl shadow-primary/5 bg-primary/[0.03]'
                    : 'border-white/5 bg-white/[0.01]'
                }`}
              >
                {/* Recommendation Badge */}
                {isRecommended && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-primary/25">
                    Recommended Fit
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-foreground/50 text-xs leading-relaxed min-h-[40px] font-medium">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1 py-2 border-b border-white/5">
                    <span className="text-4xl font-black text-white font-display">${calculatedPrice}</span>
                    <span className="text-xs font-bold text-foreground/40">{unitText}</span>
                  </div>

                  {/* Included features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-2 text-xs text-foreground/85 font-medium">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-2 text-xs text-foreground/35 line-through decoration-white/5 font-medium">
                        <X className="w-4 h-4 text-rose-500/30 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <Link href={plan.buttonLink} className="w-full block">
                    <Button
                      className={`w-full font-bold rounded-xl py-5 text-xs transition-all duration-300 ${
                        isRecommended
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Feature Comparison Grid */}
      <section className="py-12 px-6 max-w-4xl mx-auto w-full border-t border-white/5 mt-12">
        <h2 className="text-2xl font-black text-center text-white mb-8 font-display">Compare Plan Features</h2>
        <div className="overflow-x-auto bg-white/[0.01] rounded-2xl border border-white/5">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="p-4 font-bold text-white">Features</th>
                <th className="p-4 font-bold text-white text-center">Free</th>
                <th className="p-4 font-bold text-white text-center">Professional</th>
                <th className="p-4 font-bold text-white text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {featureComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 font-bold text-foreground/80 flex items-center gap-1.5 font-display">
                    {row.name}
                  </td>
                  <td className="p-4 text-center text-foreground/50 font-medium">{row.free}</td>
                  <td className="p-4 text-center text-primary font-bold">{row.pro}</td>
                  <td className="p-4 text-center text-secondary font-bold">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-2xl font-black text-white mb-8 font-display">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm font-display">
              <HelpCircle className="w-4 h-4 text-primary" /> What are dynamic QR codes?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              Unlike static QRs which store hardcoded links, dynamic QR codes store redirect tokens. This means you can update the destination file, URL, menu, or social info anytime without reprint.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm font-display">
              <HelpCircle className="w-4 h-4 text-primary" /> Can I use ImageKit CDN for free?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              Yes, we provide dynamic PDF/file previews using our high-speed ImageKit CDN storage backend. Files on the Free tier expire or have scanning caps, whereas Pro tiers get priority persistent storage.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm font-display">
              <HelpCircle className="w-4 h-4 text-primary" /> Can I cancel my Pro subscription?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              Absolutely. You can cancel your subscription at any time directly from the user settings page. Once cancelled, your QR codes will revert back to standard Free tier limits at the end of the billing term.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm font-display">
              <HelpCircle className="w-4 h-4 text-primary" /> Do my QR codes expire?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              No, static QR codes never expire and have unlimited scans. Dynamic QR codes stay active as long as the user account exists and scan redirection limits are respected.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
