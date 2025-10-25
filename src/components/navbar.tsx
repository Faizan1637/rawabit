"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Lock } from "lucide-react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Feedbacks", href: "/customer-feedback" },
  { label: "Vlogs", href: "/vlog" },
  { label: "Tutorials", href: "/tutorial" },
  { label: "How-To-Register", href: "/register-info" },
  { label: "Contact", href: "/contact-us" },
  { label: "Find Match", href: "#" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Rawabit Logo"
              className="h-10 w-auto object-contain md:h-12 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-[0.8] gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground relative group transition-all duration-300 hover:text-amber-600"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Side: Profile + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* User Profile - Desktop */}
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-border hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">F</span>
              </div>
              <span className="text-sm font-medium text-foreground">Faizan</span>
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-accent/50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground relative pl-4 transition-all duration-300 hover:text-amber-600 hover:bg-amber-50/50 rounded-md group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400 to-orange-600 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <div className="flex items-center gap-2 px-3 py-2 hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground">F</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">Faizan</span>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
