import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import QRAnalyticsClient from '@/components/qr-analytics-client'

export default async function QRAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <QRAnalyticsClient user={user} qrCodeId={id} />
}
