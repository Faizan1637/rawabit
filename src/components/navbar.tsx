'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuthContext();
  const router = useRouter(); 

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Feedbacks', href: '/customer-feedback' },
    { label: 'Vlogs', href: '/vlog' },
    { label: 'Tutorials', href: '/tutorial' },
    { label: 'How-To-Register', href: '/register-info' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'Find Match', href: '/account/findpartner' },
  ];

  const guestLinks = !isAuthenticated
    ? [
        { label: 'Register', href: '/register' },
        { label: 'Login', href: '/login' },
      ]
    : [];

  const allNavItems = [...navItems, ...guestLinks];

  // ✅ Improved handleLogout with error handling
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Something went wrong while logging out. Please try again.');
    } finally {
      setDropdownOpen(false);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Rawabit Logo"
              className="h-10 w-auto object-contain md:h-12 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center justify-center flex-[0.8] gap-1">
            {allNavItems.map((item) => (
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

          {/* Right Side: User Dropdown / Mobile Menu */}
          <div className="flex items-center gap-4 relative">
            {!loading && isAuthenticated && (
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-border">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-amber-700">
                      {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.firstName ?? 'User'}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-14 right-0 w-48 bg-white border border-border rounded-xl shadow-lg">
                    <Link
                      href="/account/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-amber-50 text-foreground"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-left hover:bg-amber-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

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
              {allNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-amber-600 hover:bg-amber-50 rounded-md transition-all"
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated && (
                <div className="border-t border-border pt-2 mt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-amber-50 rounded-md"
                  >
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {user?.firstName ?? 'User'}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="flex flex-col mt-1 border-t border-border">
                      <Link
                        href="/account/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-amber-50"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-amber-50"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
