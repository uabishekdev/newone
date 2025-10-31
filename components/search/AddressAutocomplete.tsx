"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface AddressAutocompleteProps {
  isLoaded: boolean;
  onAddressSelect: (
    address: string,
    coordinates?: { lat: number; lng: number }
  ) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  countryCode?: string;
}

export function AddressAutocomplete({
  isLoaded,
  onAddressSelect,
  onChange,
  onClear,
  placeholder = "Enter address or zipcode",
  disabled = false,
  countryCode = "us",
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const listenerRef = useRef<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      try {
        const options: google.maps.places.AutocompleteOptions = {
          componentRestrictions: { country: countryCode },
          fields: ["formatted_address", "geometry", "name"],
        };

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options
        );

        listenerRef.current = autocompleteRef.current.addListener(
          "place_changed",
          () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.formatted_address && place?.geometry?.location) {
              setQuery(place.formatted_address);
              const coords = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };
              onAddressSelect(place.formatted_address, coords);
            }
          }
        );
      } catch (error) {
        console.error("Error initializing autocomplete:", error);
      }
    }

    return () => {
      if (listenerRef.current) {
        window.google?.maps?.event?.removeListener(listenerRef.current);
      }
      if (inputRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(inputRef.current);
      }
    };
  }, [isLoaded, onAddressSelect, countryCode]);

  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        const geocoder = new google.maps.Geocoder();
        try {
          const result = await geocoder.geocode({ address: query });
          if (result.results[0]?.geometry?.location) {
            const coords = {
              lat: result.results[0].geometry.location.lat(),
              lng: result.results[0].geometry.location.lng(),
            };
            onAddressSelect(query, coords);
          } else {
            onAddressSelect(query);
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          onAddressSelect(query);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onChange?.(value);
  };

  return (
    <div className="relative flex-1">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!isLoaded || disabled}
          autoComplete="off"
          className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
