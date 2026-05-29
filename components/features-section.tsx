'use client'

import { Zap, Palette, Download, Smartphone, Lock, Gauge, Share2, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Create QR codes instantly with real-time preview and instant updates.',
  },
  {
    icon: Palette,
    title: 'Unlimited Customization',
    description: 'Choose colors, patterns, eye styles, and upload your own logos.',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Download as PNG, SVG, or PDF with adjustable sizes and resolutions.',
  },
  {
    icon: Smartphone,
    title: 'All QR Types',
    description: 'Text, URL, vCard, WiFi, Email, SMS, WhatsApp, Event codes and more.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'All processing happens locally. Your data never leaves your device.',
  },
  {
    icon: Gauge,
    title: 'Error Correction',
    description: 'Choose between Low, Medium, High, and Ultra error correction levels.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-background/50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <div className="glass px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powerful Features</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold">Everything You Need</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Professional-grade QR code generation with an intuitive interface. No learning curve, pure functionality.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="glass p-8 hover:border-primary/50 transition-all duration-300 hover:bg-card/50 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
