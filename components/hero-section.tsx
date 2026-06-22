'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkle, Download, Copy, Link2, Wifi, User, FileText, Check, Settings, Image as ImageIcon, Smartphone, X } from 'lucide-react'
import CustomQR from '@/components/custom-qr'
import { downloadQRCode } from '@/lib/qr-utils'

type QRType = 'url' | 'wifi' | 'vcard' | 'text'
type PresetColor = 'copper' | 'emerald' | 'royal' | 'rosegold'
type LogoChoice = 'none' | 'github' | 'linkedin' | 'wifi' | 'link' | 'custom'

export default function HeroSection() {
  const [qrType, setQrType] = useState<QRType>('url')
  const [url, setUrl] = useState('https://smartqr.io')
  const [wifiSsid, setWifiSsid] = useState('Home_Network')
  const [wifiPass, setWifiPass] = useState('password123')
  const [vcardName, setVcardName] = useState('John Doe')
  const [vcardPhone, setVcardPhone] = useState('+1 234 567 890')
  const [vcardEmail, setVcardEmail] = useState('john@smartqr.io')
  const [plainText, setPlainText] = useState('Welcome to SmartQR!')
  
  // Customization States
  const [qrStyle, setQrStyle] = useState<'classic' | 'rounded' | 'dots' | 'diamonds' | 'stars'>('rounded')
  const [qrFrame, setQrFrame] = useState<'none' | 'brackets' | 'laser' | 'card' | 'bubble'>('brackets')
  const [frameText, setFrameText] = useState('SCAN ME')
  const [presetColor, setPresetColor] = useState<PresetColor>('copper')
  
  // Advanced States
  const [logoChoice, setLogoChoice] = useState<LogoChoice>('none')
  const [customLogoUrl, setCustomLogoUrl] = useState('')
  const [eyeStyleOuter, setEyeStyleOuter] = useState<'classic' | 'rounded' | 'circle'>('rounded')
  const [eyeStyleInner, setEyeStyleInner] = useState<'classic' | 'rounded' | 'circle'>('circle')
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  const [eyeColorTL, setEyeColorTL] = useState('')
  const [eyeColorTR, setEyeColorTR] = useState('')
  const [eyeColorBL, setEyeColorBL] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copied, setCopied] = useState(false)

  // Scanner Simulator States
  const [isScanningTest, setIsScanningTest] = useState(false)
  const [scanTestResult, setScanTestResult] = useState<string | null>(null)

  const qrRef = useRef<HTMLDivElement>(null)

  // Map logo selections to actual asset URLs
  const logoMap = {
    none: '',
    github: 'https://img.icons8.com/ios-glyphs/120/ffffff/github.png',
    linkedin: 'https://img.icons8.com/ios-filled/120/ffffff/linkedin.png',
    wifi: 'https://img.icons8.com/ios-filled/120/ffffff/wifi-connection.png',
    link: 'https://img.icons8.com/ios-glyphs/120/ffffff/link.png',
    custom: customLogoUrl,
  }

  // Map preset colors
  const colorMap = {
    copper: {
      fg: '#e26a45',
      bg: '#131110',
      end: '#dfd7c5',
      isGradient: true,
    },
    emerald: {
      fg: '#0f766e',
      bg: '#090d16',
      end: '#a3e635',
      isGradient: true,
    },
    royal: {
      fg: '#1d4ed8',
      bg: '#090d16',
      end: '#60a5fa',
      isGradient: true,
    },
    rosegold: {
      fg: '#be185d',
      bg: '#140c1f',
      end: '#fda4af',
      isGradient: true,
    },
  }

  const selectedColor = colorMap[presetColor]
  const logoUrl = logoMap[logoChoice]

  // Construct QR value
  let qrValue = url
  if (qrType === 'wifi') {
    qrValue = `WIFI:S:${wifiSsid};T:WPA;P:${wifiPass};;`
  } else if (qrType === 'vcard') {
    qrValue = `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`
  } else if (qrType === 'text') {
    qrValue = plainText
  }

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    downloadQRCode(qrRef, format, `smartqr-hero-${qrType}`)
  }

  const handleCopy = async () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ])
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Synthesize scanner success beep using Web Audio API
  const playBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return
      const audioCtx = new AudioContextClass()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime) // High-pitched success beep
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime)
      
      oscillator.start()
      // Clean decay ramp to avoid harsh clicks
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.18)
      oscillator.stop(audioCtx.currentTime + 0.18)
    } catch (e) {
      console.warn('Web Audio beep skipped:', e)
    }
  }

  const triggerCameraScanSimulation = () => {
    setIsScanningTest(true)
    setScanTestResult(null)
    
    // Simulate sweep scanning viewfinder for 1.4s
    setTimeout(() => {
      playBeep()
      setIsScanningTest(false)
      setScanTestResult(qrValue)
    }, 1400)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden bg-background">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />
      
      {/* Glow overlays */}
      <div className="absolute top-1/4 right-1/10 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/10 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headline and inputs */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/40 text-foreground/75 text-[11px] font-medium tracking-wide">
            <Sparkle className="w-3.5 h-3.5 text-primary animate-pulse" />
            Advanced Dynamic QR Studio
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Create QR codes that <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">make an impression</span>.
            </h1>
            <p className="text-sm sm:text-base text-foreground/60 max-w-xl leading-relaxed font-medium">
              Point scans to beautiful PDF presentations, responsive link trees, or digital menus. Customize the dot matrix, background color, and frame borders. Modify target destinations dynamically anytime without re-printing.
            </p>
          </div>

          {/* Type selectors */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['url', 'wifi', 'vcard', 'text'] as QRType[]).map((type) => {
                const isActive = qrType === type
                return (
                  <button
                    key={type}
                    onClick={() => setQrType(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/10'
                        : 'bg-card/40 border border-white/5 text-foreground/50 hover:text-white hover:bg-card/60'
                    }`}
                  >
                    {type === 'url' && <Link2 className="w-3.5 h-3.5" />}
                    {type === 'wifi' && <Wifi className="w-3.5 h-3.5" />}
                    {type === 'vcard' && <User className="w-3.5 h-3.5" />}
                    {type === 'text' && <FileText className="w-3.5 h-3.5" />}
                    <span className="capitalize">{type === 'vcard' ? 'vCard' : type}</span>
                  </button>
                )
              })}
            </div>

            {/* Input card */}
            <div className="max-w-xl bg-card/25 border border-white/5 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
              {qrType === 'url' && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">Website URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                  />
                </div>
              )}

              {qrType === 'wifi' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">WiFi SSID</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      placeholder="My_Network"
                      className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">Password</label>
                    <input
                      type="password"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {qrType === 'vcard' && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">Name</label>
                    <input
                      type="text"
                      value={vcardName}
                      onChange={(e) => setVcardName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">Phone</label>
                    <input
                      type="text"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      placeholder="+1 234..."
                      className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">Email</label>
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {qrType === 'text' && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-foreground/45 tracking-wider">Plain Text</label>
                  <textarea
                    rows={2}
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    placeholder="Enter plain text code data..."
                    className="w-full bg-card/40 border border-white/5 focus:border-primary/50 text-white rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-primary outline-none transition-all font-medium resize-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/generator">
              <Button size="lg" className="bg-gradient-primary hover:opacity-95 text-white px-8 py-6 rounded-xl font-bold shadow-xl shadow-primary/10 flex items-center gap-2 group transition-all duration-300">
                Design Your Code
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 hover:border-white/20 active:scale-95 text-white/90 px-8 py-6 rounded-xl font-bold transition-all duration-200">
                Explore Process
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Customizer Dashboard */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          <div className="w-full max-w-[500px] glass-premium p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-transparent pointer-events-none" />
            
            <div className="space-y-6">
              
              {/* Output Preview & Scan simulation overlays */}
              <div className="flex flex-col items-center justify-center bg-black/30 border border-white/5 rounded-2xl py-8 relative group overflow-hidden">
                <div
                  ref={qrRef}
                  className="relative flex items-center justify-center p-2 rounded-2xl bg-black/45 border border-white/5 z-10"
                >
                  {qrValue && (
                    <>
                      <CustomQR
                        value={qrValue}
                        size={190}
                        fgColor={selectedColor.fg}
                        bgColor={selectedColor.bg}
                        isGradient={selectedColor.isGradient}
                        gradientEndColor={selectedColor.end}
                        gradientType={gradientType}
                        qrStyle={qrStyle}
                        qrFrame={qrFrame}
                        frameText={frameText}
                        logoUrl={logoUrl}
                        logoBgShield="circle"
                        eyeStyleOuter={eyeStyleOuter}
                        eyeStyleInner={eyeStyleInner}
                        eyeColorTL={eyeColorTL}
                        eyeColorTR={eyeColorTR}
                        eyeColorBL={eyeColorBL}
                      />
                      {qrFrame === 'laser' && (
                        <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-lg shadow-primary/50 animate-scanning z-10 pointer-events-none" />
                      )}
                    </>
                  )}

                  {/* Sweep scan viewfinder camera target lines */}
                  {isScanningTest && (
                    <div className="absolute inset-0 bg-primary/10 border-2 border-primary/45 rounded-2xl flex flex-col items-center justify-center z-20 animate-pulse">
                      <div className="absolute w-6 h-6 border-t-2 border-l-2 border-white top-2 left-2" />
                      <div className="absolute w-6 h-6 border-t-2 border-r-2 border-white top-2 right-2" />
                      <div className="absolute w-6 h-6 border-b-2 border-l-2 border-white bottom-2 left-2" />
                      <div className="absolute w-6 h-6 border-b-2 border-r-2 border-white bottom-2 right-2" />
                      <div className="w-full h-0.5 bg-white/70 shadow-lg animate-scanning absolute" />
                      <span className="text-[8px] text-white font-bold tracking-widest uppercase">Capturing QR Matrix...</span>
                    </div>
                  )}
                </div>

                {/* Display Decoded Payload simulation overlay */}
                {scanTestResult && (
                  <div className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-between p-5 z-20 animate-slide-in">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-primary" /> Dynamic scan results
                      </span>
                      <button onClick={() => setScanTestResult(null)} className="text-foreground/45 hover:text-white transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center text-left py-4 space-y-3 font-mono text-[10px]">
                      <div className="flex justify-between text-foreground/45 border-b border-white/5 pb-1">
                        <span>Format Category</span>
                        <span className="text-white font-bold capitalize">{qrType} QR</span>
                      </div>
                      
                      {qrType === 'wifi' && (
                        <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-[9px] text-primary font-bold">WIFI CREDENTIALS DETECTED</div>
                          <div className="text-white">SSID: <span className="text-emerald-400">{wifiSsid}</span></div>
                          <div className="text-white">Password: <span className="text-emerald-400">{wifiPass}</span></div>
                          <div className="text-[8px] text-foreground/45 pt-1">Connection handshake successful.</div>
                        </div>
                      )}

                      {qrType === 'vcard' && (
                        <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-[9px] text-primary font-bold">vCARD CONTACT DETECTED</div>
                          <div className="text-white">Name: <span className="text-emerald-400">{vcardName}</span></div>
                          <div className="text-white">Phone: <span className="text-emerald-400">{vcardPhone}</span></div>
                          <div className="text-white">Email: <span className="text-emerald-400">{vcardEmail}</span></div>
                        </div>
                      )}

                      {qrType === 'url' && (
                        <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-[9px] text-primary font-bold">REDIRECT URL TARGET</div>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 break-all underline hover:text-emerald-300">
                            {url}
                          </a>
                        </div>
                      )}

                      {qrType === 'text' && (
                        <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-[9px] text-primary font-bold">DECODED PLAIN TEXT</div>
                          <p className="text-white leading-relaxed">{plainText}</p>
                        </div>
                      )}
                    </div>

                    <Button onClick={() => setScanTestResult(null)} size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl py-2">
                      Scan Again
                    </Button>
                  </div>
                )}
                
                <div className="text-center mt-4">
                  <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest block">Vector Canvas Output</span>
                  <span className="text-[9px] text-primary font-black uppercase tracking-wider mt-0.5 block">Customized in Real-Time</span>
                </div>
              </div>

              {/* Layout controls */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Dot Style */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider">Dots Shape</label>
                  <select
                    value={qrStyle}
                    onChange={(e) => setQrStyle(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/5 text-foreground/75 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                  >
                    <option value="classic">Classic Square</option>
                    <option value="rounded">Rounded Edge</option>
                    <option value="dots">Circular Dots</option>
                    <option value="diamonds">Glistening Diamond</option>
                    <option value="stars">Celestial Stars</option>
                  </select>
                </div>

                {/* Color Preset theme */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider">Metallic Palette</label>
                  <div className="flex gap-2.5 h-8 items-center">
                    {(['copper', 'emerald', 'royal', 'rosegold'] as PresetColor[]).map((col) => {
                      const isActive = presetColor === col
                      let bgClass = 'bg-[#e26a45]'
                      if (col === 'emerald') bgClass = 'bg-[#0f766e]'
                      if (col === 'royal') bgClass = 'bg-[#1d4ed8]'
                      if (col === 'rosegold') bgClass = 'bg-[#be185d]'
                      
                      return (
                        <button
                          key={col}
                          onClick={() => setPresetColor(col)}
                          className={`w-6 h-6 rounded-full border transition-all ${bgClass} ${
                            isActive ? 'ring-2 ring-white border-primary scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                          }`}
                          title={`${col} palette`}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Logo Selection Badge */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider">Center Logo</label>
                  <select
                    value={logoChoice}
                    onChange={(e) => setLogoChoice(e.target.value as LogoChoice)}
                    className="w-full bg-black/40 border border-white/5 text-foreground/75 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                  >
                    <option value="none">No Logo</option>
                    <option value="link">Link Symbol</option>
                    <option value="wifi">WiFi Symbol</option>
                    <option value="github">GitHub Brand</option>
                    <option value="linkedin">LinkedIn Brand</option>
                    <option value="custom">Custom Image Link</option>
                  </select>
                </div>

                {/* Frame border type */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider">Outer Frame</label>
                  <select
                    value={qrFrame}
                    onChange={(e) => setQrFrame(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/5 text-foreground/75 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                  >
                    <option value="none">No Frame</option>
                    <option value="brackets">Brackets Corner</option>
                    <option value="laser">Scanning Laser</option>
                    <option value="card">Card Frame</option>
                    <option value="bubble">Pill Bubble</option>
                  </select>
                </div>

              </div>

              {/* Custom Logo URL field (if Custom selected) */}
              {logoChoice === 'custom' && (
                <div className="space-y-1.5 animate-slide-in">
                  <label className="text-[9px] uppercase font-bold text-foreground/40 tracking-wider flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-primary" /> Logo URL (HTTPS Image)
                  </label>
                  <input
                    type="url"
                    value={customLogoUrl}
                    onChange={(e) => setCustomLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full bg-black/40 border border-white/5 text-white rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none font-medium"
                  />
                </div>
              )}

              {/* Toggle Advanced Button */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[10px] font-bold text-primary hover:text-primary-foreground transition flex items-center gap-1 uppercase"
              >
                <Settings className="w-3.5 h-3.5" />
                {showAdvanced ? 'Hide Advanced Matrix Controls' : 'Show Advanced Matrix Controls'}
              </button>

              {/* Advanced Matrix Controls (Eye shapes & gradient direction) */}
              {showAdvanced && (
                <div className="grid grid-cols-3 gap-3 p-4 bg-black/30 border border-white/5 rounded-2xl animate-slide-in">
                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold text-foreground/40 tracking-wider">Outer Eye</label>
                    <select
                      value={eyeStyleOuter}
                      onChange={(e) => setEyeStyleOuter(e.target.value as any)}
                      className="w-full bg-black/50 border border-white/5 text-foreground/75 rounded-lg px-2 py-1.5 text-[10px] outline-none cursor-pointer"
                    >
                      <option value="classic">Square</option>
                      <option value="rounded">Rounded</option>
                      <option value="circle">Circle</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold text-foreground/40 tracking-wider">Inner Dot</label>
                    <select
                      value={eyeStyleInner}
                      onChange={(e) => setEyeStyleInner(e.target.value as any)}
                      className="w-full bg-black/50 border border-white/5 text-foreground/75 rounded-lg px-2 py-1.5 text-[10px] outline-none cursor-pointer"
                    >
                      <option value="classic">Square</option>
                      <option value="rounded">Rounded</option>
                      <option value="circle">Circle</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase font-bold text-foreground/40 tracking-wider">Gradient</label>
                    <select
                      value={gradientType}
                      onChange={(e) => setGradientType(e.target.value as any)}
                      className="w-full bg-black/50 border border-white/5 text-foreground/75 rounded-lg px-2 py-1.5 text-[10px] outline-none cursor-pointer"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </div>

                  {/* Eye Colors */}
                  <div className="col-span-3 pt-2 border-t border-white/5 space-y-2">
                    <span className="text-[8px] uppercase font-bold text-foreground/40 tracking-wider block">Individual Eye Colors (Optional)</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[7px] uppercase font-bold text-foreground/40 tracking-wider block">Top-Left Eye</label>
                        <div className="flex gap-1.5 items-center">
                          <input
                            type="color"
                            value={eyeColorTL || selectedColor.fg}
                            onChange={(e) => setEyeColorTL(e.target.value)}
                            className="w-5 h-5 rounded-md border-0 bg-transparent cursor-pointer"
                          />
                          {eyeColorTL && (
                            <button onClick={() => setEyeColorTL('')} className="text-[7px] text-foreground/35 hover:text-white underline">
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[7px] uppercase font-bold text-foreground/40 tracking-wider block">Top-Right Eye</label>
                        <div className="flex gap-1.5 items-center">
                          <input
                            type="color"
                            value={eyeColorTR || selectedColor.fg}
                            onChange={(e) => setEyeColorTR(e.target.value)}
                            className="w-5 h-5 rounded-md border-0 bg-transparent cursor-pointer"
                          />
                          {eyeColorTR && (
                            <button onClick={() => setEyeColorTR('')} className="text-[7px] text-foreground/35 hover:text-white underline">
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[7px] uppercase font-bold text-foreground/40 tracking-wider block">Bottom-Left Eye</label>
                        <div className="flex gap-1.5 items-center">
                          <input
                            type="color"
                            value={eyeColorBL || selectedColor.fg}
                            onChange={(e) => setEyeColorBL(e.target.value)}
                            className="w-5 h-5 rounded-md border-0 bg-transparent cursor-pointer"
                          />
                          {eyeColorBL && (
                            <button onClick={() => setEyeColorBL('')} className="text-[7px] text-foreground/35 hover:text-white underline">
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-3 border-t border-white/5">
                <Button
                  onClick={triggerCameraScanSimulation}
                  disabled={isScanningTest}
                  className="w-full bg-gradient-primary hover:opacity-95 text-white text-xs font-black rounded-xl py-3.5 flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4 animate-bounce" />
                  Test Live Code scan
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleDownload('png')}
                    className="flex-1 bg-primary/20 hover:bg-primary/30 border border-primary/20 text-white text-xs font-bold rounded-xl py-3 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PNG
                  </Button>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="flex-1 border-white/10 hover:bg-white/5 text-white text-xs font-bold rounded-xl py-3 flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
