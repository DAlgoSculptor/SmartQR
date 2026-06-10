import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MailCheck, ArrowLeft, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-[#040508] text-foreground overflow-hidden relative flex flex-col justify-between">
      {/* Background grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none -z-10" />
      {/* Ambient subtle glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="hover:opacity-85 transition cursor-pointer">
              <span
                className="font-black tracking-tight text-2xl"
                style={{
                  background: 'linear-gradient(to right, #ea580c 0%, #ea580c 28%, transparent 36%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '0.8px rgba(255, 255, 255, 0.85)',
                  display: 'inline-block',
                }}
              >
                SmartQr
              </span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 rounded-xl transition-all duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="relative bg-[#08090d] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl text-center space-y-6 overflow-hidden animate-fade-in">
            {/* Ambient inner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px] pointer-events-none" />

            {/* Check Email Icon wrapper */}
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto animate-bounce">
              <MailCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                Check Your{' '}
                <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                  Email
                </span>
              </h2>
              <p className="text-xs text-foreground/45 font-medium max-w-xs mx-auto leading-relaxed pt-1">
                We sent a confirmation link to your inbox. Click the link in the message to activate your profile.
              </p>
            </div>

            <div className="pt-2 space-y-4">
              <p className="text-[11px] text-foreground/40 font-medium max-w-xs mx-auto leading-relaxed">
                After verifying your email address, you can sign in directly to organize your assets and download custom outputs.
              </p>
              
              <Link href="/auth/login" className="block w-full">
                <Button className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90 text-white text-xs font-bold rounded-xl py-5.5 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5">
                  Proceed to Login
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacer */}
      <div className="h-12" />
    </div>
  )
}
