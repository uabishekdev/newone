import React from 'react';

export default function RedBannerSection() {
  return (
    <section className="w-full h-64 md:h-80 bg-[#D2691E] flex items-center justify-center overflow-hidden">
      <img src="/images/farmer-joe.jpg" alt="Farmer Joe Banner" className="w-full h-full object-cover" />
    </section>
  );
}
