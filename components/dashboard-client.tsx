'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { LogOut, BarChart3, Eye, Download, Trash2, Link2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface QRCode {
  id: string
  title: string
  slug: string
  qr_type: string
  created_at: string
  scan_count: number
  destination_url?: string
}

export default function DashboardClient({ user }: { user: User }) {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQRCodes()
  }, [])

  async function fetchQRCodes() {
    try {
      const response = await fetch('/api/qr-codes')
      if (!response.ok) throw new Error('Failed to fetch QR codes')
      const data = await response.json()
      setQrCodes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching QR codes')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this QR code?')) return

    try {
      const response = await fetch(`/api/qr-codes/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete QR code')
      setQrCodes(qrCodes.filter((qr) => qr.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting QR code')
    }
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">
              Q
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-foreground/70">
              {user.email}
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-white/10 hover:bg-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 text-balance">Your QR Codes</h2>
          <p className="text-foreground/60 mb-6">Manage and track your QR codes in one place</p>
          <Link href="/generator">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Generate New QR Code
            </Button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {/* QR Codes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">Loading your QR codes...</p>
          </div>
        ) : qrCodes.length === 0 ? (
          <div className="text-center py-12 glass rounded-2xl">
            <p className="text-foreground/60 mb-4">No QR codes yet</p>
            <Link href="/generator">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Create Your First QR Code
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qrCodes.map((qr) => (
              <div
                key={qr.id}
                className="glass p-6 hover:border-primary/50 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-balance mb-1">
                      {qr.title}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {qr.qr_type.charAt(0).toUpperCase() + qr.qr_type.slice(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {qr.scan_count}
                    </div>
                    <p className="text-xs text-foreground/60">scans</p>
                  </div>
                </div>

                <div className="text-sm text-foreground/60 mb-4">
                  Created{' '}
                  {new Date(qr.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/qr/${qr.slug}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/dashboard/qr/${qr.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 text-xs"
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 text-xs"
                    onClick={() => {
                      const url = `${window.location.origin}/qr/${qr.slug}`
                      navigator.clipboard.writeText(url)
                      alert('URL copied to clipboard!')
                    }}
                  >
                    <Link2 className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500/20 hover:bg-red-500/10 text-red-500 text-xs"
                    onClick={() => handleDelete(qr.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
