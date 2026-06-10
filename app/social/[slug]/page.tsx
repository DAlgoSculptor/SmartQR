import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Linkedin, Github, Twitter, Instagram, Facebook, Globe, ShieldCheck } from 'lucide-react'

interface SocialLink {
  platform: string
  url: string
}

interface SocialData {
  type: string
  profileName: string
  bio: string
  links: SocialLink[]
}

async function getQRCode(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching public QR code:', error)
      return { qrCode: null, error: error.message }
    }
    return { qrCode: data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching QR code:', err)
    return { qrCode: null, error: 'Database fetch failed' }
  }
}

const getPlatformDetails = (platform: string) => {
  switch (platform) {
    case 'linkedin':
      return {
        icon: <Linkedin className="w-5 h-5" />,
        bgColor: 'hover:bg-[#0077b5]/10',
        borderColor: 'hover:border-[#0077b5]/40',
        textColor: 'group-hover:text-[#0077b5]',
        name: 'LinkedIn',
      }
    case 'github':
      return {
        icon: <Github className="w-5 h-5" />,
        bgColor: 'hover:bg-white/10',
        borderColor: 'hover:border-white/40',
        textColor: 'group-hover:text-white',
        name: 'GitHub',
      }
    case 'twitter':
      return {
        icon: <Twitter className="w-5 h-5" />,
        bgColor: 'hover:bg-[#1da1f2]/10',
        borderColor: 'hover:border-[#1da1f2]/40',
        textColor: 'group-hover:text-[#1da1f2]',
        name: 'Twitter',
      }
    case 'instagram':
      return {
        icon: <Instagram className="w-5 h-5" />,
        bgColor: 'hover:bg-[#e1306c]/10',
        borderColor: 'hover:border-[#e1306c]/40',
        textColor: 'group-hover:text-[#e1306c]',
        name: 'Instagram',
      }
    case 'facebook':
      return {
        icon: <Facebook className="w-5 h-5" />,
        bgColor: 'hover:bg-[#1877f2]/10',
        borderColor: 'hover:border-[#1877f2]/40',
        textColor: 'group-hover:text-[#1877f2]',
        name: 'Facebook',
      }
    default:
      return {
        icon: <Globe className="w-5 h-5" />,
        bgColor: 'hover:bg-orange-500/10',
        borderColor: 'hover:border-orange-500/30',
        textColor: 'group-hover:text-[#ea580c]',
        name: 'Website / Portfolio',
      }
  }
}

export default async function SocialViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { qrCode, error } = await getQRCode(slug)

  if (error && error.includes('Row-level security policy')) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground">
        <div className="glass p-8 rounded-2xl max-w-lg text-center space-y-6 border border-red-500/20">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Database RLS Policy Required</h1>
          <p className="text-foreground/70 text-sm leading-relaxed">
            The platform is trying to fetch this QR code, but Supabase Row-Level Security (RLS) is blocking public access.
          </p>
          <div className="bg-black/50 p-4 rounded-xl text-left border border-white/5 font-mono text-xs overflow-x-auto">
            <p className="text-green-400 font-semibold mb-1">-- Run this in your Supabase SQL Editor:</p>
            <code>
              CREATE POLICY "Allow public select of QR codes by slug"<br />
              &nbsp;&nbsp;ON public.qr_codes FOR SELECT USING (true);
            </code>
          </div>
          <p className="text-xs text-foreground/50">
            Once this policy is created, refresh this page.
          </p>
        </div>
      </main>
    )
  }

  if (!qrCode) {
    notFound()
  }

  let socialData: SocialData
  try {
    socialData = typeof qrCode.qr_data === 'string'
      ? JSON.parse(qrCode.qr_data)
      : qrCode.qr_data
  } catch (e) {
    console.error('Failed to parse social link tree data', e)
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <p className="text-foreground/70">Invalid QR code content.</p>
      </main>
    )
  }

  // Get initials for profile placeholder avatar
  const initials = socialData.profileName
    ? socialData.profileName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'QR'

  return (
    <main className="min-h-screen bg-[#040508] text-foreground py-16 px-4 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Background grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />

      {/* Background decorations */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Profile Container */}
      <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
        {/* Profile Avatar & Header */}
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 p-[3px] mx-auto shadow-xl shadow-orange-500/10">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-bold text-3xl tracking-wide text-white">
              {initials}
            </div>
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">{socialData.profileName || 'Anonymous'}</h1>
            {socialData.bio && (
              <p className="text-sm text-foreground/70 max-w-sm mx-auto leading-relaxed text-balance">
                {socialData.bio}
              </p>
            )}
          </div>
        </div>

        {/* Links Stack */}
        <div className="space-y-4">
          {socialData.links && socialData.links.length > 0 ? (
            socialData.links.map((link, idx) => {
              const details = getPlatformDetails(link.platform)
              // Ensure URL begins with http or https
              const destination = link.url.startsWith('http') ? link.url : `https://${link.url}`
              
              return (
                <a
                  key={idx}
                  href={destination}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className={`w-full bg-[#08090d]/60 backdrop-blur-md p-5 rounded-2xl border border-white/5 flex items-center justify-between transition-all duration-300 transform group-hover:scale-[1.01] group-hover:-translate-y-0.5 group-hover:shadow-lg ${details.bgColor} ${details.borderColor}`}>
                    <div className="flex items-center gap-4">
                      <div className={`text-foreground/50 transition-colors duration-300 ${details.textColor}`}>
                        {details.icon}
                      </div>
                      <span className={`font-semibold text-sm text-foreground/90 transition-colors duration-300 ${details.textColor}`}>
                        {details.name}
                      </span>
                    </div>
                    <div className={`text-foreground/30 transition-colors duration-300 ${details.textColor}`}>
                      →
                    </div>
                  </div>
                </a>
              )
            })
          ) : (
            <div className="bg-[#08090d]/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 text-center text-foreground/50 text-sm">
              No social links added yet.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#ea580c] flex items-center justify-center text-white font-black text-xs shadow-md shadow-orange-500/20">
              Q
            </div>
            <span className="font-semibold text-xs tracking-wider opacity-60">SmartQR Platform</span>
          </div>
        </div>
      </div>
    </main>
  )
}
