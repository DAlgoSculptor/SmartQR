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
}: Props) {
  return (
    <div className="space-y-8">
      {/* Colors */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Colors</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Foreground color */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">QR Code Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                className="w-16 h-10 rounded-lg border border-white/10 cursor-pointer"
              />
              <Input
                type="text"
                value={fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          {/* Background color */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="w-16 h-10 rounded-lg border border-white/10 cursor-pointer"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">QR Code Size</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="200"
            max="500"
            step="10"
            value={qrSize}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-medium min-w-12">{qrSize}px</span>
        </div>
        <p className="text-xs text-foreground/50">Recommended: 300-400px for most uses</p>
      </div>

      {/* Error Correction */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Error Correction Level</label>
        <div className="grid grid-cols-4 gap-3">
          {['L', 'M', 'H', 'Q'].map((level) => (
            <button
              key={level}
              onClick={() => onErrorLevelChange(level as 'L' | 'M' | 'H' | 'Q')}
              className={`py-2 px-3 rounded-lg border-2 font-medium text-sm transition-all ${
                errorLevel === level
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-white/10 text-foreground/60 hover:border-white/20'
              }`}
            >
              {level === 'L' && 'Low (7%)'}
              {level === 'M' && 'Med (15%)'}
              {level === 'H' && 'High (30%)'}
              {level === 'Q' && 'Ultra (25%)'}
            </button>
          ))}
        </div>
        <p className="text-xs text-foreground/50">
          Higher levels allow recovery if QR code is damaged. Recommended: High or Ultra
        </p>
      </div>

      {/* Logo Upload (Cloudinary integration ready) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Logo/Image URL (optional)</label>
        <Input
          type="url"
          placeholder="https://example.com/logo.png"
          value={logoUrl}
          onChange={(e) => onLogoUrlChange(e.target.value)}
        />
        <p className="text-xs text-foreground/50">
          Paste a URL to an image to embed as a logo in the center. PNG or JPG recommended.
        </p>
        <p className="text-xs text-yellow-600/80">
          Note: Large logos may reduce scannability. Test with a QR scanner.
        </p>
      </div>
    </div>
  )
}
