'use client';

import { useFarm } from '@/lib/contexts/FarmContext';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  const { config } = useFarm();
  const theme = config.theme;

  return (
    <footer 
      className="py-12 text-white"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: theme.fontDisplay }}>
              {config.name}
            </h3>
            <p className="text-sm opacity-90">
              {config.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#products" className="hover:opacity-70">Products</a></li>
              <li><a href="#about" className="hover:opacity-70">Our Story</a></li>
              <li><a href="#locations" className="hover:opacity-70">Find Stores</a></li>
              <li><a href="#distributor" className="hover:opacity-70">Become a Distributor</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>{config.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>{config.contact.phone}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {config.social.facebook && (
                <a href={`https://facebook.com/${config.social.facebook}`} className="hover:opacity-70">
                  <Facebook size={24} />
                </a>
              )}
              {config.social.instagram && (
                <a href={`https://instagram.com/${config.social.instagram}`} className="hover:opacity-70">
                  <Instagram size={24} />
                </a>
              )}
              {config.social.youtube && (
                <a href={`https://youtube.com/${config.social.youtube}`} className="hover:opacity-70">
                  <Youtube size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
