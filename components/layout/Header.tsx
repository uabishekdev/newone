"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useFarm } from "@/lib/contexts/FarmContext";

export function Header() {
  const { config } = useFarm();
  const theme = config.theme;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerBgStyle = {
    backgroundColor: theme.colors.cream + "F5",
    borderColor: theme.colors.secondary + "30",
  };

  const brownColor = { color: theme.colors.brown };

  const donateButtonStyle = {
    backgroundColor: "#FFFFFF",
    color: "#EC1C24",
    border: "1px solid #EC1C24",
  };

  const creamBg = { backgroundColor: theme.colors.cream };
  const borderColor = { borderColor: theme.colors.brown + "20" };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={headerBgStyle}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt={config.name}
                className="h-12 md:h-14 w-auto"
              />
            </div>

            <nav className="hidden lg:flex items-center gap-8 ml-8">
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, "products")}
                className="font-semibold hover:opacity-70 transition-opacity text-base"
                style={brownColor}
              >
                Products
              </a>
              <a
                href="/stores"
                className="font-semibold hover:opacity-70 transition-opacity text-base"
                style={brownColor}
              >
                Stores
              </a>
              <a
                href="/pickup"
                className="font-semibold hover:opacity-70 transition-opacity text-base"
                style={brownColor}
              >
                Pickup
              </a>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#our-story"
                onClick={(e) => handleNavClick(e, "our-story")}
                className="font-semibold hover:opacity-70 transition-opacity text-base"
                style={brownColor}
              >
                Meet Farmer Joe
              </a>
              <a
                href="https://ourcowsanctuary.org/?cause=chariti-foundation"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
                style={donateButtonStyle}
              >
                Donate to Cow Sanctuary
              </a>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} style={brownColor} />
              ) : (
                <Menu size={24} style={brownColor} />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <nav
            className="fixed top-0 right-0 z-50 h-full w-72 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden"
            style={creamBg}
          >
            <div
              className="flex items-center justify-between p-4 border-b"
              style={borderColor}
            >
              <span className="font-bold text-lg" style={brownColor}>
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" style={brownColor} />
              </button>
            </div>

            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <a
                    href="/products"
                    className="block py-3 px-4 rounded-lg font-semibold hover:bg-white/50 transition-all"
                    style={brownColor}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/stores"
                    className="block py-3 px-4 rounded-lg font-semibold hover:bg-white/50 transition-all"
                    style={brownColor}
                  >
                    Stores
                  </a>
                </li>
                <li>
                  <a
                    href="/pickup"
                    className="block py-3 px-4 rounded-lg font-semibold hover:bg-white/50 transition-all"
                    style={brownColor}
                  >
                    Pickup
                  </a>
                </li>
                <li>
                  <a
                    href="#our-story"
                    onClick={(e) => handleNavClick(e, "our-story")}
                    className="block py-3 px-4 rounded-lg font-semibold hover:bg-white/50 transition-all"
                    style={brownColor}
                  >
                    Meet Farmer Joe
                  </a>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t" style={borderColor}>
                <a
                  href="/donate"
                  className="block text-center py-3 px-4 rounded-lg font-bold hover:opacity-90 transition-opacity"
                  style={donateButtonStyle}
                >
                  Donate to Cow Sanctuary
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
