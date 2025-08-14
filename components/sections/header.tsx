'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '#lineup', label: 'Lineup' },
    { href: '#tickets', label: 'Tickets' },
    { href: '#location', label: 'Location' },
    { href: 'https://givebutter.com/swwafestival', label: 'Donate', external: true },
  ];

  return (
    <>
      <header className="fixed top-0 z-50 w-full px-6 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo_2x-100-nobg.png"
              alt="Start Where We Are Festival Logo"
              width={150}
              height={50}
              className="object-contain transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink 
                    href={item.href} 
                    target={item.external ? "_blank" : undefined}
                    className="px-4 py-2 text-lg hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </header>

      {/* Mobile Menu Button - Outside header for proper z-index */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed right-6 top-6 z-[80] p-2"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span 
            className={`block h-0.5 w-full bg-current transform transition-all duration-300 origin-center absolute top-0 ${
              isMobileMenuOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-full bg-current transition-all duration-300 absolute top-1/2 -translate-y-1/2 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-full bg-current transform transition-all duration-300 origin-center absolute bottom-0 ${
              isMobileMenuOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile Sidebar Overlay - Invisible click area */}
      <div 
        className={`fixed inset-0 z-[60] md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full w-72 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l border-border z-[70] md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-lg hover:bg-accent rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links in Sidebar */}
          <div className="mt-auto mb-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Follow us</p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/startwherewearefestival/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}