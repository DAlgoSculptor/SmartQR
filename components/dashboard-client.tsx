'use client'

import { useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { 
  LogOut, 
  BarChart3, 
  Eye, 
  Copy, 
  Trash2, 
  Link2, 
  Plus, 
  Search, 
  QrCode, 
  FileUp, 
  Share2, 
  Utensils, 
  User as UserIcon, 
  Wifi, 
  Mail, 
  MessageSquare,
  TrendingUp,
  Inbox
} from 'lucide-react'
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

export default function DashboardClient({ user }: { user: SupabaseUser }) {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

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

  // Calculate statistics
  const totalQRs = qrCodes.length
  const totalScans = qrCodes.reduce((acc, qr) => acc + (qr.scan_count || 0), 0)
  const topQRCode = qrCodes.length > 0 
    ? [...qrCodes].sort((a, b) => (b.scan_count || 0) - (a.scan_count || 0))[0] 
    : null

  // Get QR Icon based on type (harmonized copper/amber editorial range)
  const getQrIcon = (type: string) => {
    const iconClass = "w-5 h-5"
    switch (type) {
      case 'file': return <FileUp className={`${iconClass} text-orange-400`} />
      case 'social': return <Share2 className={`${iconClass} text-amber-400`} />
      case 'menu': return <Utensils className={`${iconClass} text-yellow-500`} />
      case 'url': return <Link2 className={`${iconClass} text-orange-300`} />
      case 'vcard': return <UserIcon className={`${iconClass} text-amber-500`} />
      case 'wifi': return <Wifi className={`${iconClass} text-orange-400`} />
      case 'email': return <Mail className={`${iconClass} text-amber-400`} />
      case 'sms': return <MessageSquare className={`${iconClass} text-orange-500`} />
      default: return <QrCode className={`${iconClass} text-foreground/50`} />
    }
  }

  // Filter QR Codes
  const filteredQRCodes = qrCodes.filter((qr) => {
    const matchesSearch = qr.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || qr.qr_type === filterType
    return matchesSearch && matchesFilter
  })

  // List of unique types for tabs
  const qrTypes = ['all', 'file', 'social', 'menu', 'url', 'vcard', 'wifi', 'email']

  return (
    <main className="min-h-screen bg-[#040508] text-foreground relative overflow-hidden pb-16 flex flex-col justify-between">
      {/* Background grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />
      {/* Ambient Glow Decorations */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[300px] bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[300px] bg-orange-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

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
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-semibold text-foreground/80">{user.email}</span>
                <span className="text-[10px] text-[#ea580c] font-bold tracking-wide uppercase">Developer Tier</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Contents */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 flex-1 w-full">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">Dashboard</h2>
              <p className="text-xs sm:text-sm text-foreground/50 mt-2 font-medium">Manage, view analytics, and organize your smart dynamic QR codes.</p>
            </div>
            <Link href="/generator" className="shrink-0">
              <Button className="bg-[#ea580c] hover:bg-[#ea580c]/90 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/10 px-5 py-5 transition-all duration-300 flex items-center gap-1.5 active:scale-95 cursor-pointer">
                <Plus className="w-4 h-4" />
                Generate New QR Code
              </Button>
            </Link>
          </div>

          {/* Analytics Overview Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Total QRs */}
            <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 flex items-center justify-between shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/5 rounded-full blur-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Total Active QRs</p>
                <p className="text-3xl font-black text-white font-mono leading-none pt-1">{totalQRs}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                <QrCode className="w-5 h-5 animate-pulse-slow" />
              </div>
            </div>

            {/* Card 2: Total Scans */}
            <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 flex items-center justify-between shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/5 rounded-full blur-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Total Combined Scans</p>
                <p className="text-3xl font-black text-[#ea580c] font-mono leading-none pt-1">{totalScans}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#ea580c] shrink-0">
                <BarChart3 className="w-5 h-5 animate-pulse-slow" />
              </div>
            </div>

            {/* Card 3: Top Performing */}
            <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 flex items-center justify-between shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/5 rounded-full blur-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-1 min-w-0">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Top Performer</p>
                <p className="text-base font-black text-white truncate pr-2 pt-1 leading-none">
                  {topQRCode ? topQRCode.title : 'None'}
                </p>
                <p className="text-[10px] text-foreground/40 font-semibold mt-1">
                  {topQRCode ? `${topQRCode.scan_count} scans • ${topQRCode.qr_type.toUpperCase()}` : 'No scan records'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/5 border border-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500 text-xs shadow-md font-medium text-center">
              {error}
            </div>
          )}

          {/* Filters and Search Workspace */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md shrink-0">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.01] hover:bg-white/[0.03] focus:bg-black/30 border border-white/5 focus:border-orange-500/40 focus:ring-[3px] focus:ring-orange-500/20 rounded-xl text-xs focus:outline-none transition-all duration-300 h-10 text-white placeholder-foreground/25 font-medium"
                />
              </div>

              {/* Type Tabs Slider */}
              <div className="flex gap-2 overflow-x-auto w-full pb-1 md:pb-0 md:justify-end no-scrollbar">
                {qrTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 shrink-0 active:scale-95 cursor-pointer ${
                      filterType === type
                        ? 'bg-[#ea580c] text-white shadow-md shadow-orange-500/15'
                        : 'bg-white/[0.01] hover:bg-white/[0.04] text-foreground/50 border border-white/5 hover:text-white'
                    }`}
                  >
                    {type === 'all' ? 'All' : type === 'vcard' ? 'vCard' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* QR Codes Grid */}
            {loading ? (
              <div className="text-center py-24">
                <p className="text-foreground/40 text-xs font-medium animate-pulse">Retrieving your codes...</p>
              </div>
            ) : filteredQRCodes.length === 0 ? (
              <div className="text-center py-20 glass rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-foreground/30">
                  <Inbox className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">No matching QR codes found</p>
                  <p className="text-xs text-foreground/40 max-w-xs mx-auto font-medium leading-relaxed">
                    {searchTerm || filterType !== 'all' 
                      ? 'Try adjusting your search criteria or type filters.' 
                      : 'Generate your first dynamic QR code to start tracking insights.'}
                  </p>
                </div>
                {!searchTerm && filterType === 'all' && (
                  <Link href="/generator" className="pt-2">
                    <Button className="bg-[#ea580c] hover:bg-[#ea580c]/90 text-white font-bold text-xs rounded-xl px-4 py-2">
                      Generate QR
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredQRCodes.map((qr) => (
                  <div
                    key={qr.id}
                    className="glass p-6 border border-white/5 bg-white/[0.01] hover:border-orange-500/15 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 group rounded-3xl flex flex-col justify-between hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    {/* Glowing background card element */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none -z-10" />
                    <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        {/* Left: icon + title */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                            {getQrIcon(qr.qr_type)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-base text-white truncate pr-1 group-hover:text-orange-400 transition-colors">
                              {qr.title}
                            </h3>
                            <p className="text-[10px] text-foreground/40 font-bold tracking-wider uppercase mt-0.5">
                              {qr.qr_type === 'vcard' ? 'vCard' : qr.qr_type} QR
                            </p>
                          </div>
                        </div>

                        {/* Right: scan count badge */}
                        <div className="text-right shrink-0">
                          <span className="text-2xl font-black text-white leading-none block font-mono">
                            {qr.scan_count || 0}
                          </span>
                          <span className="text-[9px] text-foreground/30 uppercase font-bold tracking-widest leading-none mt-0.5 block">
                            scans
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-foreground/40 font-medium mb-6 mt-2">
                        Created on{' '}
                        {new Date(qr.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    {/* Actions Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <Link href={`/qr/${qr.slug}`} className="w-full">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 text-white text-xs h-9 rounded-xl flex items-center justify-center font-bold transition-all duration-300 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/qr/${qr.id}`} className="w-full">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 text-orange-400 hover:text-orange-300 text-xs h-9 rounded-xl flex items-center justify-center font-bold transition-all duration-300 cursor-pointer"
                        >
                          <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
                          Analytics
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 text-white text-xs h-9 rounded-xl flex items-center justify-center font-bold transition-all duration-300 cursor-pointer col-span-1"
                        onClick={() => {
                          const url = `${window.location.origin}/qr/${qr.slug}`
                          navigator.clipboard.writeText(url)
                          alert('URL copied to clipboard!')
                        }}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        Copy Link
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-red-500/10 hover:border-red-500/30 bg-red-500/[0.01] hover:bg-red-500/10 active:scale-[0.98] text-red-500 hover:text-red-400 text-xs h-9 rounded-xl flex items-center justify-center font-bold transition-all duration-300 cursor-pointer col-span-1"
                        onClick={() => handleDelete(qr.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
