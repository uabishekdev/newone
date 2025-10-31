"use client";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, memo } from "react";
import { DistributionLocation } from "@/lib/types/location";

interface StoreMapProps {
  stores: DistributionLocation[];
  center: { lat: number; lng: number };
  onStoreClick?: (store: DistributionLocation) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

function StoreMapComponent({ stores, center, onStoreClick }: StoreMapProps) {
  const [selectedStore, setSelectedStore] =
    useState<DistributionLocation | null>(null);

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

        return (
          <Marker
            key={store.id}
            position={{ lat, lng }}
            onClick={() => {
              setSelectedStore(store);
              onStoreClick?.(store);
            }}
          />
        );
      })}

      {selectedStore && (
        <InfoWindow
          position={{
            lat: selectedStore.coordinates.coordinates[1],
            lng: selectedStore.coordinates.coordinates[0],
          }}
          onCloseClick={() => setSelectedStore(null)}
        >
          <div className="p-2">
            <h3 className="font-bold text-sm">{selectedStore.locationName}</h3>
            {selectedStore.mobileNumber && (
              <p className="text-xs text-gray-600 mt-1">
                {selectedStore.mobileNumber}
              </p>
            )}
            {selectedStore.distanceInMiles !== undefined && (
              <p className="text-xs text-blue-600 font-semibold mt-1">
                {selectedStore.distanceInMiles.toFixed(1)} miles away
              </p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export const StoreMap = memo(StoreMapComponent);
