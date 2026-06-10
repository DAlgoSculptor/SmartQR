import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { FileDown, FileText, ArrowLeft, Calendar, ShieldCheck, Download } from 'lucide-react'

interface QRData {
  type: string
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
}

async function getQRCode(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching public QR code:', error)
      return { qrCode: null, error: error.message }
    }
    return { qrCode: data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching QR code:', err)
    return { qrCode: null, error: 'Database fetch failed' }
  }
}

export default async function FileViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { qrCode, error } = await getQRCode(slug)

  if (error && error.includes('Row-level security policy')) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground">
        <div className="glass p-8 rounded-2xl max-w-lg text-center space-y-6 border border-red-500/20">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Database RLS Policy Required</h1>
          <p className="text-foreground/70 text-sm leading-relaxed">
            The platform is trying to fetch this QR code, but Supabase Row-Level Security (RLS) is blocking public access.
          </p>
          <div className="bg-black/50 p-4 rounded-xl text-left border border-white/5 font-mono text-xs overflow-x-auto">
            <p className="text-green-400 font-semibold mb-1">-- Run this in your Supabase SQL Editor:</p>
            <code>
              CREATE POLICY "Allow public select of QR codes by slug"<br />
              &nbsp;&nbsp;ON public.qr_codes FOR SELECT USING (true);
            </code>
          </div>
          <p className="text-xs text-foreground/50">
            Once this policy is created, refresh this page to view your file.
          </p>
        </div>
      </main>
    )
  }

  if (!qrCode) {
    notFound()
  }

  let fileData: QRData
  try {
    fileData = typeof qrCode.qr_data === 'string'
      ? JSON.parse(qrCode.qr_data)
      : qrCode.qr_data
  } catch (e) {
    console.error('Failed to parse qr_data', e)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <p className="text-foreground/70">Invalid QR code content.</p>
      </main>
    )
  }

  const isPdf = fileData.fileType?.includes('pdf')
  const isImage = fileData.fileType?.includes('image')
  const formattedSize = (fileData.fileSize / 1024 / 1024).toFixed(2)

  return (
    <main className="min-h-screen bg-[#080808] text-foreground flex flex-col relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Premium Top Navigation Bar */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg shadow-primary/20">
            Q
          </div>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-bold truncate pr-4 text-balance">
              {fileData.fileName}
            </h1>
            <p className="text-[10px] md:text-xs text-foreground/50 font-medium tracking-wide">
              {formattedSize} MB • {fileData.fileType.split('/')[1]?.toUpperCase() || 'FILE'} • Scanned via SmartQR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a href={fileData.fileUrl} download={fileData.fileName}>
            <button className="flex items-center justify-center bg-gradient-primary hover:opacity-90 active:scale-95 text-white px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-primary/25 transition-all duration-300">
              <Download className="w-4 h-4 mr-2" />
              Download File
            </button>
          </a>
        </div>
      </header>

      {/* Main Content Reader Workspace */}
      <div className="flex-1 p-4 md:p-6 flex items-center justify-center w-full max-w-5xl mx-auto h-[calc(100vh-73px)]">
        {isPdf ? (
          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/40 relative">
            <iframe
              src={`${fileData.fileUrl}#toolbar=1`}
              className="w-full h-full border-0 rounded-2xl"
              title={fileData.fileName}
            />
          </div>
        ) : isImage ? (
          <div className="w-full h-full max-h-[70vh] md:max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative group bg-zinc-950 p-2">
            <img
              src={fileData.fileUrl}
              alt={fileData.fileName}
              className="max-w-full max-h-full object-contain rounded-xl transition duration-500 group-hover:scale-[1.01]"
            />
          </div>
        ) : (
          <div className="glass p-10 rounded-3xl border border-white/10 text-center max-w-md w-full space-y-6 shadow-2xl">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto text-foreground/40">
              <FileText className="w-10 h-10 animate-pulse text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">No preview available</h2>
              <p className="text-sm text-foreground/60 leading-relaxed">
                This file format ({fileData.fileType.split('/')[1]?.toUpperCase() || 'unknown'}) cannot be previewed directly in the browser.
              </p>
            </div>
            <a href={fileData.fileUrl} download={fileData.fileName} className="block w-full pt-4">
              <button className="w-full bg-gradient-primary hover:opacity-90 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-primary/25 transition-all">
                <Download className="w-4 h-4 inline mr-2" />
                Download to View
              </button>
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
