'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Check, X, HelpCircle } from 'lucide-react'
import Footer from '@/components/footer'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
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
      color: 'border-white/5 hover:border-white/10 bg-white/[0.01]',
      accentColor: 'text-foreground/60',
    },
    {
      name: 'Professional',
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
      color: 'border-orange-500/20 bg-orange-500/[0.02] hover:border-orange-500/30 shadow-lg shadow-orange-500/5',
      accentColor: 'text-[#ea580c]',
    },
    {
      name: 'Enterprise',
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
      color: 'border-white/5 hover:border-white/10 bg-white/[0.01]',
      accentColor: 'text-purple-400',
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

  return (
    <main className="min-h-screen bg-[#040508] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid Pattern & glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

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
            <Link href="/pricing" className="nav-link text-sm text-primary font-semibold py-1">Pricing</Link>
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
      <section className="pt-36 pb-8 px-6 text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing Plans
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Pricing that scales with <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">your</span> output.
        </h1>
        <p className="text-foreground/50 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed font-medium">
          Create static codes for free forever, or upgrade to a Professional account to unlock CDN cloud hosting, custom logo themes, and unlimited scan redirection.
        </p>

        {/* Toggle Switch */}
        <div className="pt-6 flex justify-center items-center gap-4">
          <span className={`text-xs font-bold transition-colors duration-200 ${billingPeriod === 'monthly' ? 'text-white' : 'text-foreground/45'}`}>Monthly Billing</span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6 rounded-full bg-white/5 border border-white/10 flex items-center p-0.5 relative transition-colors hover:border-orange-500/25"
          >
            <div className={`w-4.5 h-4.5 rounded-full bg-[#ea580c] transition-all duration-300 ${billingPeriod === 'yearly' ? 'translate-x-6' : ''}`} />
          </button>
          <span className={`text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-white' : 'text-foreground/45'}`}>
            Yearly Billing
            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            const calculatedPrice = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
            const unitText = plan.price.monthly === 0 ? '' : billingPeriod === 'monthly' ? '/mo' : '/yr'

            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 group ${plan.color}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#ea580c] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-foreground/50 text-xs leading-relaxed min-h-[40px] font-medium">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1 py-2 border-b border-white/5">
                    <span className="text-4xl font-black text-white">${calculatedPrice}</span>
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
                        plan.popular
                          ? 'bg-[#ea580c] hover:bg-[#ea580c]/90 text-white'
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
        <h2 className="text-2xl font-black text-center text-white mb-8">Compare Plan Features</h2>
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
                  <td className="p-4 font-bold text-foreground/80 flex items-center gap-1.5">
                    {row.name}
                  </td>
                  <td className="p-4 text-center text-foreground/50 font-medium">{row.free}</td>
                  <td className="p-4 text-center text-[#ea580c] font-bold">{row.pro}</td>
                  <td className="p-4 text-center text-purple-400 font-bold">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full text-center">
        <h2 className="text-2xl font-black text-white mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-[#ea580c]" /> What are dynamic QR codes?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              Unlike static QRs which store hardcoded links, dynamic QR codes store redirect tokens. This means you can update the destination file, URL, menu, or social info anytime without reprint.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-[#ea580c]" /> Can I use ImageKit CDN for free?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              Yes, we provide dynamic PDF/file previews using our high-speed ImageKit CDN storage backend. Files on the Free tier expire or have scanning caps, whereas Pro tiers get priority persistent storage.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-[#ea580c]" /> Can I cancel my Pro subscription?
            </h4>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              Absolutely. You can cancel your subscription at any time directly from the user settings page. Once cancelled, your QR codes will revert back to standard Free tier limits at the end of the billing term.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-[#ea580c]" /> Do my QR codes expire?
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
