import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function downloadQRCode(
  ref: React.RefObject<HTMLDivElement>,
  format: 'png' | 'svg' | 'pdf',
  filename: string
) {
  if (!ref.current) return

  try {
    const element = ref.current
    const canvas = element.querySelector('canvas') as HTMLCanvasElement

    if (!canvas) {
      alert('Please generate a QR code first')
      return
    }

    switch (format) {
      case 'png':
        downloadPNG(canvas, filename)
        break
      case 'svg':
        downloadSVG(element, filename)
        break
      case 'pdf':
        downloadPDF(canvas, filename)
        break
    }
  } catch (error) {
    console.error('Error downloading QR code:', error)
    alert('Failed to download QR code')
  }
}

function downloadPNG(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = `${filename}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function downloadSVG(element: HTMLElement, filename: string) {
  const canvas = element.querySelector('canvas') as HTMLCanvasElement
  if (!canvas) return

  const img = new Image()
  img.onload = function () {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
        <image width="${canvas.width}" height="${canvas.height}" href="${canvas.toDataURL('image/png')}"/>
      </svg>
    `

    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  img.src = canvas.toDataURL('image/png')
}

function downloadPDF(canvas: HTMLCanvasElement, filename: string) {
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  })

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save(`${filename}.pdf`)
}
