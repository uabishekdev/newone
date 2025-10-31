"use client";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, memo } from "react";
import { BaseLocation } from "@/lib/types/location";

interface StoreMapProps {
  stores: BaseLocation[];
  center: { lat: number; lng: number };
  onStoreClick?: (store: BaseLocation) => void;
  selectedStore?: BaseLocation | null;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false, 
};

const defaultIconUrl = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
const selectedIconUrl =
  "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";

function StoreMapComponent({
  stores,
  center,
  onStoreClick,
  selectedStore: controlledSelectedStore,
}: StoreMapProps) {
  const [infoWindowStore, setInfoWindowStore] = useState<BaseLocation | null>(
    null
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={stores.length > 0 ? 9 : 8}
      options={mapOptions}
    >
      {stores.map((store) => {
        const lat = store.coordinates.coordinates[1];
        const lng = store.coordinates.coordinates[0];

        const isSelected =
          controlledSelectedStore &&
          controlledSelectedStore.id === store.id &&
          controlledSelectedStore.locationType === store.locationType;

        return (
          <Marker
            key={`${store.id}-${store.locationType}`}
            position={{ lat, lng }}
            onClick={() => {
              setInfoWindowStore(store);
              onStoreClick?.(store);
            }}
            icon={isSelected ? selectedIconUrl : defaultIconUrl}
            zIndex={isSelected ? 100 : 1}
          />
        );
      })}

      {infoWindowStore && (
        <InfoWindow
          position={{
            lat: infoWindowStore.coordinates.coordinates[1],
            lng: infoWindowStore.coordinates.coordinates[0],
          }}
          onCloseClick={() => setInfoWindowStore(null)}
        >
          <div className="p-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm">
                {infoWindowStore.locationName ||
                  infoWindowStore.address ||
                  "Location"}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  infoWindowStore.locationType === "farm"
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {infoWindowStore.locationType === "farm" ? "🌾" : "🏪"}
              </span>
            </div>
            {infoWindowStore.address && (
              <p className="text-xs text-gray-600 mt-1">
                {infoWindowStore.address}
              </p>
            )}
            {infoWindowStore.mobileNumber && (
              <p className="text-xs text-gray-600 mt-1">
                {infoWindowStore.mobileNumber}
              </p>
            )}
            {infoWindowStore.distanceInMiles !== undefined && (
              <p className="text-xs text-blue-600 font-semibold mt-1">
                {infoWindowStore.distanceInMiles.toFixed(1)} miles away
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export const StoreMap = memo(StoreMapComponent);