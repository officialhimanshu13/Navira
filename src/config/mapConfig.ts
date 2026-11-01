/**
 * NAVIRA Geospatial & Mapping Configuration
 * Supports OpenStreetMap, Esri World Satellite, and territory density heatmaps.
 * Optional Google Maps / Mapbox key can be configured via environment variables.
 */

export interface LocalityCoord {
  name: string;
  city: 'Chandigarh' | 'Mohali';
  lat: number;
  lng: number;
  businessCount: number;
  opportunityCount: number;
}

export const MAP_CONFIG = {
  defaultCenter: { lat: 30.7180, lng: 76.7450 }, // Central point between Chandigarh & Mohali
  defaultZoom: 13,
  googleMapsApiKey: (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || null,
  mapboxToken: (import.meta as any).env?.VITE_MAPBOX_TOKEN || null,
};

// Genuine geographic coordinates for Mohali & Chandigarh commercial clusters
export const LOCALITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Chandigarh
  'Sector 17': { lat: 30.7415, lng: 76.7821 },
  'Sector 35': { lat: 30.7242, lng: 76.7628 },
  'Sector 26': { lat: 30.7352, lng: 76.8042 },
  'Sector 8': { lat: 30.7483, lng: 76.7925 },
  'Sector 9': { lat: 30.7441, lng: 76.7882 },
  'Sector 22': { lat: 30.7301, lng: 76.7725 },
  'Sector 34': { lat: 30.7225, lng: 76.7690 },
  'Industrial Area Phase 1': { lat: 30.7055, lng: 76.8012 },
  'Industrial Area Phase 2': { lat: 30.6975, lng: 76.7925 },
  'Sector 15': { lat: 30.7510, lng: 76.7710 },
  'Sector 19': { lat: 30.7320, lng: 76.7915 },
  'Sector 20': { lat: 30.7250, lng: 76.7850 },
  'Sector 43': { lat: 30.7180, lng: 76.7490 },
  'Sector 44': { lat: 30.7120, lng: 76.7550 },
  // Mohali (SAS Nagar)
  'Phase 7': { lat: 30.7046, lng: 76.7179 },
  'Phase 3B2': { lat: 30.7180, lng: 76.7195 },
  'Phase 5': { lat: 30.7125, lng: 76.7265 },
  'Phase 8': { lat: 30.6990, lng: 76.7230 },
  'Phase 9': { lat: 30.6940, lng: 76.7285 },
  'Phase 10': { lat: 30.6885, lng: 76.7340 },
  'Phase 11': { lat: 30.6820, lng: 76.7395 },
  'Sector 70': { lat: 30.7012, lng: 76.7055 },
  'Sector 71': { lat: 30.6950, lng: 76.7110 },
  'Sector 67': { lat: 30.6890, lng: 76.7175 },
  'Sector 68': { lat: 30.6830, lng: 76.7235 },
  'Sector 82': { lat: 30.6820, lng: 76.7280 },
};

export function getCoordinatesForLocality(locality: string, city: string): { lat: number; lng: number } {
  for (const [key, coords] of Object.entries(LOCALITY_COORDINATES)) {
    if (locality.toLowerCase().includes(key.toLowerCase())) {
      return coords;
    }
  }
  return city === 'Chandigarh' ? { lat: 30.7333, lng: 76.7794 } : { lat: 30.7046, lng: 76.7179 };
}

