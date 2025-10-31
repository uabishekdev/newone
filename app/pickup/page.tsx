// Path: app/pickup/page.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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

export default function PickupPage() {
  const [pickupData, setPickupData] = useState<{
    [day: string]: PickupLocation[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef<string>("");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    libraries,
  });

  const loadAllPickups = async () => {
    setError(null);
    setLoading(true);
    setHasSearched(false);

    try {
      const response = await getPickupLocations("");
      if (response.data && Object.keys(response.data).length > 0) {
        setPickupData(response.data);
      } else {
        setError("No pickup locations are currently available.");
        setPickupData({});
      }
    } catch (error) {
      setError(
        "Unable to load pickup locations. Please refresh the page."
      );
      setPickupData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      loadAllPickups();
    }
  }, [isLoaded]);

  const handleAddressSelect = async (address: string) => {
    if (!address) {
      setError("Please enter a valid address or zipcode.");
      return;
    }
    setError(null);
    setLoading(true);
    setHasSearched(true);

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

  const handleGoClick = () => {
    const searchValue = searchInputRef.current.trim();
    handleAddressSelect(searchValue);
  };

  const sortedDays = useMemo(
    () =>
      Object.keys(pickupData).sort((a, b) => {
        return dayOrder.indexOf(a) - dayOrder.indexOf(b);
      }),
    [pickupData]
  );

  const getNearestLabel = (location: PickupLocation) => {
    // Only show the label if a search has been performed AND the item is marked as nearest
    if (!hasSearched || !location.isNearest) return null;

    // Use the distanceInMiles from the location object
    return `Nearest you - ${Math.round(location.distanceInMiles)} miles`;
  };

  if (!apiKey) {
    return (
      <FarmProvider config={farmConfig}>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: farmConfig.theme.colors.cream }}
        >
          <Header />
          <main className="flex-1 w-full py-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-red-600">
                Google Maps API key is not configured. Please add
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.
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
          style={{ backgroundColor: farmConfig.theme.colors.cream }}
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
          style={{ backgroundColor: farmConfig.theme.colors.cream }}
        >
          <Header />
          <main className="flex-1 w-full py-16 flex items-center justify-center">
            <Loader2
              className="animate-spin"
              size={48}
              style={{ color: farmConfig.theme.colors.primary }}
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
        style={{ backgroundColor: farmConfig.theme.colors.cream }}
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
                style={{ color: farmConfig.theme.colors.secondary }}
              >
                Collect directly from a local pickup point.
              </p>

              <div className="max-w-3xl mx-auto mb-2">
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <AddressAutocomplete
                    isLoaded={isLoaded}
                    onAddressSelect={handleAddressSelect}
                    onChange={handleSearchChange}
                    placeholder="805 Blvd, Street 8A, Palo, 18239"
                    disabled={loading}
                    countryCode="us"
                  />
                  <button
                    type="button"
                    onClick={handleGoClick}
                    disabled={loading}
                    className="px-6 py-3 text-white font-semibold rounded-lg transition-all whitespace-nowrap text-base w-full sm:w-auto flex items-center justify-center"
                    style={{
                      backgroundColor: farmConfig.theme.colors.heroHeading,
                    }}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Find nearest pickup point"
                    )}
                  </button>
                </div>
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
                  style={{ color: farmConfig.theme.colors.primary }}
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
                          const nearestLabel = getNearestLabel(location);
                          const isNearest = !!nearestLabel; // Highlight only if the label exists
                          const nearestBg =
                            (farmConfig.theme.colors.heroHeading || "#E26102") +
                            "26";

                          return (
                            <div
                              key={location.id}
                              className="bg-white rounded-xl shadow-sm p-6 border-2 transition-all hover:shadow-md relative"
                              style={{
                                borderColor: isNearest
                                  ? farmConfig.theme.colors.heroHeading
                                  : "#E5E7EB",
                                backgroundColor: isNearest
                                  ? nearestBg
                                  : "#FFFFFF",
                              }}
                            >
                              <div className="absolute top-4 right-4">
                                <Navigation
                                  size={24}
                                  className="text-blue-600"
                                />
                              </div>

                              {nearestLabel && (
                                <div
                                  className="text-sm font-bold mb-3"
                                  style={{
                                    color: farmConfig.theme.colors.heroHeading,
                                  }}
                                >
                                  {nearestLabel}
                                </div>
                              )}

                              <div
                                className={`space-y-3 ${
                                  nearestLabel ? "" : "pt-1"
                                }`}
                              >
                                {location.address && (
                                  <p className="text-base font-semibold text-gray-900 leading-snug pr-8">
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && sortedDays.length === 0 && (
              <div className="text-center py-20">
                <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  {error
                    ? "Could not load locations"
                    : "No pickup locations found"}
                </p>
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
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