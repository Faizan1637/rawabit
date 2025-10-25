import {Heart} from "lucide-react"

export default function BottomBar() {
  return (
    <div className="border-t border-slate-700 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Rawabit. All rights reserved. Made with <Heart className="w-4 h-4 inline fill-current text-red-500" /> for bringing hearts together.
        </p>
        <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">Cookie Policy</a>
        </div>
        </div>
    </div>
  )
}
