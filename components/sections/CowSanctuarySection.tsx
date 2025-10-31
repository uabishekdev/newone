import React from "react";
import { Button } from "@/components/ui/button";
import { COW_SANCTUARY_DONATE_URL, COW_SANCTUARY } from "@/lib/constants";

export default function CowSanctuarySection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex-1 max-w-xl">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
          A Home for every Cow
        </h2>
        <a
          href={COW_SANCTUARY}
          rel="noopener noreferrer"
          target="_blank"
          className="text-3xl font-bold text-green-700 mb-4 block "
        >
          ourcowsanctuary.org
        </a>
        <p className="text-lg text-gray-700 mb-8">
          Our mission is to provide life-long care for the cows, and to educate
          the public about humane animal care and practices. We will find
          appropriate homes for them. In an effort to prevent further cruelty to
          these animals, we also educate the public on caring for companion
          animals as well as on issues concerning farm animals.
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href={COW_SANCTUARY_DONATE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button className="bg-white border-2 border-orange-600 text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition">
              Donate
            </Button>
          </a>
          {/* <Button className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">Adopt cows</Button> */}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-hidden max-w-full">
        <img
          src="/images/cowsanctuary.jpg"
          alt="Cow Sanctuary"
          className="rounded-2xl object-cover max-w-full max-h-[400px] w-auto h-auto"
          style={{ aspectRatio: "3/2", display: "block" }}
        />
      </div>
    </section>
  );
}
