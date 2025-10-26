'use client';

import { Button } from '@/components/ui/button';
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="font-semibold hover:opacity-70 transition" style={{ color: theme.colors.brown }}>
              Products
            </a>
            <a href="#stores" className="font-semibold hover:opacity-70 transition" style={{ color: theme.colors.brown }}>
              Stores
            </a>
            <Button 
              variant="default"
              style={{ backgroundColor: theme.colors.secondary }}
            >
              Become a Distributor
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <a href="#products" className="font-semibold" style={{ color: theme.colors.brown }}>
                Products
              </a>
              <a href="#stores" className="font-semibold" style={{ color: theme.colors.brown }}>
                Stores
              </a>
              <Button 
                variant="default"
                style={{ backgroundColor: theme.colors.secondary }}
              >
                Become a Distributor
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
