// app/forgot-password/page.tsx
import ForgotPasswordForm from "@/components/ForgotPasswordForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Back to Login Link */}
      <Link 
        href="/login"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Login
      </Link>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
