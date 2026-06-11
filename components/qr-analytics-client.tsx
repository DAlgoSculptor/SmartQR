'use client'

import { useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Globe, Clock, Link2, Download, Copy } from 'lucide-react'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'
import { downloadQRCode } from '@/lib/qr-utils'

interface QRCode {
  id: string
  title: string
  slug: string
  qr_type: string
  destination_url?: string
  created_at: string
  scan_count: number
  custom_color?: string
}

interface AnalyticsRecord {
  id: string
  scanned_at: string
  ip_address?: string
  user_agent?: string
  country?: string
  city?: string
  referer?: string
}

interface AnalyticsData {
  qr_code: QRCode
  analytics: AnalyticsRecord[]
  total_scans: number
}

export default function QRAnalyticsClient({
  user,
  qrCodeId,
}: {
  user: User
  qrCodeId: string
}) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [qrCodeId])

  async function fetchAnalytics() {
    try {
      const response = await fetch(`/api/qr-codes/${qrCodeId}`)
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching analytics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Loading analytics...</p>
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <p className="text-red-500">{error || 'QR code not found'}</p>
        </div>
      </main>
    )
  }

  const qr = data.qr_code
  const analytics = data.analytics || []
  const uniqueCountries = new Set(analytics.map((a) => a.country).filter(Boolean)).size
  const uniqueIps = new Set(analytics.map((a) => a.ip_address).filter(Boolean)).size

  // Parse custom styled configs if present
  let finalFgColor = '#ea580c'
  let isGrad = false
  let gradEndColor = '#fb923c'
  let dotStyle = 'classic'
  let frameOverlay = 'none'

  if (qr.custom_color) {
    if (qr.custom_color.startsWith('{')) {
      try {
        const config = JSON.parse(qr.custom_color)
        finalFgColor = config.color || '#ea580c'
        isGrad = !!config.isGradient
        gradEndColor = config.gradientEndColor || '#fb923c'
        dotStyle = config.qrStyle || 'classic'
        frameOverlay = config.qrFrame || 'none'
      } catch (e) {
        finalFgColor = qr.custom_color
      }
    } else {
      finalFgColor = qr.custom_color
    }
  }

  const qrRef = useRef<HTMLDivElement>(null)
  const qrUrl = mounted ? `${window.location.origin}/qr/${qr.slug}` : ''

  // Canvas composite drawing for gradient overlays
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!qrRef.current) return
      const canvas = qrRef.current.querySelector('canvas')
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const width = canvas.width
      const height = canvas.height
      
      if (isGrad && gradEndColor) {
        ctx.globalCompositeOperation = 'source-in'
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, finalFgColor)
        gradient.addColorStop(1, gradEndColor)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = 'source-over'
      }
    }, 80)
    
    return () => clearTimeout(timer)
  }, [mounted, data, finalFgColor, isGrad, gradEndColor])

  const handleCopyCode = async () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ])
            alert('QR code copied to clipboard!')
          }
        })
      }
    } catch (err) {
      alert('Failed to copy QR code')
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{qr.title}</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Scan History */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-5 rounded-2xl">
                <div className="text-foreground/60 text-xs mb-2 truncate">Total Scans</div>
                <div className="text-3xl font-extrabold text-primary">{data.total_scans}</div>
              </div>
              <div className="glass p-5 rounded-2xl">
                <div className="text-foreground/60 text-xs mb-2 truncate">Unique IPs</div>
                <div className="text-3xl font-extrabold">{uniqueIps}</div>
              </div>
              <div className="glass p-5 rounded-2xl">
                <div className="text-foreground/60 text-xs mb-2 truncate">Countries</div>
                <div className="text-3xl font-extrabold">{uniqueCountries}</div>
              </div>
            </div>

            {/* QR Link Card */}
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold">Redirect Link</h2>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 h-8 text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText(qrUrl)
                    alert('URL copied!')
                  }}
                >
                  <Link2 className="w-3.5 h-3.5 mr-1.5" />
                  Copy URL
                </Button>
              </div>
              <div className="text-sm text-foreground/75 break-all font-mono">
                {qrUrl}
              </div>
            </div>
          </div>

          {/* Right Column: QR Code Preview */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl flex flex-col items-center">
              <h2 className="text-base font-semibold mb-4 w-full text-left border-b border-white/5 pb-2">QR Code Preview</h2>
              
              <div 
                ref={qrRef}
                className="p-6 bg-white rounded-2xl mb-4 border relative flex items-center justify-center"
                style={{ 
                  backgroundColor: qr.background_color || '#FFFFFF',
                  borderColor: frameOverlay === 'brackets' ? 'rgba(234, 88, 12, 0.25)' : 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Brackets corners */}
                {frameOverlay === 'brackets' && (
                  <>
                    <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#ea580c]" />
                    <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#ea580c]" />
                    <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#ea580c]" />
                    <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#ea580c]" />
                  </>
                )}

                {/* Scan laser line */}
                {frameOverlay === 'laser' && (
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent shadow-md shadow-orange-500/50 animate-scanning z-10" />
                )}

                {qrUrl && (
                  <div className={dotStyle === 'rounded' ? 'qr-style-rounded' : ''} style={{ display: 'flex' }}>
                    <QRCodeCanvas
                      value={qrUrl}
                      size={150} // Adjusted size to fit within frame borders cleanly
                      fgColor={finalFgColor}
                      bgColor={qr.background_color || '#FFFFFF'}
                      level={qr.error_level as any || 'M'}
                      includeMargin={true}
                    />
                  </div>
                )}
              </div>
              
              {/* Style override tags for rounded pixels rendering */}
              <style>{`
                .qr-style-rounded canvas {
                  filter: blur(1.5px) contrast(8);
                }
              `}</style>
              
              <div className="w-full space-y-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    onClick={() => downloadQRCode(qrRef, 'png', `smartqr-${qr.slug}`)}
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    PNG
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/10 hover:bg-white/5"
                    onClick={() => downloadQRCode(qrRef, 'svg', `smartqr-${qr.slug}`)}
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    SVG
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/10 hover:bg-white/5"
                  onClick={handleCopyCode}
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy Image
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold">Scan History</h2>
            <p className="text-sm text-foreground/60 mt-1">
              {analytics.length} scan{analytics.length !== 1 ? 's' : ''} recorded
            </p>
          </div>

          {analytics.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-foreground/60">No scans recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground/70">
                      Device
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.slice(0, 50).map((record, idx) => (
                    <tr
                      key={record.id}
                      className={idx !== analytics.length - 1 ? 'border-b border-white/5' : ''}
                    >
                      <td className="px-6 py-4 text-sm text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-foreground/50" />
                          {mounted ? new Date(record.scanned_at).toLocaleString() : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-foreground/50" />
                          {record.city && record.country
                            ? `${record.city}, ${record.country}`
                            : record.country || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70 font-mono">
                        {record.ip_address || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70">
                        {record.user_agent
                          ? record.user_agent.substring(0, 50) + '...'
                          : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {analytics.length > 50 && (
                <div className="px-6 py-4 border-t border-white/10 text-center text-sm text-foreground/60">
                  Showing 50 most recent scans of {analytics.length} total
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
