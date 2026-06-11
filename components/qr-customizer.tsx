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
  qrStyle: 'classic' | 'rounded' | 'dots' | 'diamonds' | 'stars'
  onQrStyleChange: (style: 'classic' | 'rounded' | 'dots' | 'diamonds' | 'stars') => void
  qrFrame: 'none' | 'brackets' | 'laser' | 'card' | 'bubble'
  onQrFrameChange: (frame: 'none' | 'brackets' | 'laser' | 'card' | 'bubble') => void
  isGradient: boolean
  onIsGradientChange: (val: boolean) => void
  gradientEndColor: string
  onGradientEndColorChange: (color: string) => void
  gradientType: 'linear' | 'radial'
  onGradientTypeChange: (type: 'linear' | 'radial') => void
  eyeStyleOuter: 'classic' | 'rounded' | 'circle'
  onEyeStyleOuterChange: (style: 'classic' | 'rounded' | 'circle') => void
  eyeStyleInner: 'classic' | 'rounded' | 'circle'
  onEyeStyleInnerChange: (style: 'classic' | 'rounded' | 'circle') => void
  eyeColorTL: string
  onEyeColorTLChange: (color: string) => void
  eyeColorTR: string
  onEyeColorTRChange: (color: string) => void
  eyeColorBL: string
  onEyeColorBLChange: (color: string) => void
  useCustomEyeColors: boolean
  onUseCustomEyeColorsChange: (val: boolean) => void
  logoBgShield: 'none' | 'circle' | 'rectangle'
  onLogoBgShieldChange: (val: 'none' | 'circle' | 'rectangle') => void
  logoSize: number
  onLogoSizeChange: (size: number) => void
  frameText: string
  onFrameTextChange: (text: string) => void
  metaPixelId: string
  onMetaPixelIdChange: (val: string) => void
  googleAnalyticsId: string
  onGoogleAnalyticsIdChange: (val: string) => void
  tiktokPixelId: string
  onTiktokPixelIdChange: (val: string) => void
  linkedinPixelId: string
  onLinkedinPixelIdChange: (val: string) => void
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
  gradientType,
  onGradientTypeChange,
  eyeStyleOuter,
  onEyeStyleOuterChange,
  eyeStyleInner,
  onEyeStyleInnerChange,
  eyeColorTL,
  onEyeColorTLChange,
  eyeColorTR,
  onEyeColorTRChange,
  eyeColorBL,
  onEyeColorBLChange,
  useCustomEyeColors,
  onUseCustomEyeColorsChange,
  logoBgShield,
  onLogoBgShieldChange,
  logoSize,
  onLogoSizeChange,
  frameText,
  onFrameTextChange,
  metaPixelId,
  onMetaPixelIdChange,
  googleAnalyticsId,
  onGoogleAnalyticsIdChange,
  tiktokPixelId,
  onTiktokPixelIdChange,
  linkedinPixelId,
  onLinkedinPixelIdChange,
}: Props) {
  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'starbucks':
        onFgColorChange('#2D2D2D')
        onBgColorChange('#FFFFFF')
        onIsGradientChange(false)
        onQrStyleChange('dots')
        onEyeStyleOuterChange('rounded')
        onEyeStyleInnerChange('rounded')
        onUseCustomEyeColorsChange(true)
        onEyeColorTLChange('#006241')
        onEyeColorTRChange('#006241')
        onEyeColorBLChange('#006241')
        onLogoBgShieldChange('circle')
        onLogoSizeChange(50)
        onLogoUrlChange('https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo.svg')
        onQrFrameChange('none')
        break
      case 'schlossweine':
        onFgColorChange('#1F2421')
        onBgColorChange('#FFFFFF')
        onIsGradientChange(false)
        onQrStyleChange('classic')
        onEyeStyleOuterChange('rounded')
        onEyeStyleInnerChange('rounded')
        onUseCustomEyeColorsChange(true)
        onEyeColorTLChange('#116530')
        onEyeColorBLChange('#116530')
        onEyeColorTRChange('#800000')
        onLogoBgShieldChange('rectangle')
        onLogoSizeChange(46)
        onLogoUrlChange('')
        onQrFrameChange('none')
        break
      case 'copper':
        onFgColorChange('#ea580c')
        onBgColorChange('#080808')
        onIsGradientChange(true)
        onGradientEndColorChange('#fb923c')
        onGradientTypeChange('linear')
        onQrStyleChange('rounded')
        onEyeStyleOuterChange('rounded')
        onEyeStyleInnerChange('rounded')
        onUseCustomEyeColorsChange(false)
        onLogoBgShieldChange('circle')
        onLogoSizeChange(40)
        onQrFrameChange('brackets')
        break
      case 'cyber':
        onFgColorChange('#db2777')
        onBgColorChange('#03000a')
        onIsGradientChange(true)
        onGradientEndColorChange('#7c3aed')
        onGradientTypeChange('radial')
        onQrStyleChange('stars')
        onEyeStyleOuterChange('circle')
        onEyeStyleInnerChange('circle')
        onUseCustomEyeColorsChange(false)
        onLogoBgShieldChange('circle')
        onLogoSizeChange(44)
        onQrFrameChange('laser')
        break
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Designer Styles (Quick Presets)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => applyPreset('starbucks')}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition text-left cursor-pointer"
          >
            <div className="flex gap-1 w-full justify-center">
              <span className="w-4 h-4 rounded bg-[#006241]" />
              <span className="w-4 h-4 rounded-full bg-[#2D2D2D]" />
            </div>
            <span className="text-[10px] font-bold text-white text-center">Starbucks Rounded</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('schlossweine')}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-red-500/30 transition text-left cursor-pointer"
          >
            <div className="flex gap-1 w-full justify-center">
              <span className="w-4 h-4 rounded bg-[#116530]" />
              <span className="w-4 h-4 rounded bg-[#800000]" />
            </div>
            <span className="text-[10px] font-bold text-white text-center">Schlossweine Dual</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('copper')}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition text-left cursor-pointer"
          >
            <div className="flex gap-1 w-full justify-center">
              <span className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-amber-500" />
              <span className="w-4 h-4 rounded bg-[#080808] border border-white/10" />
            </div>
            <span className="text-[10px] font-bold text-white text-center">Copper Premium</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('cyber')}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/30 transition text-left cursor-pointer"
          >
            <div className="flex gap-1 w-full justify-center">
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
              <span className="w-4 h-4 rounded bg-[#03000a] border border-white/10" />
            </div>
            <span className="text-[10px] font-bold text-white text-center">Cyber Star</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Colors & Gradients</h3>
        
        <div className="space-y-2">
          <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Body Fill Type</label>
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
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
              {isGradient ? 'Gradient Start Color' : 'Body Foreground Color'}
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
                placeholder="#ea580c"
                className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
              />
            </div>
          </div>

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
                  placeholder="#fb923c"
                  className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
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
                  placeholder="#080808"
                  className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {isGradient && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Gradient Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onGradientTypeChange('linear')}
                  className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                    gradientType === 'linear'
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => onGradientTypeChange('radial')}
                  className={`py-2 px-3 rounded-lg border text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                    gradientType === 'radial'
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
                  }`}
                >
                  Radial Glow
                </button>
              </div>
            </div>
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
                  placeholder="#080808"
                  className="flex-1 border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Shapes & Modules</h3>
        
        <div className="space-y-3">
          <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Body Module (Dot) Style</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { id: 'classic', label: 'Classic' },
              { id: 'rounded', label: 'Rounded' },
              { id: 'dots', label: 'Circle Dots' },
              { id: 'diamonds', label: 'Diamonds' },
              { id: 'stars', label: 'Stars' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => onQrStyleChange(s.id as any)}
                className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                  qrStyle === s.id
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Eye Outer Frame</label>
            <div className="grid grid-cols-3 gap-2">
              {['classic', 'rounded', 'circle'].map((s) => (
                <button
                  key={s}
                  onClick={() => onEyeStyleOuterChange(s as any)}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition-all duration-300 cursor-pointer capitalize ${
                    eyeStyleOuter === s
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Eye Center Dot</label>
            <div className="grid grid-cols-3 gap-2">
              {['classic', 'rounded', 'circle'].map((s) => (
                <button
                  key={s}
                  onClick={() => onEyeStyleInnerChange(s as any)}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition-all duration-300 cursor-pointer capitalize ${
                    eyeStyleInner === s
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Use Custom Eye Colors</label>
            <button
              onClick={() => onUseCustomEyeColorsChange(!useCustomEyeColors)}
              className={`py-1 px-3 rounded-lg border text-[10px] font-bold transition cursor-pointer ${
                useCustomEyeColors
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-white/10 bg-white/[0.01] text-foreground/60'
              }`}
            >
              {useCustomEyeColors ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {useCustomEyeColors && (
            <div className="grid md:grid-cols-3 gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-white/50 uppercase">Top-Left Eye</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={eyeColorTL || fgColor}
                    onChange={(e) => onEyeColorTLChange(e.target.value)}
                    className="w-10 h-8 rounded-lg cursor-pointer border border-white/10 bg-black/40"
                  />
                  <Input
                    type="text"
                    value={eyeColorTL}
                    onChange={(e) => onEyeColorTLChange(e.target.value)}
                    placeholder="Match"
                    className="h-8 text-xs bg-transparent border-white/10 focus-visible:border-orange-500/30"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-white/50 uppercase">Top-Right Eye</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={eyeColorTR || fgColor}
                    onChange={(e) => onEyeColorTRChange(e.target.value)}
                    className="w-10 h-8 rounded-lg cursor-pointer border border-white/10 bg-black/40"
                  />
                  <Input
                    type="text"
                    value={eyeColorTR}
                    onChange={(e) => onEyeColorTRChange(e.target.value)}
                    placeholder="Match"
                    className="h-8 text-xs bg-transparent border-white/10 focus-visible:border-orange-500/30"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-white/50 uppercase">Bottom-Left Eye</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={eyeColorBL || fgColor}
                    onChange={(e) => onEyeColorBLChange(e.target.value)}
                    className="w-10 h-8 rounded-lg cursor-pointer border border-white/10 bg-black/40"
                  />
                  <Input
                    type="text"
                    value={eyeColorBL}
                    onChange={(e) => onEyeColorBLChange(e.target.value)}
                    placeholder="Match"
                    className="h-8 text-xs bg-transparent border-white/10 focus-visible:border-orange-500/30"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Branding Frame</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { id: 'none', label: 'No Frame' },
            { id: 'brackets', label: 'Tech Brackets' },
            { id: 'laser', label: 'Laser Glow' },
            { id: 'card', label: 'Text Card' },
            { id: 'bubble', label: 'Speech Bubble' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onQrFrameChange(f.id as any)}
              className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                qrFrame === f.id
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:text-orange-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {(qrFrame === 'card' || qrFrame === 'bubble') && (
          <div className="space-y-2 max-w-sm animate-fade-in">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Banner Frame Text</label>
            <Input
              type="text"
              value={frameText}
              onChange={(e) => onFrameTextChange(e.target.value)}
              placeholder="SCAN ME"
              maxLength={18}
              className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl transition-all duration-300 text-white font-medium"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Logo Overlay</h3>
        <div className="space-y-3">
          <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Logo URL (PNG / JPG)</label>
          <Input
            type="url"
            placeholder="https://example.com/logo.png"
            value={logoUrl}
            onChange={(e) => onLogoUrlChange(e.target.value)}
            className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
          />
        </div>

        {logoUrl && (
          <div className="grid md:grid-cols-2 gap-6 p-4 rounded-2xl border border-white/5 bg-white/[0.01] animate-fade-in">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Logo Background Shield</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'circle', label: 'Circle' },
                  { id: 'rectangle', label: 'Square' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onLogoBgShieldChange(s.id as any)}
                    className={`py-1 px-2 rounded-lg border text-[10px] font-bold transition cursor-pointer ${
                      logoBgShield === s.id
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                        : 'border-white/10 bg-white/[0.01] text-foreground/60'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Logo Size ({logoSize}px)</label>
              <input
                type="range"
                min="24"
                max="64"
                step="2"
                value={logoSize}
                onChange={(e) => onLogoSizeChange(parseInt(e.target.value))}
                className="w-full accent-[#ea580c] h-1 bg-white/10 rounded-lg cursor-pointer appearance-none mt-3.5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Export & Code Settings</h3>
        
        <div className="space-y-3">
          <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">QR Code Print Size</label>
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
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Error Correction Level</label>
          <div className="grid grid-cols-4 gap-3">
            {['L', 'M', 'H', 'Q'].map((level) => (
              <button
                key={level}
                onClick={() => onErrorLevelChange(level as any)}
                className={`py-3 px-1 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer ${
                  errorLevel === level
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-white/10 bg-white/[0.01] text-foreground/60 hover:border-orange-500/20 hover:bg-orange-500/5 hover:text-orange-400'
                }`}
              >
                {level === 'L' && 'L (7%)'}
                {level === 'M' && 'M (15%)'}
                {level === 'H' && 'H (30%)'}
                {level === 'Q' && 'Q (25%)'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-foreground/40 font-medium">
            Higher levels (e.g. H / Q) allow the QR code to be readable even with large overlapping center logos or unique dot styles.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest pb-2 border-b border-white/5">Marketing & Retargeting Pixels</h3>
        <p className="text-[11px] text-foreground/40 font-medium">
          Add tracking pixels to build custom audiences and run retargeting ads when users scan your dynamic QR codes. Note: these only apply to dynamic redirects.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Meta Pixel ID (Facebook)</label>
            <Input
              type="text"
              placeholder="e.g. 123456789012345"
              value={metaPixelId}
              onChange={(e) => onMetaPixelIdChange(e.target.value)}
              className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Google Analytics ID</label>
            <Input
              type="text"
              placeholder="e.g. G-XXXXXXXXXX"
              value={googleAnalyticsId}
              onChange={(e) => onGoogleAnalyticsIdChange(e.target.value)}
              className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">TikTok Pixel ID</label>
            <Input
              type="text"
              placeholder="e.g. CXXXXXXXXXXXXXX"
              value={tiktokPixelId}
              onChange={(e) => onTiktokPixelIdChange(e.target.value)}
              className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">LinkedIn Partner ID</label>
            <Input
              type="text"
              placeholder="e.g. 1234567"
              value={linkedinPixelId}
              onChange={(e) => onLinkedinPixelIdChange(e.target.value)}
              className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl py-5 transition-all duration-300 text-white font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
