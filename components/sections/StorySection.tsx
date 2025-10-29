import React from "react";

const storyText =
  "Joe‘s parents migrated from Sao Jorge Azores in search of a better life. Joe’s dad worked in Modesto on a dairy while joe attended Ceres High School. Joe’s dad started his own dairy business on September 1, 1989. Joe worked on the family business until 1999 , then he left to Idaho and managed two dairy farms. Joe returned a few years later and helped start the Valley Gold Co Op and became Vice President. After leaving there Joe started working for a law office where he worked as the agricultural specialist for a few years. Once Joe left the law office he started his own dairy business , for past seven years the dairy business is thriving.";
const quote = "Every drop should honor the cow that gave it";
const quoteAuthor = "– Joe Bento";

export default function StorySection() {
  return (
    <section id="our-story" className="scroll-mt-16 md:scroll-mt-20 py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/images/farmer-joe.jpg"
            alt="Farmer Joe and a cow"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-5xl font-extrabold text-black mb-6">Our Story</h2>

          <blockquote className="mb-6 w-fit">
            <p className="text-4xl font-bold text-[#3E6E03]">{quote}</p>
            <cite className="block text-right  text-gray-700 italic ">
              {quoteAuthor}
            </cite>
          </blockquote>

          <p className="text-base text-[#525D6A] leading-normal mb-8">
            {storyText}
          </p>

          {/* <a
            href="#"
            className="inline-block w-fit py-3 px-4 
                       border border-[#E2B102] rounded-lg 
                       text-lg font-semibold text-[#3E6E03] 
                       no-underline transition-colors hover:bg-[#E2B102]/10"
          >
            Meet farmer Joe
          </a> */}
        </div>
      </div>
    </section>
  );
}
