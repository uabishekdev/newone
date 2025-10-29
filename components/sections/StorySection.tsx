import React from 'react';
import { Button } from '@/components/ui/button';

export default function StorySection() {
  return (
    <section className="py-20 px-4 md:px-12 bg-gradient-to-br from-orange-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <img 
              src="/images/story.jpg" 
              alt="Farmer Joe Story" 
              className="rounded-3xl object-cover w-full h-[550px] shadow-2xl" 
            />
          </div>
          
          {/* Right - Content */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Our Story
            </h2>
            
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-[#228B22] leading-snug">
                Every drop should honor the cow that gave it
              </p>
              <p className="text-xl text-[#228B22]/80 italic">
                ~ Joe Bento
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Joe's parents migrated from Sao Jorge Azores in search of a better life. Joe's dad worked in Modesto on a dairy while Joe attended Ceres High School. Joe's dad started his own dairy business on September 1, 1989. Joe worked on the family business until 1999, then he left to Idaho and managed two dairy farms. Joe returned a few years later and helped start the Valley Gold Co Op and became Vice President. After leaving there Joe started working for a law office where he worked as the agricultural specialist for a few years. Once Joe left the law office he started his own dairy business, for past seven years the dairy business is thriving.
            </p>
            
            <div className="pt-4">
              <Button 
                variant="outline"
                className="border-2 border-[#FF6B35] text-[#FF6B35] font-semibold px-10 py-6 text-lg rounded-lg hover:bg-[#FF6B35] hover:text-white transition-all duration-300"
              >
                Meet farmer Joe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}