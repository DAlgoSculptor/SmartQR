'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Sparkles, Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: any) => void
  actionName: string // e.g. 'Download', 'Copy', 'Save to Cloud'
}

export default function AuthModal({ isOpen, onClose, onSuccess, actionName }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const supabase = createClient()

    try {
      if (isLogin) {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        if (data.user) {
          onSuccess(data.user)
          onClose()
        }
      } else {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        
        // Supabase signs in automatically on signup if auto-confirm is enabled.
        // If it requires email confirmation, data.user might be present but unconfirmed.
        if (data.user && data.session) {
          onSuccess(data.user)
          onClose()
        } else {
          setSignUpSuccess(true)
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Container Card */}
      <div className="relative w-full max-w-md bg-[#08090d] border border-white/5 p-8 rounded-3xl shadow-2xl space-y-6 overflow-hidden animate-slide-in">
        {/* Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px] pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/40 hover:text-white rounded-xl p-2 hover:bg-white/[0.03] transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Authentication
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight leading-none mt-1">
            Unlock{' '}
            <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Unlimited Access
            </span>
          </h2>
          <p className="text-xs text-foreground/40 font-medium max-w-xs mx-auto leading-relaxed pt-1">
            Create a free account or login to complete your <span className="text-orange-400 font-bold">{actionName}</span>, customize logos, and track scans.
          </p>
        </div>

        {signUpSuccess ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Check your email</h3>
            <p className="text-xs text-foreground/50 leading-relaxed font-medium">
              We sent a confirmation link to <span className="text-white font-bold">{email}</span>. Click the link to activate your account and start generating.
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90 text-white font-bold text-xs rounded-xl py-3.5 cursor-pointer"
            >
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Toggle tabs */}
            <div className="grid grid-cols-2 bg-white/[0.02] border border-white/5 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isLogin ? 'bg-[#ea580c] text-white' : 'text-foreground/50 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  !isLogin ? 'bg-[#ea580c] text-white' : 'text-foreground/50 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div className="space-y-1.5 relative">
                <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider pl-1">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-foreground/30 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl pl-10 py-5 transition-all duration-300 placeholder:text-foreground/25 text-white font-medium text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 relative">
                <label className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider pl-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-foreground/30 pointer-events-none" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-white/10 bg-white/[0.01] focus-visible:border-orange-500/40 focus-visible:ring-orange-500/20 rounded-xl pl-10 py-5 transition-all duration-300 placeholder:text-foreground/25 text-white font-medium text-xs"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-[11px] text-red-500 bg-red-500/5 border border-red-500/10 p-3 rounded-xl font-medium leading-normal text-center">
                {error}
              </p>
            )}

            {/* Submit CTA */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ea580c] hover:bg-[#ea580c]/90 text-white text-xs font-bold rounded-xl py-4 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isLogin ? 'Authenticating...' : 'Registering...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In to Account' : 'Register Free Account'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
