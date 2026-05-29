import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function getClientIp(request: Request): Promise<string | null> {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip')
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug

  try {
    const supabase = await createClient()

    // Get QR code by slug
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('slug', slug)
      .single()

    if (qrError || !qrCode) {
      return new Response('QR code not found', { status: 404 })
    }

    // Get client IP
    const ipAddress = await getClientIp(request)
    const userAgent = request.headers.get('user-agent')
    const referrer = request.headers.get('referer')

    // Insert analytics record (without await to not slow down redirect)
    const analytics = {
      qr_code_id: qrCode.id,
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer: referrer,
    }

    // Use Fetch API to insert analytics asynchronously without blocking redirect
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/qr_analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
      body: JSON.stringify(analytics),
    }).catch(() => {
      // Silently fail if analytics insertion fails, don't block redirect
    })

    // Increment scan count
    supabase
      .from('qr_codes')
      .update({ scan_count: qrCode.scan_count + 1 })
      .eq('id', qrCode.id)
      .then()
      .catch(() => {
        // Silently fail
      })

    // Redirect to destination
    if (qrCode.destination_url) {
      redirect(qrCode.destination_url)
    }

    return new Response('No destination URL', { status: 400 })
  } catch (error) {
    console.error('QR redirect error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
