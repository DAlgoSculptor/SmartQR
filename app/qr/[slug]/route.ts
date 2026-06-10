import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

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
      console.error('QR code not found or database select failed:', qrError)
      return new Response('QR code not found', { status: 404 })
    }

    // Get client IP safely
    let ipAddress = null
    try {
      ipAddress = await getClientIp(request)
    } catch (ipErr) {
      console.warn('Could not parse client IP:', ipErr)
    }
    
    const userAgent = request.headers.get('user-agent')
    const referrer = request.headers.get('referer')

    // Insert analytics record safely inside try-catch to prevent crash
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && anonKey) {
      const analytics = {
        qr_code_id: qrCode.id,
        ip_address: ipAddress,
        user_agent: userAgent,
        referrer: referrer,
      }

      try {
        fetch(`${supabaseUrl}/rest/v1/qr_analytics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey || anonKey}`,
            'apikey': anonKey,
          },
          body: JSON.stringify(analytics),
        }).catch((e) => {
          console.warn('Async analytics insertion failed:', e)
        })
      } catch (fetchErr) {
        console.warn('Synchronous analytics fetch call failed:', fetchErr)
      }
    }

    // Increment scan count safely
    try {
      supabase
        .from('qr_codes')
        .update({ scan_count: (qrCode.scan_count || 0) + 1 })
        .eq('id', qrCode.id)
        .then()
        .catch((e) => {
          console.warn('Failed to update scan count:', e)
        })
    } catch (updateErr) {
      console.warn('Failed to invoke scan count update query:', updateErr)
    }

    // Redirect to destination safely (NextResponse.redirect requires an absolute URL)
    if (qrCode.destination_url) {
      let redirectUrl = qrCode.destination_url
      const requestUrl = new URL(request.url)
      
      // If the destination URL is an internal redirect page (files, social, menu),
      // force the domain to match the current request domain to prevent localhost redirects in production
      if (
        redirectUrl.includes('/files/') || 
        redirectUrl.includes('/social/') || 
        redirectUrl.includes('/menu/')
      ) {
        const pathIndex = redirectUrl.indexOf('/files/') !== -1 
          ? redirectUrl.indexOf('/files/') 
          : redirectUrl.indexOf('/social/') !== -1 
            ? redirectUrl.indexOf('/social/') 
            : redirectUrl.indexOf('/menu/')
        const pathPart = redirectUrl.substring(pathIndex)
        redirectUrl = `${requestUrl.origin}${pathPart}`
      }
      // If it's a relative URL, resolve it using request origin
      else if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
        redirectUrl = `${requestUrl.origin}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`
      }

      console.log('Redirecting to:', redirectUrl)
      return NextResponse.redirect(redirectUrl)
    }

    return new Response('No destination URL', { status: 400 })
  } catch (error) {
    console.error('QR redirect handler crashed:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
