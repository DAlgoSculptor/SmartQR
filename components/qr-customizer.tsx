'use client'

import { Input } from '@/components/ui/input'

interface Props {
  fgColor: string
  bgColor: string
  onFgColorChange: (color: string) => void
  onBgColorChange: (color: string) => void
  qrSize: number
  onSizeChange: (size: number) => void
  errorLevel: 'L' | 'M' | 'H' | 'Q'
  onErrorLevelChange: (level: 'L' | 'M' | 'H' | 'Q') => void
  logoUrl: string
  onLogoUrlChange: (url: string) => void
  qrStyle: 'classic' | 'rounded'
  onQrStyleChange: (style: 'classic' | 'rounded') => void
  qrFrame: 'none' | 'brackets' | 'laser'
  onQrFrameChange: (frame: 'none' | 'brackets' | 'laser') => void
  isGradient: boolean
  onIsGradientChange: (val: boolean) => void
  gradientEndColor: string
  onGradientEndColorChange: (color: string) => void
}

export default function QRCustomizer({
  fgColor,
  bgColor,
  onFgColorChange,
  onBgColorChange,
  qrSize,
  onSizeChange,
  errorLevel,
  onErrorLevelChange,
  logoUrl,
  onLogoUrlChange,
  qrStyle,
  onQrStyleChange,
  qrFrame,
  onQrFrameChange,
  isGradient,
  onIsGradientChange,
  gradientEndColor,
  onGradientEndColorChange,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Colors */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Colors</h3>
        
        {/* Solid vs Gradient Switch */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Fill Type</label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              onClick={() => onIsGradientChange(false)}
              className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                !isGradient
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
              }`}
            >
              Solid Color
            </button>
            <button
              onClick={() => onIsGradientChange(true)}
              className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                isGradient
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
              }`}
            >
              Gradient Color
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Foreground color / Start color */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
              {isGradient ? 'Gradient Start Color' : 'QR Code Color'}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                className="w-16 h-10 rounded-xl border border-white/10 bg-black/40 cursor-pointer transition-all duration-300 hover:border-orange-500/30"
              />
              <Input
                type="text"
                value={fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 placeholder:text-foreground/20 text-white font-medium"
              />
            </div>
          </div>

          {/* End color if gradient mode is active, otherwise Background color */}
          {isGradient ? (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Gradient End Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={gradientEndColor}
                  onChange={(e) => onGradientEndColorChange(e.target.value)}
                  className="w-16 h-10 rounded-xl border border-white/10 bg-black/40 cursor-pointer transition-all duration-300 hover:border-orange-500/30"
                />
                <Input
                  type="text"
                  value={gradientEndColor}
                  onChange={(e) => onGradientEndColorChange(e.target.value)}
                  placeholder="#000000"
                  className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 placeholder:text-foreground/20 text-white font-medium"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => onBgColorChange(e.target.value)}
                  className="w-16 h-10 rounded-xl border border-white/10 bg-black/40 cursor-pointer transition-all duration-300 hover:border-orange-500/30"
                />
                <Input
                  type="text"
                  value={bgColor}
                  onChange={(e) => onBgColorChange(e.target.value)}
                  placeholder="#FFFFFF"
                  className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 placeholder:text-foreground/20 text-white font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Background color row when in Gradient Mode */}
        {isGradient && (
          <div className="space-y-2 max-w-sm">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="w-16 h-10 rounded-xl border border-white/10 bg-black/40 cursor-pointer transition-all duration-300 hover:border-orange-500/30"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 placeholder:text-foreground/20 text-white font-medium"
              />
            </div>
          </div>
        )}

        {/* Preset Gradient Palettes */}
        {isGradient && (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Preset Gradients</label>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Copper Glow', start: '#ea580c', end: '#fb923c' },
                { name: 'Sunset Flame', start: '#ea580c', end: '#ef4444' },
                { name: 'Forest Aurora', start: '#0d9488', end: '#22c55e' },
                { name: 'Ocean Breeze', start: '#0284c7', end: '#06b6d4' },
                { name: 'Cosmic Neon', start: '#7c3aed', end: '#db2777' },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    onFgColorChange(p.start)
                    onGradientEndColorChange(p.end)
                  }}
                  type="button"
                  title={p.name}
                  className="flex items-center gap-2 p-1.5 px-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition text-[10px] font-bold text-white cursor-pointer select-none"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/10"
                    style={{ background: `linear-gradient(135deg, ${p.start}, ${p.end})` }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">QR Code Size</label>
        <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
          <input
            type="range"
            min="200"
            max="500"
            step="10"
            value={qrSize}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            className="flex-1 accent-[#ea580c] h-1 bg-white/10 rounded-lg cursor-pointer appearance-none"
          />
          <span className="text-xs font-bold min-w-12 text-right text-orange-400">{qrSize}px</span>
        </div>
        <p className="text-[11px] text-foreground/40 font-medium">Recommended size: 300-400px for printing and standard displays.</p>
      </div>

      {/* Error Correction */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Error Correction Level</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['L', 'M', 'H', 'Q'].map((level) => (
            <button
              key={level}
              onClick={() => onErrorLevelChange(level as 'L' | 'M' | 'H' | 'Q')}
              className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
                errorLevel === level
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
              }`}
            >
              {level === 'L' && 'Low (7%)'}
              {level === 'M' && 'Med (15%)'}
              {level === 'H' && 'High (30%)'}
              {level === 'Q' && 'Ultra (25%)'}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-foreground/40 font-medium">
          Higher levels maintain readability even when part of the QR code is obscured or styled with logo overlays.
        </p>
      </div>

      {/* QR Dot Style Customizer */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">QR Dot Style</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onQrStyleChange('classic')}
            className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
              qrStyle === 'classic'
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
            }`}
          >
            Classic Square
          </button>
          <button
            onClick={() => onQrStyleChange('rounded')}
            className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
              qrStyle === 'rounded'
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
            }`}
          >
            Organic Rounded
          </button>
        </div>
      </div>

      {/* Frame Style Customizer */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Frame Style</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onQrFrameChange('none')}
            className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
              qrFrame === 'none'
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
            }`}
          >
            No Frame
          </button>
          <button
            onClick={() => onQrFrameChange('brackets')}
            className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
              qrFrame === 'brackets'
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
            }`}
          >
            Tech Brackets
          </button>
          <button
            onClick={() => onQrFrameChange('laser')}
            className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
              qrFrame === 'laser'
                ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
            }`}
          >
            Laser Scan
          </button>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Center Brand Logo URL (optional)</label>
        <Input
          type="url"
          placeholder="https://example.com/logo.png"
          value={logoUrl}
          onChange={(e) => onLogoUrlChange(e.target.value)}
          className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 placeholder:text-foreground/20 text-white font-medium"
        />
        <p className="text-[11px] text-foreground/40 font-medium">
          Paste a direct image link (PNG or JPG) to overlay a logo in the center of the QR code.
        </p>
        <p className="text-[11px] text-amber-500/70 font-semibold">
          Warning: Adding center logos can reduce readability. Always test the code layout using a phone reader.
        </p>
      </div>
    </div>

  )
}
