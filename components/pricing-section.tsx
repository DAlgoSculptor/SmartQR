'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying it out',
    features: [
      'All 8+ QR code types',
      'Basic customization',
      'PNG & SVG export',
      'Limited logos (no uploads)',
      'Up to 5 codes/hour',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For power users',
    features: [
      'All Free features',
      'Full customization suite',
      'Cloudinary logo uploads',
      'PDF export',
      'Unlimited codes',
      'Priority support',
      'History & saved designs',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'All Pro features',
      'Team collaboration',
      'API access',
      'Custom branding',
      'White-label options',
      'Dedicated support',
      'Advanced analytics',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/50 via-background to-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <div className="glass px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Flexible Pricing</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold">Simple Plans for Everyone</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            No surprise fees. Cancel anytime. All plans include core QR generation features.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass p-8 flex flex-col relative transition-all duration-300 ${
                plan.highlight
                  ? 'border-primary/50 scale-105 md:scale-105'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-foreground/60">{plan.period}</span>}
                </div>
              </div>

              {/* Features list */}
              <div className="flex-1 mb-8">
                <div className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/generator" className="w-full">
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 text-center">
          <p className="text-foreground/60 max-w-2xl mx-auto">
            All features are available to try for free. Start creating beautiful QR codes today with no credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
