'use client'

import { ArrowRight, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Choose Your Type',
    description: 'Select from 8+ QR code types: Text, URL, vCard, WiFi, Email, SMS, WhatsApp, or Event.',
  },
  {
    number: '02',
    title: 'Enter Your Data',
    description: 'Type in your content or select from templates. Our interface guides you through.',
  },
  {
    number: '03',
    title: 'Customize',
    description: 'Pick colors, patterns, logos, and error correction levels. See changes in real-time.',
  },
  {
    number: '04',
    title: 'Download & Share',
    description: 'Export as PNG, SVG, or PDF. Perfect quality every time. Share instantly.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-screen blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <div className="glass px-4 py-2 rounded-full border border-secondary/30 flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Simple Process</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold">How It Works</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Four simple steps to create stunning QR codes. Fast, intuitive, and powerful.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-8 items-start group">
              {/* Number and line */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/40 to-secondary/40 border border-primary/30 flex items-center justify-center text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-24 bg-gradient-to-b from-primary/50 to-secondary/20 rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="glass p-8 flex-1 hover:border-primary/50 transition-all">
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground/60 text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground/60 mb-6">Ready to create your first QR code?</p>
          <a
            href="/generator"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all group"
          >
            Start Creating Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
