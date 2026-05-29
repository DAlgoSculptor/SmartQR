'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Cloud, FileText, Shield } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-b from-[#05060a] via-[#0b0d11] to-[#071018]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-tr from-purple-700/20 to-indigo-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -left-24 bottom-10 w-72 h-72 bg-gradient-to-br from-rose-500/10 to-amber-400/10 rounded-full blur-2xl animate-blob" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold mr-3">Q</div>
          <div className="text-left">
            <div className="text-sm text-primary font-semibold">SmartQR</div>
            <div className="text-xs text-foreground/60">Next-gen QR + Cloud PDF delivery</div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Make QR Codes that do more
        </h1>
        <p className="mt-4 text-lg text-foreground/60 max-w-3xl mx-auto">
          Upload PDFs, store them securely in Cloudinary, and generate QR codes that deliver files instantly. Beautiful customization, analytics, and team-ready sharing.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generator">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3">
              Create Your First QR
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-white/10 text-white/90 px-6 py-3">
              Explore Features
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4 bg-white/3 rounded-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="w-5 h-5 text-white" />
              <div className="text-sm font-semibold text-white">Cloud Storage</div>
            </div>
            <div className="text-foreground/60 text-sm">Store PDFs securely on Cloudinary and serve them via your site.</div>
          </div>

          <div className="p-4 bg-white/3 rounded-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-white" />
              <div className="text-sm font-semibold text-white">PDF to QR</div>
            </div>
            <div className="text-foreground/60 text-sm">Upload a PDF and generate a QR that triggers a direct download when scanned.</div>
          </div>

          <div className="p-4 bg-white/3 rounded-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-white" />
              <div className="text-sm font-semibold text-white">Privacy-first</div>
            </div>
            <div className="text-foreground/60 text-sm">User data is respected. Files are served from your Cloud storage — you control access.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
