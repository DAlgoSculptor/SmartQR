'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Globe, Clock, Link2 } from 'lucide-react'
import Link from 'next/link'

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
  referrer?: string
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl">
            <div className="text-foreground/60 text-sm mb-2">Total Scans</div>
            <div className="text-4xl font-bold text-primary">{data.total_scans}</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-foreground/60 text-sm mb-2">Unique IPs</div>
            <div className="text-4xl font-bold">{uniqueIps}</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-foreground/60 text-sm mb-2">Countries</div>
            <div className="text-4xl font-bold">{uniqueCountries}</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-foreground/60 text-sm mb-2">QR Type</div>
            <div className="text-lg font-bold capitalize">{qr.qr_type}</div>
          </div>
        </div>

        {/* QR URL */}
        <div className="glass p-6 rounded-2xl mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">QR Code URL</h2>
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 hover:bg-white/5"
              onClick={() => {
                const url = `${window.location.origin}/qr/${qr.slug}`
                navigator.clipboard.writeText(url)
                alert('URL copied!')
              }}
            >
              <Link2 className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="text-sm text-foreground/70 break-all font-mono">
            {window.location.origin}/qr/{qr.slug}
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
                          {new Date(record.scanned_at).toLocaleString()}
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
