"use client";

import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FarmProvider } from "@/lib/contexts/FarmContext";
import { FarmConfig } from "@/lib/types/farm";
import { StoreMap } from "@/components/map/StoreMap";
import { AddressAutocomplete } from "@/components/search/AddressAutocomplete";
import { BaseLocation } from "@/lib/types/location";
import { getAllLocations } from "@/lib/services/locationService";
import { Phone, MapPin, Loader2, AlertCircle } from "lucide-react";
import farmConfigData from "@/app/farms/farmer-joe/config.json";

const farmConfig = farmConfigData as FarmConfig;
const libraries: "places"[] = ["places"];

export default function StoresPage() {
  const [stores, setStores] = useState<BaseLocation[]>([]);
  const [selectedStore, setSelectedStore] = useState<BaseLocation | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef<string>("");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      loadAllStores();
    }
  }, [isLoaded]);

  const loadAllStores = async () => {
    setLoading(true);

    try {
      const response = await getAllLocations("");

      let allStores = response.allLocations.filter(
        (store) => store.locationType !== "user"
      );

      const seenIds = new Set<string>();
      allStores = allStores.filter((store) => {
        const uniqueId = `${store.id}-${store.locationType}`;
        if (seenIds.has(uniqueId)) {
          console.warn("Duplicate store found:", store.locationName, store.id);
          return false;
        }
        seenIds.add(uniqueId);
        return true;
      });

      if (allStores.length > 0) {
        setStores(allStores);
        const firstStore = allStores[0];
        setMapCenter({
          lat: firstStore.coordinates.coordinates[1],
          lng: firstStore.coordinates.coordinates[0],
        });
      } else {
        setStores([]);
        setMapCenter(null);
      }
    } catch (error) {
      setError("Unable to load stores. Please refresh the page.");
      setStores([]);
      setMapCenter(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = async (address: string) => {
    setError(null);
    setLoading(true);
    setHasSearched(true);

    try {
      const response = await getAllLocations(address);

      let allStores = response.allLocations.filter(
        (store) => store.locationType !== "user"
      );

      const seenIds = new Set<string>();
      allStores = allStores.filter((store) => {
        const uniqueId = `${store.id}-${store.locationType}`;
        if (seenIds.has(uniqueId)) {
          console.warn("Duplicate store found:", store.locationName, store.id);
          return false;
        }
        seenIds.add(uniqueId);
        return true;
      });

      console.log("=== STORES ORDER FROM API (after dedup) ===");
      allStores.forEach((s, i) => {
        console.log(`${i + 1}. ${s.locationName} - ${s.distanceInMiles} miles`);
      });

      if (allStores.length > 0) {
        setStores(allStores);

        if (response.searchCoordinates) {
          setMapCenter({
            lat: response.searchCoordinates.coordinates[1],
            lng: response.searchCoordinates.coordinates[0],
          });
        } else {
          const firstValidStore = allStores.find((s) => s.distanceInMiles > 0);
          if (firstValidStore) {
            setMapCenter({
              lat: firstValidStore.coordinates.coordinates[1],
              lng: firstValidStore.coordinates.coordinates[0],
            });
          }
        }

        const nearestStore = allStores.find((s) => s.distanceInMiles > 0);
        setSelectedStore(nearestStore || allStores[0]);
      } else {
        setError(
          "No stores found near this location. Try a different address."
        );
        setStores([]);
      }
    } catch (error) {
      setError("Unable to find location. Please try a different address.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    searchInputRef.current = value;
  };

  const handleGoClick = () => {
    const searchValue = searchInputRef.current.trim();
    if (searchValue) {
      handleAddressSelect(searchValue);
    } else {
      setError("Please enter an address or zipcode");
    }
  };

  const handleStoreClick = (store: BaseLocation) => {
    setSelectedStore(store);
    setMapCenter({
      lat: store.coordinates.coordinates[1],
      lng: store.coordinates.coordinates[0],
    });
  };

  const formatDistance = (distanceInMiles: number) => {
    return `${distanceInMiles.toFixed(1)} miles`;
  };

  const getLocationTypeLabel = (locationType: string) => {
    switch (locationType) {
      case "farm":
        return {  label: "Farm", color: "bg-green-500" };
      case "distribution":
        return { label: "Store", color: "bg-blue-500" };
      default:
        return { label: "Location", color: "bg-gray-500" };
    }
  };

  const isSameStore = (store1: BaseLocation | null, store2: BaseLocation) => {
    if (!store1) return false;
    return (
      store1.id === store2.id && store1.locationType === store2.locationType
    );
  };

  if (loadError) {
    return (
      <FarmProvider config={farmConfig}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-red-600">Error loading Google Maps script</p>
          </main>
          <Footer />
        </div>
      </FarmProvider>
    );
  }

  if (!isLoaded) {
    return (
      <FarmProvider config={farmConfig}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-orange-600" size={48} />
          </main>
          <Footer />
        </div>
      </FarmProvider>
    );
  }

  return (
    <FarmProvider config={farmConfig}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-900">
                Find nearest store
              </h1>
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-3">
                  <AddressAutocomplete
                    isLoaded={isLoaded}
                    onAddressSelect={handleAddressSelect}
                    onChange={handleSearchChange}
                    placeholder="Enter address or zipcode (e.g., 1010 10th St, Modesto, CA)"
                    disabled={loading}
                    countryCode="us"
                  />
                  <button
                    type="button"
                    onClick={handleGoClick}
                    disabled={loading}
                    className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Go"
                    )}
                  </button>
                </div>
                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle
                      className="text-red-600 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {hasSearched
                    ? "Stores sorted by distance from your location"
                    : "Search an address to find nearest stores"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row">
            <div className="w-full md:w-[400px] bg-white border-r overflow-y-auto max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-200px)]">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/images/logo.png" alt="Logo" className="h-10" />
                  <div>
                    <h2 className="font-bold text-lg">{farmConfig.name}</h2>
                    <p className="text-sm text-gray-600">
                      Where to get everything
                    </p>
                  </div>
                </div>

                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2
                      className="animate-spin text-orange-600"
                      size={32}
                    />
                  </div>
                )}

                {!loading && stores.length > 0 && (
                  <div className="mb-3 p-2 bg-blue-50 rounded">
                    <p className="text-xs text-blue-700">
                      {hasSearched
                        ? `Found ${stores.length} stores (sorted by distance)`
                        : `Showing ${stores.length} stores`}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {(() => {
                    const nearestIndex = stores.findIndex(
                      (s) => s.distanceInMiles > 0
                    );
                    return stores.map((store, index) => {
                      const locationTypeInfo = getLocationTypeLabel(
                        store.locationType
                      );
                      const isNearest = index === nearestIndex && hasSearched;
                      const uniqueKey = `${store.id}-${store.locationType}-${index}`;

                      return (
                        <div
                          key={uniqueKey}
                          onClick={() => handleStoreClick(store)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            isSameStore(selectedStore, store)
                              ? "bg-orange-50 border-orange-500"
                              : isNearest
                              ? "bg-green-50 border-green-400"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-white border border-gray-200">
                              <MapPin size={20} className="text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-sm">
                                    {store.locationName ||
                                      store.address ||
                                      "Location"}
                                  </h3>

                                  <span
                                    className={`px-2 py-0.5 ${locationTypeInfo.color} text-white text-xs font-bold rounded-full`}
                                  >
                                    {locationTypeInfo.label}
                                  </span>

                                  {isNearest && (
                                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                                      Nearest
                                    </span>
                                  )}
                                </div>
                                {hasSearched &&
                                  store.distanceInMiles !== undefined &&
                                  store.distanceInMiles > 0 && (
                                    <span className="text-xs font-bold text-blue-600 whitespace-nowrap">
                                      {formatDistance(store.distanceInMiles)}
                                    </span>
                                  )}
                              </div>
                              {store.address && (
                                <p className="text-xs text-gray-600 mb-1">
                                  {store.address}
                                </p>
                              )}
                              {store.mobileNumber && (
                                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                  <Phone size={12} />
                                  <span>{store.mobileNumber}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {!loading && stores.length === 0 && !error && (
                  <div className="text-center py-12">
                    <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No stores found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {mapCenter ? (
                <div className="flex-1 h-[400px] md:h-auto relative">
                  <StoreMap
                    stores={stores}
                    center={mapCenter}
                    selectedStore={selectedStore}
                    onStoreClick={handleStoreClick}
                  />
                  {stores.length > 0 && (
                    <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg z-10">
                      <p className="text-sm font-semibold">
                        {stores.length} location{stores.length !== 1 ? "s" : ""}
                      </p>
                      {hasSearched &&
                        stores[0] &&
                        stores[0].distanceInMiles !== undefined &&
                        stores[0].distanceInMiles > 0 && (
                          <p className="text-xs text-gray-600">
                            Nearest: {stores[0].distanceInMiles.toFixed(1)} mi
                          </p>
                        )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 h-[400px] md:h-auto flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Loading map...</p>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-orange-50 to-green-50 p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src="/images/milk-bottle-large.png"
                        alt="Milk bottle"
                        className="h-24 w-auto"
                      />
                      <div className="absolute -top-2 -right-2 bg-orange-500 rounded-full p-2">
                        <MapPin size={20} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    Didn't find a store nearby?
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    Don't worry – share your nearest store with us and we'll try
                    to get Joe's products on their shelves soon!
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const storeName = formData.get("storeName");
                      e.currentTarget.reset();
                    }}
                    className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
                  >
                    <input
                      type="text"
                      name="storeName"
                      placeholder="Enter store name"
                      required
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-gray-800"
                    />
                    <button
                      type="submit"
                      className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all whitespace-nowrap"
                    >
                      Send Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
