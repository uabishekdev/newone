"use client";

import { useFarm } from "@/lib/contexts/FarmContext";
import { useEffect, useState } from "react";

export function Footer() {
  const { config } = useFarm();
  const theme = config.theme;
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const footerStyle = {
    backgroundColor: theme.colors.primary,
    backgroundImage: "url('/images/footer.png')",
    backgroundSize: isMobile ? "contain" : "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    minHeight: isMobile ? "700px" : "auto",
    paddingTop: isMobile ? "2rem" : "4rem",
    paddingBottom: isMobile ? "3rem" : "4rem",
  };

  return (
    <footer className="text-white" style={footerStyle}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 mb-8 md:mb-12">
          {/* Column 1: Logo, Address, Social */}
          <div className="space-y-4 md:space-y-6">
            <img
              src="/images/logo.png"
              alt={config.name}
              className="w-[110px] md:w-[135px]"
            />

            <div>
              <h4 className="font-bold mb-2 text-base">Address</h4>
              {/* UPDATED to use config */}
              <p className="text-sm opacity-90 leading-relaxed">
                {config.contact?.address?.line1 || "7506 Maze Boulevard,"}
                <br />
                {config.contact?.address?.cityState || "Modesto, CA"}
              </p>
            </div>

            {/* UPDATED to use config */}
            <div className="flex gap-3">
              {config.social?.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:opacity-70 transition-opacity"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Marketplace Links (Unchanged) */}
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-base">Marketplace</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a
                  href="#products"
                  onClick={(e) => handleNavClick(e, "products")}
                  className="hover:opacity-70 transition-opacity"
                >
                  Our products
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Store finder
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Our farm
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Pickup points
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Campaign Links */}
          {/* UPDATED to use config */}
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-base">Campaigns</h4>
            <ul className="space-y-2 text-sm opacity-90">
              {config.footerLinks?.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Find Store Form */}
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-base">
              Find nearest store
            </h4>
            {/* UPDATED to be disabled, as per code review */}
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Address"
                className="flex-grow bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled 
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-md text-sm font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-70"
                style={{
                  backgroundColor: theme.colors.primary || "#D94A22",
                }}
                disabled
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}