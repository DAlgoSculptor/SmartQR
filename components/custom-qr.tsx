'use client'

import { useEffect, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

interface CustomQRProps {
  value: string
  size?: number
  fgColor?: string
  bgColor?: string
  isGradient?: boolean
  gradientEndColor?: string
  gradientType?: 'linear' | 'radial'
  qrStyle?: 'classic' | 'rounded' | 'dots' | 'diamonds' | 'stars'
  eyeStyleOuter?: 'classic' | 'rounded' | 'circle'
  eyeStyleInner?: 'classic' | 'rounded' | 'circle'
  eyeColorTL?: string // Top-Left eye color
  eyeColorTR?: string // Top-Right eye color
  eyeColorBL?: string // Bottom-Left eye color
  qrFrame?: 'none' | 'brackets' | 'laser' | 'card' | 'bubble'
  frameText?: string
  logoUrl?: string
  logoSize?: number
  logoBgShield?: 'none' | 'circle' | 'rectangle'
  errorLevel?: 'L' | 'M' | 'H' | 'Q'
}

export default function CustomQR({
  value,
  size = 300,
  fgColor = '#ea580c',
  bgColor = '#080808',
  isGradient = false,
  gradientEndColor = '#fb923c',
  gradientType = 'linear',
  qrStyle = 'classic',
  eyeStyleOuter = 'classic',
  eyeStyleInner = 'classic',
  eyeColorTL = '',
  eyeColorTR = '',
  eyeColorBL = '',
  qrFrame = 'none',
  frameText = 'SCAN ME',
  logoUrl = '',
  logoSize = 44,
  logoBgShield = 'circle',
  errorLevel = 'H',
}: CustomQRProps) {
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
  const visibleCanvasRef = useRef<HTMLCanvasElement>(null)
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null)
  const [matrixReady, setMatrixReady] = useState(0)

  // Load logo image if provided
  useEffect(() => {
    if (!logoUrl) {
      setLogoImage(null)
      return
    }
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => setLogoImage(img)
    img.onerror = () => setLogoImage(null)
    img.src = logoUrl
  }, [logoUrl])

  // Trigger re-scans if input values change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMatrixReady((prev) => prev + 1)
    }, 120)
    return () => clearTimeout(timer)
  }, [value, errorLevel])

  // Custom drawing logic
  useEffect(() => {
    const hiddenCanvas = hiddenCanvasRef.current
    const visibleCanvas = visibleCanvasRef.current
    if (!hiddenCanvas || !visibleCanvas) return

    const hCtx = hiddenCanvas.getContext('2d')
    const vCtx = visibleCanvas.getContext('2d')
    if (!hCtx || !vCtx) return

    // 1. Get raw QR modules from hidden canvas
    const W = hiddenCanvas.width
    const H = hiddenCanvas.height
    if (W === 0 || H === 0) return

    let imgData: Uint8ClampedArray
    try {
      imgData = hCtx.getImageData(0, 0, W, H).data
    } catch (e) {
      console.warn('Canvas not ready for pixel scanning yet', e)
      return
    }

    // Scan top row to find finder pattern size (first run of dark pixels)
    let blackPixelCount = 0
    for (let x = 0; x < W; x++) {
      const idx = x * 4
      const r = imgData[idx]
      const g = imgData[idx + 1]
      const b = imgData[idx + 2]
      // Check if pixel is dark
      if (r < 120 && g < 120 && b < 120) {
        blackPixelCount++
      } else {
        break
      }
    }

    if (blackPixelCount === 0) return

    // The finder pattern is exactly 7 modules wide
    const moduleSizeInPixels = blackPixelCount / 7
    const N = Math.round(W / moduleSizeInPixels)
    if (N < 21 || N > 177) return // Valid QR versions are between 21 and 177 modules

    const cellWidth = W / N

    // Build the binary matrix
    const matrix: number[][] = []
    for (let r = 0; r < N; r++) {
      const row: number[] = []
      for (let c = 0; c < N; c++) {
        // Sample cell center pixel
        const sx = Math.floor((c + 0.5) * cellWidth)
        const sy = Math.floor((r + 0.5) * cellWidth)
        const idx = (sy * W + sx) * 4
        const rVal = imgData[idx]
        const gVal = imgData[idx + 1]
        const bVal = imgData[idx + 2]
        row.push(rVal < 120 && gVal < 120 && bVal < 120 ? 1 : 0)
      }
      matrix.push(row)
    }

    // 2. Set up visible canvas dimensions
    let canvasW = size
    let canvasH = size

    // Adjust size for custom frames
    if (qrFrame === 'card') {
      canvasH = size + 70
    } else if (qrFrame === 'bubble') {
      canvasH = size + 40
    }

    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    visibleCanvas.width = canvasW * devicePixelRatio
    visibleCanvas.height = canvasH * devicePixelRatio
    visibleCanvas.style.width = `${canvasW}px`
    visibleCanvas.style.height = `${canvasH}px`

    vCtx.scale(devicePixelRatio, devicePixelRatio)

    // Clear and draw background
    vCtx.fillStyle = bgColor
    vCtx.fillRect(0, 0, canvasW, canvasH)

    // Determine QR code placement bounding box
    let qrX = 0
    let qrY = 0
    let qrSize = size

    if (qrFrame === 'card') {
      qrX = 15
      qrY = 15
      qrSize = size - 30
    } else if (qrFrame === 'bubble') {
      qrX = 10
      qrY = 10
      qrSize = size - 20
    }

    const m = qrSize / N // size of a single module on target canvas

    // Helper: Rounded Rectangle path builder
    const pathRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()
    }

    // Identify finder patterns
    const isFinder = (r: number, c: number) => {
      if (r < 7 && c < 7) return 'TL'
      if (r < 7 && c >= N - 7) return 'TR'
      if (r >= N - 7 && c < 7) return 'BL'
      return null
    }

    // Identify logo shield area coordinates to block data modules
    const shieldHalf = (logoSize / 2) + 4
    const qrMidX = qrX + qrSize / 2
    const qrMidY = qrY + qrSize / 2

    const isInsideShield = (r: number, c: number) => {
      if (!logoUrl || logoBgShield === 'none') return false
      const cellCenterX = qrX + (c + 0.5) * m
      const cellCenterY = qrY + (r + 0.5) * m

      if (logoBgShield === 'circle') {
        const dist = Math.sqrt(Math.pow(cellCenterX - qrMidX, 2) + Math.pow(cellCenterY - qrMidY, 2))
        return dist < shieldHalf
      } else if (logoBgShield === 'rectangle') {
        return Math.abs(cellCenterX - qrMidX) < shieldHalf && Math.abs(cellCenterY - qrMidY) < shieldHalf
      }
      return false
    }

    // 3. Create Main Body Gradient/Style
    let bodyStyle: string | CanvasGradient = fgColor
    if (isGradient && gradientEndColor) {
      if (gradientType === 'linear') {
        const grad = vCtx.createLinearGradient(qrX, qrY, qrX + qrSize, qrY + qrSize)
        grad.addColorStop(0, fgColor)
        grad.addColorStop(1, gradientEndColor)
        bodyStyle = grad
      } else {
        const grad = vCtx.createRadialGradient(qrMidX, qrMidY, 10, qrMidX, qrMidY, qrSize / 1.4)
        grad.addColorStop(0, fgColor)
        grad.addColorStop(1, gradientEndColor)
        bodyStyle = grad
      }
    }

    // 4. Draw data modules (skip eyes and logo shield area)
    vCtx.fillStyle = bodyStyle
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (matrix[r][c] === 1 && !isFinder(r, c) && !isInsideShield(r, c)) {
          const cx = qrX + c * m
          const cy = qrY + r * m

          if (qrStyle === 'classic') {
            vCtx.fillRect(cx, cy, m + 0.3, m + 0.3) // 0.3 bleed to avoid gaps
          } else if (qrStyle === 'dots') {
            vCtx.beginPath()
            vCtx.arc(cx + m / 2, cy + m / 2, (m / 2) * 0.82, 0, Math.PI * 2)
            vCtx.fill()
          } else if (qrStyle === 'rounded') {
            pathRoundedRect(vCtx, cx + 0.05 * m, cy + 0.05 * m, m * 0.9, m * 0.9, m * 0.3)
            vCtx.fill()
          } else if (qrStyle === 'diamonds') {
            vCtx.beginPath()
            vCtx.moveTo(cx + m / 2, cy)
            vCtx.lineTo(cx + m, cy + m / 2)
            vCtx.lineTo(cx + m / 2, cy + m)
            vCtx.lineTo(cx, cy + m / 2)
            vCtx.closePath()
            vCtx.fill()
          } else if (qrStyle === 'stars') {
            vCtx.beginPath()
            vCtx.moveTo(cx + m / 2, cy)
            vCtx.quadraticCurveTo(cx + m / 2, cy + m / 2, cx + m, cy + m / 2)
            vCtx.quadraticCurveTo(cx + m / 2, cy + m / 2, cx + m / 2, cy + m)
            vCtx.quadraticCurveTo(cx + m / 2, cy + m / 2, cx, cy + m / 2)
            vCtx.quadraticCurveTo(cx + m / 2, cy + m / 2, cx + m / 2, cy)
            vCtx.closePath()
            vCtx.fill()
          }
        }
      }
    }

    // 5. Draw the three finder patterns (eyes)
    const drawEyePattern = (startX: number, startY: number, eyeColor: string) => {
      vCtx.save()
      vCtx.fillStyle = eyeColor || bodyStyle

      // Draw outer eye
      if (eyeStyleOuter === 'classic') {
        vCtx.fillRect(startX, startY, 7 * m, 7 * m)
        vCtx.fillStyle = bgColor
        vCtx.fillRect(startX + m, startY + m, 5 * m, 5 * m)
      } else if (eyeStyleOuter === 'rounded') {
        pathRoundedRect(vCtx, startX, startY, 7 * m, 7 * m, 2.0 * m)
        vCtx.fill()
        vCtx.fillStyle = bgColor
        pathRoundedRect(vCtx, startX + m, startY + m, 5 * m, 5 * m, 1.0 * m)
        vCtx.fill()
      } else if (eyeStyleOuter === 'circle') {
        vCtx.beginPath()
        vCtx.arc(startX + 3.5 * m, startY + 3.5 * m, 3.5 * m, 0, Math.PI * 2)
        vCtx.fill()
        vCtx.fillStyle = bgColor
        vCtx.beginPath()
        vCtx.arc(startX + 3.5 * m, startY + 3.5 * m, 2.5 * m, 0, Math.PI * 2)
        vCtx.fill()
      }

      // Draw inner eye (center dot)
      vCtx.fillStyle = eyeColor || bodyStyle
      if (eyeStyleInner === 'classic') {
        vCtx.fillRect(startX + 2 * m, startY + 2 * m, 3 * m, 3 * m)
      } else if (eyeStyleInner === 'rounded') {
        pathRoundedRect(vCtx, startX + 2 * m, startY + 2 * m, 3 * m, 3 * m, 0.9 * m)
        vCtx.fill()
      } else if (eyeStyleInner === 'circle') {
        vCtx.beginPath()
        vCtx.arc(startX + 3.5 * m, startY + 3.5 * m, 1.5 * m, 0, Math.PI * 2)
        vCtx.fill()
      }

      vCtx.restore()
    }

    // Draw TL Eye
    drawEyePattern(qrX, qrY, eyeColorTL)
    // Draw TR Eye
    drawEyePattern(qrX + (N - 7) * m, qrY, eyeColorTR)
    // Draw BL Eye
    drawEyePattern(qrX, qrY + (N - 7) * m, eyeColorBL)

    // 6. Draw Center Logo Shield & Image
    if (logoUrl && logoImage) {
      vCtx.save()
      vCtx.fillStyle = bgColor

      // Shield
      if (logoBgShield === 'circle') {
        vCtx.beginPath()
        vCtx.arc(qrMidX, qrMidY, shieldHalf, 0, Math.PI * 2)
        vCtx.fill()
      } else if (logoBgShield === 'rectangle') {
        pathRoundedRect(vCtx, qrMidX - shieldHalf, qrMidY - shieldHalf, shieldHalf * 2, shieldHalf * 2, 5)
        vCtx.fill()
      }

      // Draw Image
      const lx = qrMidX - logoSize / 2
      const ly = qrMidY - logoSize / 2
      vCtx.drawImage(logoImage, lx, ly, logoSize, logoSize)
      vCtx.restore()
    }

    // 7. Draw outer frames & overlays directly on canvas
    if (qrFrame === 'brackets' || qrFrame === 'laser') {
      vCtx.strokeStyle = fgColor
      vCtx.lineWidth = 3
      const offset = 8
      const len = 18

      // Top-Left corner
      vCtx.beginPath()
      vCtx.moveTo(qrX - offset + len, qrY - offset)
      vCtx.lineTo(qrX - offset, qrY - offset)
      vCtx.lineTo(qrX - offset, qrY - offset + len)
      vCtx.stroke()

      // Top-Right corner
      vCtx.beginPath()
      vCtx.moveTo(qrX + qrSize + offset - len, qrY - offset)
      vCtx.lineTo(qrX + qrSize + offset, qrY - offset)
      vCtx.lineTo(qrX + qrSize + offset, qrY - offset + len)
      vCtx.stroke()

      // Bottom-Left corner
      vCtx.beginPath()
      vCtx.moveTo(qrX - offset + len, qrY + qrSize + offset)
      vCtx.lineTo(qrX - offset, qrY + qrSize + offset)
      vCtx.lineTo(qrX - offset, qrY + qrSize + offset - len)
      vCtx.stroke()

      // Bottom-Right corner
      vCtx.beginPath()
      vCtx.moveTo(qrX + qrSize + offset - len, qrY + qrSize + offset)
      vCtx.lineTo(qrX + qrSize + offset, qrY + qrSize + offset)
      vCtx.lineTo(qrX + qrSize + offset, qrY + qrSize + offset - len)
      vCtx.stroke()

      // Laser line (drawn as a static premium overlay for export)
      if (qrFrame === 'laser') {
        vCtx.save()
        const gradient = vCtx.createLinearGradient(qrX, qrY + qrSize / 2, qrX + qrSize, qrY + qrSize / 2)
        gradient.addColorStop(0, 'rgba(234, 88, 12, 0)')
        gradient.addColorStop(0.5, '#ea580c')
        gradient.addColorStop(1, 'rgba(234, 88, 12, 0)')

        vCtx.shadowColor = '#ea580c'
        vCtx.shadowBlur = 8
        vCtx.strokeStyle = gradient
        vCtx.lineWidth = 4
        vCtx.beginPath()
        vCtx.moveTo(qrX, qrY + qrSize / 2)
        vCtx.lineTo(qrX + qrSize, qrY + qrSize / 2)
        vCtx.stroke()
        vCtx.restore()
      }
    } else if (qrFrame === 'card') {
      vCtx.save()
      // Outer card frame
      vCtx.strokeStyle = fgColor
      vCtx.lineWidth = 2.5
      pathRoundedRect(vCtx, 3, 3, canvasW - 6, canvasH - 6, 20)
      vCtx.stroke()

      // Banner background
      vCtx.fillStyle = fgColor
      const bannerY = canvasH - 46
      pathRoundedRect(vCtx, 12, bannerY, canvasW - 24, 34, 10)
      vCtx.fill()

      // Banner Text
      vCtx.fillStyle = '#ffffff'
      vCtx.font = 'bold 12px sans-serif'
      vCtx.textAlign = 'center'
      vCtx.textBaseline = 'middle'
      vCtx.fillText(frameText.toUpperCase(), canvasW / 2, bannerY + 17)
      vCtx.restore()
    } else if (qrFrame === 'bubble') {
      vCtx.save()
      // Pill bubble border around content
      vCtx.strokeStyle = fgColor
      vCtx.lineWidth = 2
      pathRoundedRect(vCtx, 3, 3, canvasW - 6, canvasH - 14, 16)
      vCtx.stroke()

      // Small indicator pointer triangle at bottom center
      vCtx.fillStyle = bgColor
      vCtx.strokeStyle = fgColor
      vCtx.lineWidth = 2
      vCtx.beginPath()
      vCtx.moveTo(canvasW / 2 - 8, canvasH - 12)
      vCtx.lineTo(canvasW / 2, canvasH - 4)
      vCtx.lineTo(canvasW / 2 + 8, canvasH - 12)
      vCtx.fill()

      // Draw line covering the triangle base in background color
      vCtx.strokeStyle = bgColor
      vCtx.beginPath()
      vCtx.moveTo(canvasW / 2 - 7, canvasH - 12.5)
      vCtx.lineTo(canvasW / 2 + 7, canvasH - 12.5)
      vCtx.stroke()

      // Re-stroke border around pointer lines
      vCtx.strokeStyle = fgColor
      vCtx.beginPath()
      vCtx.moveTo(canvasW / 2 - 8, canvasH - 12)
      vCtx.lineTo(canvasW / 2, canvasH - 4)
      vCtx.lineTo(canvasW / 2 + 8, canvasH - 12)
      vCtx.stroke()
      vCtx.restore()
    }
  }, [
    matrixReady,
    size,
    fgColor,
    bgColor,
    isGradient,
    gradientEndColor,
    gradientType,
    qrStyle,
    eyeStyleOuter,
    eyeStyleInner,
    eyeColorTL,
    eyeColorTR,
    eyeColorBL,
    qrFrame,
    frameText,
    logoImage,
    logoSize,
    logoBgShield,
    errorLevel,
  ])

  return (
    <div className="relative flex items-center justify-center">
      {/* Hidden QRCodeCanvas to generate raw code modules */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <QRCodeCanvas
          ref={hiddenCanvasRef}
          value={value}
          size={512} // High quality resolution for scan matrix calculations
          level={errorLevel}
          bgColor="#ffffff"
          fgColor="#000000"
          includeMargin={false}
        />
      </div>

      {/* Styled Render Output */}
      <canvas
        ref={visibleCanvasRef}
        className="transition-all duration-300 hover:scale-[1.01]"
        style={{
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.35)',
        }}
      />
    </div>
  )
}
