import { createClient } from '@/lib/supabase/server'

// GET - Fetch QR code details and analytics
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
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

    // Get QR code
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (qrError || !qrCode) {
      return new Response(JSON.stringify({ error: 'QR code not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get analytics
    const { data: analytics, error: analyticsError } = await supabase
      .from('qr_analytics')
      .select('*')
      .eq('qr_code_id', id)
      .order('scanned_at', { ascending: false })

    if (analyticsError) {
      return new Response(JSON.stringify({ error: analyticsError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        qr_code: qrCode,
        analytics: analytics || [],
        total_scans: qrCode.scan_count || 0,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('GET /api/qr-codes/[id]:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// PUT - Update QR code
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
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

    // Verify ownership
    const { data: existingQR, error: checkError } = await supabase
      .from('qr_codes')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (checkError || !existingQR) {
      return new Response(JSON.stringify({ error: 'QR code not found or unauthorized' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = await request.json()
    const { title, destination_url, custom_color, background_color, size, error_level } = body

    const { data, error } = await supabase
      .from('qr_codes')
      .update({
        ...(title && { title }),
        ...(destination_url && { destination_url }),
        ...(custom_color && { custom_color }),
        ...(background_color && { background_color }),
        ...(size && { size }),
        ...(error_level && { error_level }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

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
    console.error('PUT /api/qr-codes/[id]:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// DELETE - Delete QR code
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
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

    // Verify ownership
    const { data: existingQR, error: checkError } = await supabase
      .from('qr_codes')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (checkError || !existingQR) {
      return new Response(JSON.stringify({ error: 'QR code not found or unauthorized' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { error } = await supabase.from('qr_codes').delete().eq('id', id)

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: 'QR code deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('DELETE /api/qr-codes/[id]:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
