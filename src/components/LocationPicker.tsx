import React, { useEffect, useRef, useState } from "react";
import { GeoLocation } from "@/types";
import { Loader2, Check, X, MapPin } from "lucide-react";
import { Button } from "./ui";

interface LocationPickerProps {
  onSelectLocation: (loc: GeoLocation) => void;
  onCancel: () => void;
}

export function LocationPicker({ onSelectLocation, onCancel }: LocationPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [addressName, setAddressName] = useState<string>("");
  const [addressCountry, setAddressCountry] = useState<string>("");
  
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current) return;

    // Center of East Africa / Kenya (Default initial view)
    const defaultLat = -1.2921;
    const defaultLng = 36.8219;

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: 7,
      zoomControl: true,
    });
    mapInstanceRef.current = map;

    // Load OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Setup standard icon styles to prevent Vite path resolution bugs
    const markerIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    setIsMapLoaded(true);

    // Handle map click events
    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;
      setSelectedCoords({ lat, lng });

      // Move or create the marker
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
      }

      // Smooth pan to clicked coordinate
      map.panTo([lat, lng]);

      // Reverse geocoding lookup
      setIsGeocoding(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          {
            headers: {
              "User-Agent": "FarmGuard-AI-App",
            },
          }
        );
        const data = await response.json();
        
        if (data && data.address) {
          const addr = data.address;
          const locName = addr.village || addr.suburb || addr.town || addr.city || addr.county || data.display_name || "Custom Point";
          const country = addr.country || "Unknown Country";
          
          setAddressName(locName);
          setAddressCountry(country);
        } else {
          setAddressName(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          setAddressCountry("Manual Coordinates");
        }
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        setAddressName(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
        setAddressCountry("Manual Coordinates");
      } finally {
        setIsGeocoding(false);
      }
    });

    // Detect user's current location to center map if allowed
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map.setView([lat, lng], 11);
        },
        (error) => {
          console.warn("Browser Geolocation blocked or unavailable:", error.message);
        }
      );
    }

    // Cleanup Leaflet instance on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleConfirm = () => {
    if (selectedCoords) {
      onSelectLocation({
        id: Date.now(),
        name: addressName || `Farm (${selectedCoords.lat.toFixed(4)}, ${selectedCoords.lng.toFixed(4)})`,
        latitude: selectedCoords.lat,
        longitude: selectedCoords.lng,
        country: addressCountry || "Selected Region",
      });
    }
  };

  return (
    <div className="border border-border rounded-2xl bg-white p-4 space-y-4 shadow-soft">
      <div className="flex justify-between items-center pb-2 border-b border-border">
        <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-primary" /> Interactive Map Picker
        </span>
        <button 
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-black/5 text-text-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Map Element */}
      <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-border bg-black/5">
        <div ref={mapContainerRef} className="w-full h-full z-10" />
        {(!isMapLoaded || !(window as any).L) && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-text-secondary text-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            Loading interactive map...
          </div>
        )}
      </div>

      {/* Selection Summary */}
      <div className="space-y-4">
        {selectedCoords ? (
          <div className="bg-[#355E3B]/5 border border-[#355E3B]/20 rounded-xl p-3 space-y-1">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-primary">Selected Spot</div>
            {isGeocoding ? (
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Resolving address name...
              </div>
            ) : (
              <div>
                <div className="font-medium text-text-primary text-[15px]">{addressName}</div>
                <div className="text-xs text-text-secondary">{addressCountry}</div>
              </div>
            )}
            <div className="text-[11px] font-mono text-text-secondary pt-1">
              LAT: {selectedCoords.lat.toFixed(6)} | LON: {selectedCoords.lng.toFixed(6)}
            </div>
          </div>
        ) : (
          <div className="text-center py-3 text-sm text-text-secondary border border-dashed border-border rounded-xl">
            Click anywhere on the map to drop your farm pin
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedCoords || isGeocoding}
            className="flex-1 h-11 text-sm rounded-xl py-0"
          >
            Confirm Spot
          </Button>
          <Button 
            onClick={onCancel} 
            variant="outline" 
            className="h-11 text-sm rounded-xl py-0 px-4"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
