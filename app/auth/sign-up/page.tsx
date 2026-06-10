'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Mail, Lock, Loader2, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

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

      {/* Main content form */}
      <div className="flex-1 flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="relative bg-[#08090d] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl space-y-6 overflow-hidden">
            {/* Ambient inner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px] pointer-events-none" />

            {/* Title section */}
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Registry
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mt-1">
                Create{' '}
                <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                  Account
                </span>
              </h2>
              <p className="text-xs text-foreground/40 font-medium max-w-xs mx-auto leading-relaxed pt-1">
                Register a free credentials profile to unlock analytics tracking and unlimited custom files.
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-3.5">
                {/* Email field */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider pl-1">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-4 h-4 text-foreground/30 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl pl-11 py-5.5 transition-all duration-300 placeholder:text-foreground/25 text-white font-medium text-xs"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider pl-1">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-foreground/30 pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl pl-11 py-5.5 transition-all duration-300 placeholder:text-foreground/25 text-white font-medium text-xs"
                    />
                  </div>
                </div>

                {/* Repeat Password field */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider pl-1">Repeat Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-foreground/30 pointer-events-none" />
                    <Input
                      id="repeat-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl pl-11 py-5.5 transition-all duration-300 placeholder:text-foreground/25 text-white font-medium text-xs"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-[11px] text-red-500 bg-red-500/5 border border-red-500/10 p-3 rounded-xl font-medium leading-normal text-center">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90 text-white text-xs font-bold rounded-xl py-4 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-white/5 mt-4">
              <span className="text-xs text-foreground/40 font-medium">Already have an account? </span>
              <Link
                href="/auth/login"
                className="text-xs font-bold text-[#ea580c] hover:text-[#ea580c]/90 transition-colors"
              >
                Login
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
