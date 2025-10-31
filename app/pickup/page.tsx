"use client";

import { useState, useMemo, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FarmProvider } from "@/lib/contexts/FarmContext";
import { FarmConfig } from "@/lib/types/farm";
import { AddressAutocomplete } from "@/components/search/AddressAutocomplete";
import { PickupLocation } from "@/lib/types/location";
import { getPickupLocations } from "@/lib/services/locationService";
import {
  Phone,
  Clock,
  Navigation,
  Loader2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import farmConfigData from "@/app/farms/farmer-joe/config.json";

const farmConfig = farmConfigData as FarmConfig;

const dayOrder = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const libraries: "places"[] = ["places"];

const PICKUP_COLORS = {
  background: farmConfig.theme.colors.cream || "#FFF8F0",
  heading: farmConfig.theme.colors.secondary || "#5E9A5C",
  loader: farmConfig.theme.colors.primary || "#D2691E",
  nearestBadge: "#FF8C42",
  nearestBorder: "#FF8C42",
  defaultBorder: "#E5E7EB",
};

export default function PickupPage() {
  const [pickupData, setPickupData] = useState<{
    [day: string]: PickupLocation[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<string>("");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    libraries,
  });

  const handleAddressSelect = async (address: string) => {
    setError(null);
    setLoading(true);

    try {
      const response = await getPickupLocations(address);

      if (response.data && Object.keys(response.data).length > 0) {
        setPickupData(response.data);
      } else {
        setError(
          "No pickup locations found near this address. Try a different location."
        );
        setPickupData({});
      }
    } catch (error) {
      setError(
        "Unable to find location. Please enter a valid address or zipcode."
      );
      setPickupData({});
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    searchInputRef.current = value;
  };

  const sortedDays = useMemo(
    () =>
      Object.keys(pickupData).sort((a, b) => {
        return dayOrder.indexOf(a) - dayOrder.indexOf(b);
      }),
    [pickupData]
  );

  const allLocationsSorted = useMemo(() => {
    return Object.values(pickupData)
      .flat()
      .sort((a, b) => a.distanceInMiles - b.distanceInMiles);
  }, [pickupData]);

  const nearestTwoIds = allLocationsSorted.slice(0, 2).map((loc) => loc.id);

  const isNearestTwo = (locationId: string) => {
    return nearestTwoIds.includes(locationId);
  };

  const getNearestLabel = (locationId: string) => {
    const index = allLocationsSorted.findIndex((loc) => loc.id === locationId);
    const location = allLocationsSorted[index];

    if (!location || location.distanceInMiles > 100) return null;

    if (index === 0 || index === 1) {
      return `Nearest you - ${Math.round(location.distanceInMiles)} miles`;
    }
    return null;
  };

  if (!apiKey) {
    return (
      <FarmProvider config={farmConfig}>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: PICKUP_COLORS.background }}
        >
          <Header />
          <main className="flex-1 w-full py-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-red-600">
                Google Maps API key is not configured.
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </FarmProvider>
    );
  }

  if (loadError) {
    return (
      <FarmProvider config={farmConfig}>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: PICKUP_COLORS.background }}
        >
          <Header />
          <main className="flex-1 w-full py-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-red-600">Error loading Google Maps script.</p>
            </div>
          </main>
          <Footer />
        </div>
      </FarmProvider>
    );
  }

  if (!isLoaded) {
    return (
      <FarmProvider config={farmConfig}>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: PICKUP_COLORS.background }}
        >
          <Header />
          <main className="flex-1 w-full py-16 flex items-center justify-center">
            <Loader2
              className="animate-spin"
              size={48}
              style={{ color: PICKUP_COLORS.loader }}
            />
          </main>
          <Footer />
        </div>
      </FarmProvider>
    );
  }

  return (
    <FarmProvider config={farmConfig}>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: PICKUP_COLORS.background }}
      >
        <Header />
        <main className="flex-1 w-full py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
                You can also
              </h1>
              <p
                className="text-3xl font-bold mb-8"
                style={{ color: PICKUP_COLORS.heading }}
              >
                Collect directly from a local pickup point.
              </p>

              <div className="max-w-2xl mx-auto mb-2">
                <AddressAutocomplete
                  isLoaded={isLoaded}
                  onAddressSelect={handleAddressSelect}
                  onChange={handleSearchChange}
                  placeholder="Enter address or zipcode (e.g., 1010 10th St, Modesto, CA)"
                  disabled={loading}
                  countryCode="us"
                />
              </div>

              {error && (
                <div className="max-w-2xl mx-auto mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle
                    className="text-red-600 flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-2">
                Enter a full address for best results
              </p>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  className="animate-spin"
                  size={48}
                  style={{ color: PICKUP_COLORS.loader }}
                />
              </div>
            )}

            {!loading && sortedDays.length > 0 && (
              <div className="space-y-8">
                {sortedDays.map((day) => {
                  const locations = pickupData[day];

                  return (
                    <div key={day}>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {day}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {locations.map((location) => {
                          const isNearest = isNearestTwo(location.id);
                          const nearestLabel = getNearestLabel(location.id);

                          return (
                            <div
                              key={location.id}
                              className="bg-white rounded-xl shadow-sm p-6 border-2 transition-all hover:shadow-md"
                              style={{
                                borderColor: isNearest
                                  ? PICKUP_COLORS.nearestBorder
                                  : PICKUP_COLORS.defaultBorder,
                              }}
                            >
                              {nearestLabel && (
                                <div
                                  className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 text-white"
                                  style={{
                                    backgroundColor: PICKUP_COLORS.nearestBadge,
                                  }}
                                >
                                  {nearestLabel}
                                </div>
                              )}

                              <div className="space-y-3">
                                {location.address && (
                                  <p className="text-base font-semibold text-gray-900 leading-snug">
                                    {location.address}
                                  </p>
                                )}

                                {location.pickupTimings && (
                                  <div className="flex items-center gap-2 text-gray-700">
                                    <Clock
                                      size={18}
                                      className="text-gray-500 flex-shrink-0"
                                    />
                                    <p className="text-sm font-medium">
                                      {location.pickupTimings}
                                    </p>
                                  </div>
                                )}

                                {location.mobileNumber && (
                                  <div className="flex items-center gap-2 text-gray-700">
                                    <Phone
                                      size={18}
                                      className="text-gray-500 flex-shrink-0"
                                    />
                                    <p className="text-sm">
                                      Call to post {location.mobileNumber}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <button className="w-full mt-5 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                                <Navigation size={18} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && sortedDays.length === 0 && !error && (
              <div className="text-center py-20">
                <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  Enter your address to find pickup locations
                </p>
              </div>
            )}

            <div className="mt-16 bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl shadow-sm p-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src="/images/milk-bottle-large.png"
                      alt="Milk bottle"
                      className="h-28 w-auto"
                    />
                    <div
                      className="absolute -top-3 -right-3 rounded-full p-2.5"
                      style={{
                        backgroundColor: farmConfig.theme.colors.secondary,
                      }}
                    >
                      <MapPin size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Didn't find a pickup point nearby?
                </h2>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Don't worry — share your location with us, and we'll try to
                  get Joe's products on their shelves soon!
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const storeName = formData.get("storeName");
                    e.currentTarget.reset();
                  }}
                  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                >
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Enter store name"
                    required
                    className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none text-gray-800 text-base"
                    style={{
                      borderColor: farmConfig.theme.colors.primary,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor =
                        farmConfig.theme.colors.primary;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                    }}
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 text-white font-bold rounded-lg transition-all whitespace-nowrap text-base"
                    style={{
                      backgroundColor: farmConfig.theme.colors.secondary,
                    }}
                  >
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
