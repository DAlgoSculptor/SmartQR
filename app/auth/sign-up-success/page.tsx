import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MailCheck } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background text-foreground">
      <div className="w-full max-w-md">
        <Card className="glass border-white/10 text-center shadow-xl">
          <CardHeader className="space-y-4 pt-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto animate-bounce">
              <MailCheck className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">Check Your Email</CardTitle>
            <CardDescription className="text-base text-foreground/60 leading-relaxed">
              We've sent a verification link to your email. Please click the link in the email to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 space-y-6">
            <p className="text-sm text-foreground/50">
              Once verified, you will be able to log in and start generating and tracking your QR codes.
            </p>
            <Link href="/auth/login" className="block w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
