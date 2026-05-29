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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">
                Q
              </div>
              <span className="font-bold text-lg">SmartQR</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="border-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedTool ? (
          <QRToolSelector onSelectTool={setSelectedTool} />
        ) : (
          <QRGenerator toolType={selectedTool} onBack={() => setSelectedTool(null)} />
        )}
      </div>
    </main>
  )
}
