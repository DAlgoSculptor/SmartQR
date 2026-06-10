'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import QRToolSelector from '@/components/qr-tool-selector'
import QRGenerator from '@/components/qr-generator'

export default function GeneratorPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-[#040508] text-foreground overflow-hidden relative flex flex-col justify-between">
      {/* Background grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />
      {/* Ambient subtle glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/">
              <div className="hover:opacity-85 transition cursor-pointer">
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
            <Link href="/">
              <Button variant="outline" size="sm" className="border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 rounded-xl transition-all duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
          {!selectedTool ? (
            <QRToolSelector onSelectTool={setSelectedTool} />
          ) : (
            <QRGenerator toolType={selectedTool} onBack={() => setSelectedTool(null)} />
          )}
        </div>
      </div>
    </main>
  )
}

