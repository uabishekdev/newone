"use client";

import { useFarm } from "@/lib/contexts/FarmContext";

export function HeroSection() {
  const { config } = useFarm();
  const theme = config.theme;

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/landingBanner.png"
          alt="Farm background"
          className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] md:object-[center_30%]"
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            theme.heroGradient ||
            "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.15) 100%)",
        }}
      />

      {/* Milk Bottles */}
      <div className="hidden lg:block absolute right-[5%] xl:right-[7%] 2xl:right-[8%] top-[64%] xl:top-[66%] -translate-y-1/2 w-[300px] xl:w-[340px] 2xl:w-[380px] h-[360px] xl:h-[420px] 2xl:h-[460px] z-20">
        <img
          src="/images/milk-bottle-large.png"
          alt="Raw Milk Bottles"
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))" }}
        />
      </div>

      <div className="absolute inset-0 z-30 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Content centered */}
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-[700px]">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold mb-3 md:mb-4 tracking-tight leading-none"
              style={{
                color: theme.colors.heroHeading || theme.colors.primary,
                textShadow:
                  "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 8px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              RAW MILK
            </h1>

            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[40px] font-bold text-white mb-6 md:mb-8 leading-tight tracking-wider flex items-center justify-center gap-2 sm:gap-3"
              style={{
                textShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              <span>PURE</span>
              <span
                className="inline-block bg-white rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  minWidth: "8px",
                  minHeight: "8px",
                }}
              />
              <span>ETHICAL</span>
              <span
                className="inline-block bg-white rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  minWidth: "8px",
                  minHeight: "8px",
                }}
              />
              <span>LOCAL</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="w-full sm:w-auto px-8 py-3 min-w-[180px] bg-white text-gray-800 font-semibold rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200 whitespace-nowrap text-base">
                Meet Farmer Joe
              </button>
              <button
                className="w-full sm:w-auto px-8 py-3 min-w-[180px] text-white font-semibold rounded-lg shadow-lg hover:opacity-90 hover:scale-105 transition-all duration-200 whitespace-nowrap text-base"
                style={{
                  backgroundColor:
                    theme.colors.heroButton || theme.colors.secondary,
                }}
              >
                Find nearest store
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 w-full">
        <div
          className="w-full py-4 sm:py-5 md:py-6 lg:py-7"
          style={{
            backgroundColor: theme.colors.heroBanner,
          }}
        >
          <div
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[38px] font-bold text-white text-center leading-tight px-4 tracking-wider flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
            style={{
              textShadow:
                "0px 4px 4px rgba(0, 0, 0, 0.30), 0px 8px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span>NO KILL</span>
            <span
              className="inline-block bg-white rounded-full"
              style={{
                width: "8px",
                height: "8px",
                minWidth: "8px",
                minHeight: "8px",
              }}
            />
            <span>NO CORN</span>
            <span
              className="inline-block bg-white rounded-full"
              style={{
                width: "8px",
                height: "8px",
                minWidth: "8px",
                minHeight: "8px",
              }}
            />
            <span>NO SOY</span>
            <span
              className="inline-block bg-white rounded-full"
              style={{
                width: "8px",
                height: "8px",
                minWidth: "8px",
                minHeight: "8px",
              }}
            />
            <span>NO SILAGE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
