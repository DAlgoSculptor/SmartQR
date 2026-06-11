'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Copy, Share2, Cloud } from 'lucide-react'
import QRInput from '@/components/qr-input'
import QRCustomizer from '@/components/qr-customizer'
import CustomQR from '@/components/custom-qr'
import AuthModal from '@/components/auth-modal'
import { downloadQRCode } from '@/lib/qr-utils'
import { createClient } from '@/lib/supabase/client'

interface Props {
  toolType: string
  onBack: () => void
}

export default function QRGenerator({ toolType, onBack }: Props) {
  const [qrValue, setQrValue] = useState('')
  const [qrSize, setQrSize] = useState(300)
  const [fgColor, setFgColor] = useState('#ea580c') // Branded default copper color
  const [bgColor, setBgColor] = useState('#080808')
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'H' | 'Q'>('H')
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [qrStyle, setQrStyle] = useState<'classic' | 'rounded' | 'dots' | 'diamonds' | 'stars' | 'hearts'>('classic')
  const [qrFrame, setQrFrame] = useState<'none' | 'brackets' | 'laser' | 'card' | 'bubble'>('none')
  const [isGradient, setIsGradient] = useState(false)
  const [gradientEndColor, setGradientEndColor] = useState('#fb923c')
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  
  // Advanced styling states matching Starbucks / Schlossweine image
  const [eyeStyleOuter, setEyeStyleOuter] = useState<'classic' | 'rounded' | 'circle'>('classic')
  const [eyeStyleInner, setEyeStyleInner] = useState<'classic' | 'rounded' | 'circle'>('classic')
  const [eyeColorTL, setEyeColorTL] = useState('')
  const [eyeColorTR, setEyeColorTR] = useState('')
  const [eyeColorBL, setEyeColorBL] = useState('')
  const [useCustomEyeColors, setUseCustomEyeColors] = useState(false)
  const [logoBgShield, setLogoBgShield] = useState<'none' | 'circle' | 'rectangle'>('circle')
  const [logoSize, setLogoSize] = useState(44)
  const [frameText, setFrameText] = useState('SCAN ME')

  // Marketing tracking pixels
  const [metaPixelId, setMetaPixelId] = useState('')
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('')
  const [tiktokPixelId, setTiktokPixelId] = useState('')
  const [linkedinPixelId, setLinkedinPixelId] = useState('')

  const qrRef = useRef<HTMLDivElement>(null)

  // Auth & Free usage states
  const [user, setUser] = useState<any>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<((u: any) => void) | null>(null)
  const [authModalActionName, setAuthModalActionName] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [])

  const handleAuthSuccess = (newUser: any) => {
    setUser(newUser)
    if (pendingAction) {
      pendingAction(newUser)
      setPendingAction(null)
    }
  }

  const checkAuthOrUsage = (actionName: string, actionCallback: (u?: any) => void) => {
    if (user) {
      actionCallback(user)
      return
    }

    const countStr = localStorage.getItem('smartqr_free_uses_count')
    const count = countStr ? parseInt(countStr, 10) : 0

    if (count >= 3) {
      // Reached free download limit (3 files/copies)
      setPendingAction(() => actionCallback)
      setAuthModalActionName(actionName)
      setIsAuthModalOpen(true)
    } else {
      // Still under limits, increment and perform action
      localStorage.setItem('smartqr_free_uses_count', (count + 1).toString())
      actionCallback()
    }
  }

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    checkAuthOrUsage('Download', () => {
      downloadQRCode(qrRef, format, `smartqr-${toolType}`)
    })
  }

  const handleCopy = () => {
    checkAuthOrUsage('Copy to Clipboard', async () => {
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
    })
  }

  const handleShare = () => {
    checkAuthOrUsage('Share', async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'SmartQR Code',
            text: 'Check out this QR code generated with SmartQR',
            url: window.location.origin,
          })
        } else {
          await navigator.clipboard.writeText(window.location.origin)
          alert('Site link copied to clipboard!')
        }
      } catch (err) {
        console.error(err)
      }
    })
  }

  const handleSaveToCloud = async (authenticatedUser: any) => {
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
          custom_color: JSON.stringify({
            color: fgColor,
            isGradient,
            gradientEndColor,
            gradientType,
            qrStyle,
            qrFrame,
            eyeStyleOuter,
            eyeStyleInner,
            eyeColorTL: useCustomEyeColors ? eyeColorTL : '',
            eyeColorTR: useCustomEyeColors ? eyeColorTR : '',
            eyeColorBL: useCustomEyeColors ? eyeColorBL : '',
            useCustomEyeColors,
            logoBgShield,
            logoSize,
            frameText,
            metaPixelId,
            googleAnalyticsId,
            tiktokPixelId,
            linkedinPixelId,
          }),
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

  const triggerSave = () => {
    if (user) {
      handleSaveToCloud(user)
    } else {
      setPendingAction(() => (u: any) => handleSaveToCloud(u))
      setAuthModalActionName('Save to Cloud')
      setIsAuthModalOpen(true)
    }
  }

  const isValidQR = qrValue.trim().length > 0

  let qrCanvasValue = qrValue
  if (['file', 'social', 'menu'].includes(toolType) && qrValue) {
    try {
      const parsed = JSON.parse(qrValue)
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      if (toolType === 'file') {
        const fileUrl = parsed.fileUrl || ''
        if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
          qrCanvasValue = fileUrl
        } else {
          qrCanvasValue = fileUrl ? `${origin}${fileUrl}` : ''
        }
      } else if (toolType === 'social') {
        const firstLink = parsed.links && parsed.links[0]?.url
        if (firstLink) {
          qrCanvasValue = firstLink.startsWith('http') ? firstLink : `https://${firstLink}`
        } else {
          qrCanvasValue = origin
        }
      } else if (toolType === 'menu') {
        qrCanvasValue = origin
      }
    } catch (e) {
      // fallback
    }
  }

  const isValidCanvasValue = qrCanvasValue.trim().length > 0

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4 text-xs font-bold text-foreground/50 hover:text-white hover:bg-white/[0.03] rounded-xl px-3 py-1.5 transition-all duration-300 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to Selection
          </Button>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] capitalize">
            {toolType === 'file' ? 'File / Resume' : toolType === 'vcard' ? 'vCard' : toolType === 'sms' ? 'SMS' : toolType === 'wifi' ? 'WiFi' : toolType === 'url' ? 'URL' : toolType}{' '}
            <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">QR Code</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/50 mt-2 font-medium">Fill in your details and customize your QR code</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left side - Input & Customization */}
        <div className="lg:col-span-2 space-y-8">
          {/* Input section */}
          <div className="glass p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300">
            <h2 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-6">Your Information</h2>
            <QRInput
              toolType={toolType}
              onValueChange={setQrValue}
            />
          </div>

          {/* Customization section */}
          <div className="glass p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300">
            <h2 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-6">Customize Appearance</h2>
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
              qrStyle={qrStyle}
              onQrStyleChange={setQrStyle}
              qrFrame={qrFrame}
              onQrFrameChange={setQrFrame}
              isGradient={isGradient}
              onIsGradientChange={setIsGradient}
              gradientEndColor={gradientEndColor}
              onGradientEndColorChange={setGradientEndColor}
              gradientType={gradientType}
              onGradientTypeChange={setGradientType}
              eyeStyleOuter={eyeStyleOuter}
              onEyeStyleOuterChange={setEyeStyleOuter}
              eyeStyleInner={eyeStyleInner}
              onEyeStyleInnerChange={setEyeStyleInner}
              eyeColorTL={eyeColorTL}
              onEyeColorTLChange={setEyeColorTL}
              eyeColorTR={eyeColorTR}
              onEyeColorTRChange={setEyeColorTR}
              eyeColorBL={eyeColorBL}
              onEyeColorBLChange={setEyeColorBL}
              useCustomEyeColors={useCustomEyeColors}
              onUseCustomEyeColorsChange={setUseCustomEyeColors}
              logoBgShield={logoBgShield}
              onLogoBgShieldChange={setLogoBgShield}
              logoSize={logoSize}
              onLogoSizeChange={setLogoSize}
              frameText={frameText}
              onFrameTextChange={setFrameText}
              metaPixelId={metaPixelId}
              onMetaPixelIdChange={setMetaPixelId}
              googleAnalyticsId={googleAnalyticsId}
              onGoogleAnalyticsIdChange={setGoogleAnalyticsId}
              tiktokPixelId={tiktokPixelId}
              onTiktokPixelIdChange={setTiktokPixelId}
              linkedinPixelId={linkedinPixelId}
              onLinkedinPixelIdChange={setLinkedinPixelId}
            />
          </div>
        </div>

        {/* Right side - Preview & Actions */}
        <div className="space-y-6 h-fit sticky top-24">
          {/* Preview */}
          <div className="glass p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-6">Preview</h3>
            
            <div
              ref={qrRef}
              className="relative flex items-center justify-center p-2 rounded-2xl bg-[#080808]/20 border border-white/5"
            >
              {isValidCanvasValue && (
                <>
                  <CustomQR
                    value={qrCanvasValue}
                    size={280}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    isGradient={isGradient}
                    gradientEndColor={gradientEndColor}
                    gradientType={gradientType}
                    qrStyle={qrStyle}
                    eyeStyleOuter={eyeStyleOuter}
                    eyeStyleInner={eyeStyleInner}
                    eyeColorTL={useCustomEyeColors ? eyeColorTL : ''}
                    eyeColorTR={useCustomEyeColors ? eyeColorTR : ''}
                    eyeColorBL={useCustomEyeColors ? eyeColorBL : ''}
                    qrFrame={qrFrame}
                    frameText={frameText}
                    logoUrl={logoUrl}
                    logoSize={logoSize}
                    logoBgShield={logoBgShield}
                    errorLevel={errorLevel}
                  />

                  {/* Browser Live Scanning overlay for laser effect */}
                  {qrFrame === 'laser' && (
                    <div 
                      className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent shadow-md shadow-orange-500/50 animate-scanning z-10 pointer-events-none"
                      style={{
                        left: '12px',
                        right: '12px',
                        width: 'calc(100% - 24px)',
                      }}
                    />
                  )}
                </>
              )}
            </div>

            {!isValidCanvasValue && (
              <p className="text-foreground/40 text-xs text-center leading-relaxed mt-4 max-w-xs font-medium">
                Fill in your information to generate a live QR code preview
              </p>
            )}
          </div>

          {/* Save to Cloud */}
          <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 space-y-4">
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Save & Track</h3>
            <Button
              onClick={triggerSave}
              disabled={!isValidQR || saving}
              className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90 text-white text-xs font-bold rounded-xl py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <Cloud className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save to Cloud'}
            </Button>
            <p className="text-[11px] text-foreground/40 leading-relaxed font-medium">
              Save your QR code dynamically to track statistics, monitor total scans, and customize destinations later.
            </p>
          </div>

          {/* Action buttons */}
          <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 space-y-4">
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Export</h3>
            <div className="space-y-2.5">
              <Button
                onClick={() => handleDownload('png')}
                disabled={!isValidQR}
                className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90 text-white text-xs font-bold rounded-xl py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={() => handleDownload('svg')}
                disabled={!isValidQR}
                className="w-full border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/35 text-orange-400 text-xs font-bold rounded-xl py-3.5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download SVG
              </Button>
              <Button
                onClick={() => handleDownload('pdf')}
                disabled={!isValidQR}
                className="w-full border border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 text-white text-xs font-bold rounded-xl py-3.5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="glass p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-orange-500/10 transition-all duration-300 space-y-4">
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Share</h3>
            <div className="space-y-2.5">
              <Button
                onClick={handleCopy}
                disabled={!isValidQR}
                variant="outline"
                className="w-full border border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 text-white text-xs font-bold rounded-xl py-3.5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button
                onClick={handleShare}
                disabled={!isValidQR}
                variant="outline"
                className="w-full border border-white/10 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/20 text-white text-xs font-bold rounded-xl py-3.5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false)
          setPendingAction(null)
        }}
        onSuccess={handleAuthSuccess}
        actionName={authModalActionName}
      />
    </div>
  )
}
