import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    
    // Check if ImageKit keys are configured
    const imageKitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY
    const imageKitUrlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

    if (imageKitPrivateKey && imageKitPrivateKey !== 'your_imagekit_private_key_here' && imageKitUrlEndpoint) {
      console.log('ImageKit credentials found. Uploading to ImageKit...')
      try {
        const imageKitForm = new FormData()
        const fileBlob = new Blob([bytes], { type: file.type })
        
        imageKitForm.append('file', fileBlob, file.name)
        imageKitForm.append('fileName', file.name)
        imageKitForm.append('useUniqueFileName', 'true')
        imageKitForm.append('folder', '/smart-qr')

        const authHeader = 'Basic ' + Buffer.from(imageKitPrivateKey + ':').toString('base64')

        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
          },
          body: imageKitForm,
        })

        if (!response.ok) {
          const errText = await response.text()
          throw new Error(`ImageKit API returned status ${response.status}: ${errText}`)
        }

        const data = await response.json()
        console.log('ImageKit upload successful:', data.url)

        return NextResponse.json({
          success: true,
          fileUrl: data.url,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          storage: 'imagekit',
        })
      } catch (uploadError) {
        console.warn('ImageKit upload failed. Falling back to local storage...', uploadError)
      }
    }

    // Local Storage Fallback
    console.log('Using local storage fallback for upload...')
    const buffer = Buffer.from(bytes)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    
    await mkdir(uploadsDir, { recursive: true })

    const uniqueId = uuidv4()
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${uniqueId}-${sanitizedFilename}`
    const filePath = path.join(uploadsDir, fileName)

    await writeFile(filePath, buffer)
    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      storage: 'local',
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
