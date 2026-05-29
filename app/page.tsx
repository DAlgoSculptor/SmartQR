import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import HowItWorks from '@/components/how-it-works'
import PricingSection from '@/components/pricing-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">
              Q
            </div>
            <span className="font-bold text-lg">SmartQR</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-foreground/70 hover:text-foreground transition">Features</Link>
            <Link href="#how" className="text-sm text-foreground/70 hover:text-foreground transition">How It Works</Link>
            <Link href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button size="sm" variant="ghost" className="text-foreground/70 hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link href="/generator">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
