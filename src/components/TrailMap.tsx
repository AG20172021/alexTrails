import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Trail, Campsite } from '../types';

// Custom tent icon for campsites
const tentIconHtml = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; color: #2D6A4F;">
    <path d="M19 20L12 4 5 20"/>
    <path d="M8 20l4-8 4 8"/>
    <path d="M6 20h12"/>
  </svg>
`;

const createTentIcon = () => {
  return L.divIcon({
    html: `<div style="
      width: 32px;
      height: 32px;
      background: white;
      border: 2px solid #2D6A4F;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    ">${tentIconHtml}</div>`,
    className: 'custom-tent-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

interface TrailMapProps {
  trail: Trail;
  campsites: Campsite[];
  height?: string;
  className?: string;
}

export default function TrailMap({ trail, campsites, height = '400px', className = '' }: TrailMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{
    trailLayer: L.Polyline | null;
    campsiteMarkers: L.Marker[];
    startMarker: L.Marker | null;
    endMarker: L.Marker | null;
  }>({ trailLayer: null, campsiteMarkers: [], startMarker: null, endMarker: null });

  const trailData = useMemo(() => {
    if (!trail.trailPath || trail.trailPath.length === 0) return null;
    
    const latlngs = trail.trailPath.map(p => [p.lat, p.lng] as [number, number]);
    const bounds = L.latLngBounds(latlngs);
    
    return { latlngs, bounds };
  }, [trail.trailPath]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true
    });

    mapRef.current = map;

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    // Add USGS Topo layer
    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'USGS The National Map',
      maxZoom: 18,
      opacity: 0.6
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map content when trail or campsites change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !trailData) return;

    // Clear existing layers
    if (layersRef.current.trailLayer) {
      layersRef.current.trailLayer.remove();
    }
    layersRef.current.campsiteMarkers.forEach(marker => marker.remove());
    layersRef.current.campsiteMarkers = [];
    if (layersRef.current.startMarker) {
      layersRef.current.startMarker.remove();
    }
    if (layersRef.current.endMarker) {
      layersRef.current.endMarker.remove();
    }

    // Add trail polyline
    const trailPolyline = L.polyline(trailData.latlngs, {
      color: '#2D6A4F',
      weight: 4,
      opacity: 0.85,
      lineJoin: 'round',
      dashArray: '1'
    }).addTo(map);
    layersRef.current.trailLayer = trailPolyline;

    // Add start marker
    const startPoint = trailData.latlngs[0];
    const startMarker = L.marker(startPoint, {
      icon: L.divIcon({
        html: '<div style="background: #16A34A; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">S</div>',
        className: 'start-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    }).addTo(map);
    startMarker.bindPopup('<b>Trail Start</b><br>' + trail.name);
    layersRef.current.startMarker = startMarker;

    // Add end marker
    const endPoint = trailData.latlngs[trailData.latlngs.length - 1];
    const endMarker = L.marker(endPoint, {
      icon: L.divIcon({
        html: '<div style="background: #DC2626; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">E</div>',
        className: 'end-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    }).addTo(map);
    endMarker.bindPopup('<b>Trail End</b><br>' + trail.name);
    layersRef.current.endMarker = endMarker;

    // Add campsite markers
    campsites.forEach(campsite => {
      const marker = L.marker([campsite.coordinates.lat, campsite.coordinates.lng], {
        icon: createTentIcon()
      }).addTo(map);

      const popupContent = `
        <div style="min-width: 180px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #2D6A4F;">${campsite.name}</h4>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Mile:</strong> ${campsite.mileMarker}</p>
          <div style="display: flex; gap: 8px; margin: 8px 0; flex-wrap: wrap;">
            ${campsite.water ? '<span style="font-size: 11px; background: #DBEAFE; color: #1E40AF; padding: 2px 6px; border-radius: 4px;">Water</span>' : ''}
            ${campsite.fire ? '<span style="font-size: 11px; background: #FEF3C7; color: #92400E; padding: 2px 6px; border-radius: 4px;">Fire</span>' : ''}
            ${campsite.bearBox ? '<span style="font-size: 11px; background: #DBFAD5; color: #166534; padding: 2px 6px; border-radius: 4px;">Bear Box</span>' : ''}
            ${campsite.toilet ? '<span style="font-size: 11px; background: #F3E8FF; color: #7C3AED; padding: 2px 6px; border-radius: 4px;">Toilet</span>' : ''}
          </div>
          <p style="margin: 4px 0; font-size: 11px; color: #6B7280;">Capacity: ${campsite.capacity} • Rating: ⭐ ${campsite.rating}</p>
        </div>
      `;
      marker.bindPopup(popupContent);
      layersRef.current.campsiteMarkers.push(marker);
    });

    // Fit bounds to show entire trail
    const bounds = trailData.bounds;
    // Extend bounds to include campsites
    campsites.forEach(c => {
      bounds.extend([c.coordinates.lat, c.coordinates.lng]);
    });
    
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [trail, campsites, trailData]);

  return (
    <div 
      ref={mapContainerRef} 
      className={`trail-map ${className}`}
      style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}
    />
  );
}
