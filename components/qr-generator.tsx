'use client'

import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Copy, Share2, Cloud } from 'lucide-react'
import QRInput from '@/components/qr-input'
import QRCustomizer from '@/components/qr-customizer'
import { downloadQRCode } from '@/lib/qr-utils'
import { createClient } from '@/lib/supabase/client'

interface Props {
  toolType: string
  onBack: () => void
}

export default function QRGenerator({ toolType, onBack }: Props) {
  const [qrValue, setQrValue] = useState('')
  const [qrSize, setQrSize] = useState(300)
  const [fgColor, setFgColor] = useState('#6589c5')
  const [bgColor, setBgColor] = useState('#080808')
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'H' | 'Q'>('H')
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    downloadQRCode(qrRef, format, `smartqr-${toolType}`)
  }

  const handleCopy = async () => {
    try {
      const canvas = document.querySelector('canvas')
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

  const handleSaveToCloud = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/auth/login'
      return
    }

    setSaving(true)
    try {
      const title = prompt('Give your QR code a name:')
      if (!title) {
        setSaving(false)
        return
      }

      let finalQrData: any = { value: qrValue }
      if (['file', 'social', 'menu'].includes(toolType) && qrValue) {
        try {
          finalQrData = JSON.parse(qrValue)
        } catch (e) {
          console.error('Failed to parse qrValue JSON:', e)
        }
      }

      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          qr_type: toolType,
          qr_data: finalQrData,
          destination_url: '', // Let the server compute the correct dynamic viewing link
          custom_color: fgColor,
          background_color: bgColor,
          size: qrSize,
          error_level: errorLevel,
        }),
      })

      if (!response.ok) throw new Error('Failed to save QR code')

      const savedQR = await response.json()
      alert(`QR code saved successfully!`)
      window.location.href = '/dashboard'
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save QR code')
    } finally {
      setSaving(false)
    }
  }

  const isValidQR = qrValue.trim().length > 0

  let qrCanvasValue = qrValue
  if (['file', 'social', 'menu'].includes(toolType) && qrValue) {
    try {
      const parsed = JSON.parse(qrValue)
      if (toolType === 'file') {
        // Encode direct upload URL in static preview
        qrCanvasValue = parsed.fileUrl ? `${window.location.origin}${parsed.fileUrl}` : ''
      } else {
        qrCanvasValue = `${window.location.origin}/preview?type=${toolType}`
      }
    } catch (e) {
      // fallback
    }
  }

  const isValidCanvasValue = qrCanvasValue.trim().length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selection
          </Button>
          <h1 className="text-4xl font-bold capitalize">{toolType === 'file' ? 'File / Resume' : toolType} QR Code</h1>
          <p className="text-foreground/60 mt-2">Fill in your details and customize your QR code</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left side - Input & Customization */}
        <div className="lg:col-span-2 space-y-8">
          {/* Input section */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">Your Information</h2>
            <QRInput
              toolType={toolType}
              onValueChange={setQrValue}
            />
          </div>

          {/* Customization section */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">Customize Appearance</h2>
            <QRCustomizer
              fgColor={fgColor}
              bgColor={bgColor}
              onFgColorChange={setFgColor}
              onBgColorChange={setBgColor}
              qrSize={qrSize}
              onSizeChange={setQrSize}
              errorLevel={errorLevel}
              onErrorLevelChange={setErrorLevel}
              logoUrl={logoUrl}
              onLogoUrlChange={setLogoUrl}
            />
          </div>
        </div>

        {/* Right side - Preview & Actions */}
        <div className="space-y-6 h-fit sticky top-24">
          {/* Preview */}
          <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6">Preview</h3>
            <div
              ref={qrRef}
              className="p-4 bg-white rounded-lg animate-fade-in"
              style={{ backgroundColor: bgColor }}
            >
              {isValidCanvasValue && (
                <QRCodeCanvas
                  value={qrCanvasValue}
                  size={qrSize}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={errorLevel}
                  includeMargin={true}
                />
              )}
            </div>
            {!isValidCanvasValue && (
              <p className="text-foreground/50 text-sm text-center">
                Fill in your information to generate QR code
              </p>
            )}
          </div>

          {/* Save to Cloud */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <h3 className="text-lg font-semibold">Save & Track</h3>
            <Button
              onClick={handleSaveToCloud}
              disabled={!isValidQR || saving}
              className="w-full bg-gradient-primary hover:opacity-90 text-white"
            >
              <Cloud className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save to Cloud'}
            </Button>
            <p className="text-xs text-foreground/60">
              Save your QR code to track scans and manage your codes
            </p>
          </div>

          {/* Action buttons */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <h3 className="text-lg font-semibold">Export</h3>
            <div className="space-y-2">
              <Button
                onClick={() => handleDownload('png')}
                disabled={!isValidQR}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={() => handleDownload('svg')}
                disabled={!isValidQR}
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download SVG
              </Button>
              <Button
                onClick={() => handleDownload('pdf')}
                disabled={!isValidQR}
                className="w-full border-white/20 hover:bg-white/10"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="glass p-6 rounded-2xl space-y-3">
            <h3 className="text-lg font-semibold">Share</h3>
            <div className="space-y-2">
              <Button
                onClick={handleCopy}
                disabled={!isValidQR}
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button
                disabled={!isValidQR}
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
