'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useFarm } from '@/lib/contexts/FarmContext';

export function Header() {
  const { config } = useFarm();
  const theme = config.theme;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className="sticky top-0 z-50 border-b backdrop-blur-sm"
      style={{ 
        backgroundColor: theme.colors.cream + 'F5',
        borderColor: theme.colors.secondary + '30'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: theme.colors.primary }}
            >
              FJ
            </div>
            <div>
              <h1 
                className="text-xl font-bold leading-tight"
                style={{ color: theme.colors.brown, fontFamily: theme.fontDisplay }}
              >
                {config.name}
              </h1>
              <p className="text-xs text-gray-600">Pure • Ethical • Local</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
            <nav className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg" style={{ color: theme.colors.primary }}>{config.name}</span>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="ml-auto">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ul className="mt-6 space-y-2 px-4">
                <li>
                  <a href="/products" className="block py-2 px-4 rounded-lg font-semibold text-brown-700 hover:bg-brown-50 transition-all duration-200">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/stores" className="block py-2 px-4 rounded-lg font-semibold text-brown-700 hover:bg-brown-50 transition-all duration-200">
                    Stores
                  </a>
                </li>
                <li>
                  <a href="/distributor" className="block py-2 px-4 rounded-lg font-semibold text-brown-700 hover:bg-brown-50 transition-all duration-200">
                    Become a Distributor
                  </a>
                </li>
                <li>
                  <a href="/social" className="block py-2 px-4 rounded-lg font-semibold text-brown-700 hover:bg-brown-50 transition-all duration-200">
                    Social Media Posting
                  </a>
                </li>
                <li>
                  <a href="/locator" className="block py-2 px-4 rounded-lg font-semibold text-brown-700 hover:bg-brown-50 transition-all duration-200">
                    Store Locator
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
