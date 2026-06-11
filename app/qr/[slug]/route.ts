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
        referer: referrer,
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

      // Parse custom_color config for tracking pixels
      let metaPixelId = ''
      let googleAnalyticsId = ''
      let tiktokPixelId = ''
      let linkedinPixelId = ''

      if (qrCode.custom_color && qrCode.custom_color.startsWith('{')) {
        try {
          const config = JSON.parse(qrCode.custom_color)
          metaPixelId = config.metaPixelId || ''
          googleAnalyticsId = config.googleAnalyticsId || ''
          tiktokPixelId = config.tiktokPixelId || ''
          linkedinPixelId = config.linkedinPixelId || ''
        } catch (e) {
          console.warn('Failed to parse custom_color JSON in redirect:', e)
        }
      }

      const hasPixels = metaPixelId || googleAnalyticsId || tiktokPixelId || linkedinPixelId

      if (hasPixels) {
        console.log('Servicing pixel-tracking redirect for:', redirectUrl)
        
        // Escape single quotes in title for javascript string literal safety
        const safeTitle = (qrCode.title || '').replace(/'/g, "\\'")

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting securely | SmartQR</title>
  
  ${metaPixelId ? `
  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${metaPixelId}');
    fbq('track', 'PageView');
    fbq('track', 'QRScan', { qrSlug: '${slug}', qrTitle: '${safeTitle}', qrType: '${qrCode.qr_type}' });
  </script>
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1"/></noscript>
  ` : ''}

  ${googleAnalyticsId ? `
  <!-- Google Analytics Tag -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${googleAnalyticsId}');
    gtag('event', 'qr_scan', { 'qr_slug': '${slug}', 'qr_title': '${safeTitle}', 'qr_type': '${qrCode.qr_type}' });
  </script>
  ` : ''}

  ${tiktokPixelId ? `
  <!-- TikTok Pixel Code -->
  <script>
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","trackWithQuery","select","to","use","register","setAnonymousClientId"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||[],ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=r;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${tiktokPixelId}');
      ttq.page();
      ttq.track('QRScan', { qrSlug: '${slug}', qrTitle: '${safeTitle}', qrType: '${qrCode.qr_type}' });
    }(window, document, 'ttq');
  </script>
  ` : ''}

  ${linkedinPixelId ? `
  <!-- LinkedIn Insight Tag -->
  <script type="text/javascript">
    _linkedin_partner_id = "${linkedinPixelId}";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  </script>
  <script type="text/javascript">
    (function(l) {
    if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
    window.lintrk.q=[]}
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);})(window.lintrk);
  </script>
  ` : ''}

  <style>
    :root {
      --bg: #040508;
      --foreground: #ffffff;
      --copper: #ea580c;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg);
      color: var(--foreground);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .glow {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(234, 88, 12, 0.05) 0%, rgba(0, 0, 0, 0) 70%);
      pointer-events: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .card {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 2.5rem;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(255, 255, 255, 0.01);
      backdrop-filter: blur(12px);
      max-width: 380px;
      width: 90%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .spinner-container {
      position: relative;
      width: 64px;
      height: 64px;
      margin: 0 auto 1.5rem;
    }
    .spinner {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(234, 88, 12, 0.15);
      border-top-color: var(--copper);
      animation: spin 1s linear infinite;
    }
    .spinner-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      color: var(--copper);
    }
    h2 {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.5;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    .badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      color: var(--copper);
      background: rgba(234, 88, 12, 0.1);
      border: 1px solid rgba(234, 88, 12, 0.2);
      padding: 4px 12px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="glow"></div>
  <div class="card">
    <div class="spinner-container">
      <div class="spinner"></div>
      <svg class="spinner-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m0 11v2m8-8h-1M5 12H4m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h2>Redirecting Securely</h2>
    <p>Loading destination and syncing marketing analytics. Please wait a moment.</p>
    <div class="badge">Powered by SmartQR</div>
  </div>

  <script>
    setTimeout(function() {
      window.location.href = ${JSON.stringify(redirectUrl)};
    }, 850);
  </script>
</body>
</html>`;

        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        })
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
