import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
    <main className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main card */}
      <div className="w-full max-w-4xl glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">
        {/* Left pane: File details & Download */}
        <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div className="space-y-6">
            {/* Platform Brand */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                Q
              </div>
              <span className="font-bold text-sm tracking-wide">SmartQR Share</span>
            </div>

            <hr className="border-white/10" />

            {/* Document Info */}
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight break-words text-balance">
                  {fileData.fileName}
                </h1>
                <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wider font-semibold">
                  {fileData.fileType.split('/')[1] || 'Document'} File
                </p>
              </div>
            </div>

            {/* Metadata Badges */}
            <div className="space-y-3 pt-2 text-sm text-foreground/70">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-foreground/40" />
                <span>Uploaded {new Date(qrCode.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileDown className="w-4 h-4 text-foreground/40" />
                <span>File Size: {formattedSize} MB</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-8 space-y-3">
            <a href={fileData.fileUrl} download={fileData.fileName} className="block w-full">
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-base font-semibold group rounded-xl shadow-lg shadow-primary/25 relative overflow-hidden transition-all duration-300">
                <Download className="w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform duration-300" />
                Download File
              </Button>
            </a>
            <p className="text-[10px] text-center text-foreground/40">
              Scanned securely via SmartQR platform
            </p>
          </div>
        </div>

        {/* Right pane: Preview (PDF or Image) */}
        <div className="w-full md:w-3/5 bg-black/40 flex flex-col items-center justify-center p-6 md:p-8 min-h-[300px] md:min-h-0">
          {isPdf ? (
            <div className="w-full h-full min-h-[400px] md:min-h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-inner bg-card flex flex-col">
              <iframe
                src={`${fileData.fileUrl}#toolbar=0`}
                className="w-full flex-1 border-0 rounded-xl"
                title={fileData.fileName}
              />
            </div>
          ) : isImage ? (
            <div className="w-full h-full max-h-[500px] flex items-center justify-center overflow-hidden rounded-xl border border-white/10 shadow-lg relative group bg-zinc-950">
              <img
                src={fileData.fileUrl}
                alt={fileData.fileName}
                className="max-w-full max-h-full object-contain rounded-xl transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="text-center p-8 space-y-4">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto text-foreground/40">
                <FileText className="w-10 h-10 animate-pulse" />
              </div>
              <div className="max-w-xs space-y-2">
                <p className="text-base font-semibold">No preview available</p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  This file format ({fileData.fileType.split('/')[1]?.toUpperCase() || 'unknown'}) cannot be previewed in the browser. Please download the file to view its contents.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
