import React from 'react';
import { Button } from '@/components/ui/button';

export default function StorySection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex-1 flex justify-center">
        <img src="/images/story.jpg" alt="Farmer Joe Story" className="rounded-2xl object-cover w-full max-w-xl h-80 md:h-96" />
      </div>
      <div className="flex-1 max-w-xl">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900">Our Story</h2>
        <p className="text-3xl font-bold text-green-700 mb-4">Every drop should honor the cow that gave it <span className="text-base font-normal text-green-700">~ Joe Bento</span></p>
        <p className="text-lg text-gray-700 mb-8">
          Joe‘s parents migrated from Sao Jorge Azores in search of a better life. Joe’s dad worked in Modesto on a dairy while joe attended Ceres High School. Joe’s dad started his own dairy business on September 1, 1989. Joe worked on the family business until 1999 , then he left to Idaho and managed two dairy farms. Joe returned a few years later and helped start the Valley Gold Co Op and became Vice President. After leaving there Joe started working for a law office where he worked as the agricultural specialist for a few years. Once Joe left the law office he started his own dairy business , for past seven years the dairy business is thriving.
        </p>
        <Button className="bg-white border-2 border-orange-600 text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition">Meet farmer Joe</Button>
      </div>
    </section>
  );
}
