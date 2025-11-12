'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Dropdown, Menu as AntMenu, Button } from 'antd';
import { useAuthContext } from '@/context/AuthContext';
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Something went wrong while logging out. Please try again.');
    }
  };

  // ✅ Ant Design Dropdown Menu
  const menuItems = (
    <AntMenu
      items={[
        {
          key: 'dashboard',
          label: (
            <Link href="/account/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          ),
        },
        {
          key: 'logout',
          label: (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 w-full text-left"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ),
        },
      ]}
    />
  );

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Left Section: Logo + Nav Links (Grouped Together) */}
        <div className="flex items-center gap-8 flex-1 justify-center md:justify-start">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Rawabit Logo"
              width={120}
              height={48}
              className="h-10 w-auto object-contain md:h-12 transition-transform duration-300 hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
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
        </div>

        {/* Right Side: User Dropdown / Mobile Menu */}
        <div className="flex items-center gap-4 relative">
          {!loading && isAuthenticated && (
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-border">
              <Dropdown overlay={menuItems} placement="bottomRight" arrow>
                <Button
                  type="text"
                  className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-amber-700">
                      {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.firstName ?? 'User'}
                  </span>
                </Button>
              </Dropdown>
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
                <Dropdown overlay={menuItems} placement="bottomRight" arrow>
                  <Button
                    type="text"
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-amber-50 rounded-md"
                  >
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {user?.firstName ?? 'User'}
                    </span>
                  </Button>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </nav>
);
}
