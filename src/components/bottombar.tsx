import { Heart } from "lucide-react"
import Link from "next/link"

export default function BottomBar() {
  return (
    <div className="border-t border-slate-700 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Rawabit. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline fill-current text-red-500" /> for bringing hearts together.
          </p>
          <div className="flex gap-8 text-sm">
            <Link href="/privacy" className="text-slate-400 hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-slate-400 hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="text-slate-400 hover:text-orange-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
