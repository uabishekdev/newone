import React from 'react';

export default function TestimonialSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-4 md:px-12 max-w-5xl mx-auto">
      <div className="flex-1 flex justify-center">
        <img src="/images/testimonial.jpg" alt="Testimonial" className="rounded-2xl object-cover w-full max-w-md h-80 md:h-96" />
      </div>
      <div className="flex-1 max-w-xl bg-black rounded-2xl p-8 text-left">
        <p className="text-lg text-gray-200 mb-6">
          Being a professional body builder, I always care about the authenticity of what I am consuming. Knowing the source of the nutrients is an essential part of my daily routine. Since, Joe didn’t try to sweeten the taste of his milk by using corn, or silage diet for cows, he became “the choice” for getting the Raw Milk in its purest form.
        </p>
        <p className="text-2xl font-bold text-green-600">~ Bikki Singh</p>
      </div>
    </section>
  );
}
