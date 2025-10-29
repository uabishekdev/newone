import React from "react";

const testimonialText =
  'Being a professional body builder, I always care about the authenticity of what I am consuming. Knowing the source of the nutrients is an essential part of my daily routine. Since, Joe didn\'t try to sweeten the taste of his milk by using corn, or silage diet for cows, he became "the choice" for getting the Raw Milk in its purest form.';

export default function TestimonialSection() {
  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16">
        {/* Image Section */}
        <div className="w-full md:w-[45%]">
          <img
            src="/images/testimonial.jpg"
            alt="Bikki Singh"
            className="rounded-2xl object-cover w-full max-w-md h-[500px] md:h-[680px]"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-[55%] flex items-center">
          <div className="w-full">
            <p className="text-xl md:text-2xl font-medium text-[#2E2E2E] leading-relaxed md:leading-9 mb-6">
              {testimonialText}
            </p>

            <p className="text-xl md:text-2xl font-bold text-[#3E6E03]">
              ~ Bikki Singh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
