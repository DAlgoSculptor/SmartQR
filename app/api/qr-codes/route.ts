import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

// Generate unique slug
function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substr(2, 9)
  return `${title.toLowerCase().replace(/\s+/g, '-').slice(0, 10)}-${timestamp}-${randomStr}`.slice(0, 50)
}

// GET - List user's QR codes
export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('GET /api/qr-codes:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// POST - Create new QR code
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = await request.json()
    const {
      title,
      qr_type,
      qr_data,
      destination_url,
      custom_color,
      background_color,
      size,
      error_level,
    } = body

    // Validate required fields
    if (!title || !qr_type || !qr_data) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, qr_type, qr_data' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const slug = generateSlug(title)

    // Check if qr_data is object and stringify it for Postgres TEXT column
    const serializedQrData = typeof qr_data === 'object' ? JSON.stringify(qr_data) : qr_data

    // Compute the destination URL for dynamic redirect templates
    let computedDestinationUrl = destination_url
    if (!computedDestinationUrl || computedDestinationUrl.endsWith('/qr-')) {
      // Determine origin dynamically from headers, with env fallback
      const host = request.headers.get('host')
      const proto = request.headers.get('x-forwarded-proto') || 'http'
      const dynamicOrigin = host ? `${proto}://${host}` : null
      const appUrl = dynamicOrigin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

      if (qr_type === 'file') {
        computedDestinationUrl = `${appUrl}/files/${slug}`
      } else if (qr_type === 'social') {
        computedDestinationUrl = `${appUrl}/social/${slug}`
      } else if (qr_type === 'menu') {
        computedDestinationUrl = `${appUrl}/menu/${slug}`
      } else {
        computedDestinationUrl = `${appUrl}/qr/${slug}`
      }
    }

    const { data, error } = await supabase
      .from('qr_codes')
      .insert([
        {
          user_id: user.id,
          title,
          slug,
          qr_type,
          qr_data: serializedQrData,
          destination_url: computedDestinationUrl,
          custom_color: custom_color || '#6589c5',
          background_color: background_color || '#FFFFFF',
          size: size || 300,
          error_level: error_level || 'M',
        },
      ])
      .select()
      .single()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('POST /api/qr-codes:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
