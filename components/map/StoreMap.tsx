"use client";

import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import { useState, memo, useEffect } from "react";
import { BaseLocation } from "@/lib/types/location";

interface StoreMapProps {
  stores: BaseLocation[];
  center: { lat: number; lng: number };
  onStoreClick?: (store: BaseLocation) => void;
  selectedStore?: BaseLocation | null;
  farmLocation?: { lat: number; lng: number } | null;
  customerLocation?: { lat: number; lng: number } | null;
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
const selectedIconUrl = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";

function StoreMapComponent({
  stores,
  center,
  onStoreClick,
  selectedStore: controlledSelectedStore,
  farmLocation,
  customerLocation,
}: StoreMapProps) {
  const [hoveredStore, setHoveredStore] = useState<BaseLocation | null>(null);
  const [hoveredFarm, setHoveredFarm] = useState(false);

  useEffect(() => {
    console.log("Stores count:", stores.length);
  }, [stores, center, farmLocation, customerLocation]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={customerLocation ? 10 : stores.length > 0 ? 9 : 8}
      options={mapOptions}
    >
      {stores.map((store) => {
        const lat = store.coordinates.coordinates[1];
        const lng = store.coordinates.coordinates[0];

        const isSelected =
          controlledSelectedStore &&
          controlledSelectedStore.id === store.id &&
          controlledSelectedStore.locationType === store.locationType;

        const isHovered = hoveredStore?.id === store.id && hoveredStore?.locationType === store.locationType;

        return (
          <div key={`${store.id}-${store.locationType}`}>
            <Marker
              position={{ lat, lng }}
              onClick={() => {
                onStoreClick?.(store);
              }}
              onMouseOver={() => setHoveredStore(store)}
              onMouseOut={() => setHoveredStore(null)}
              icon={isSelected ? selectedIconUrl : defaultIconUrl}
              zIndex={isSelected ? 100 : 1}
            />
            {isHovered && (
              <InfoWindow
                position={{ lat, lng }}
                options={{ 
                  disableAutoPan: true,
                  pixelOffset: new google.maps.Size(0, -40)
                }}
              >
                <div className="p-2" style={{ pointerEvents: 'none' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm">
                      {store.locationName || store.address || "Location"}
                    </h3>
                  </div>
                  {store.address && (
                    <p className="text-xs text-gray-600 mt-1">{store.address}</p>
                  )}
                  {store.mobileNumber && (
                    <p className="text-xs text-gray-600 mt-1">{store.mobileNumber}</p>
                  )}
                  {store.distanceInMiles !== undefined && store.distanceInMiles > 0 && (
                    <p className="text-xs text-blue-600 font-semibold mt-1">
                      {store.distanceInMiles.toFixed(1)} miles away
                    </p>
                  )}
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}

      {farmLocation && (
        <div>
          <Marker
            position={farmLocation}
            onMouseOver={() => setHoveredFarm(true)}
            onMouseOut={() => setHoveredFarm(false)}
            icon={{
              url: "/images/logo.png",
              scaledSize: new google.maps.Size(50, 50),
              anchor: new google.maps.Point(25, 25),
            }}
            zIndex={200}
          />
          {hoveredFarm && (
            <InfoWindow
              position={farmLocation}
              options={{ 
                disableAutoPan: true,
                pixelOffset: new google.maps.Size(0, -25)
              }}
            >
              <div className="p-2" style={{ pointerEvents: 'none' }}>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm">Farm Location</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">Our Main Farm</p>
              </div>
            </InfoWindow>
          )}
        </div>
      )}

      {customerLocation && (
        <>
          <Circle
            center={customerLocation}
            radius={3000}
            options={{
              fillColor: "#EF4444",
              fillOpacity: 0.2,
              strokeColor: "#DC2626",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              clickable: false,
            }}
          />
          <Marker
            position={customerLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#EF4444",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 3,
            }}
            zIndex={150}
            title="Your Search Location"
          />
        </>
      )}
    </GoogleMap>
  );
}

export const StoreMap = memo(StoreMapComponent);