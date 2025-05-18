import { useEffect, useState } from 'react';
import { CONTACT_INFO } from '@/lib/constants';

declare global {
  interface Window {
    L: any;
  }
}

// We'll use Leaflet, a lightweight open-source mapping library
const LocationMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the Leaflet CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    linkElement.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    linkElement.crossOrigin = '';
    document.head.appendChild(linkElement);

    // Dynamically load the Leaflet JavaScript
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;

    script.onload = () => {
      // Once Leaflet is loaded, initialize the map
      const L = window.L;
      
      // Create map instance
      const map = L.map('contact-map').setView([53.8047, -3.0509], 15);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add a marker for the bureau
      const marker = L.marker([53.8047, -3.0509]).addTo(map);
      
      // Add a popup with the bureau's name and address
      marker.bindPopup(`
        <strong>Citizens Information & Advice Bureau</strong><br>
        ${CONTACT_INFO.address}
      `).openPopup();
      
      setMapLoaded(true);
    };
    
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      document.body.removeChild(script);
      if (linkElement.parentNode) {
        document.head.removeChild(linkElement);
      }
    };
  }, []);

  return (
    <div 
      id="contact-map" 
      className="w-full h-[400px] rounded-lg shadow-md" 
      aria-label="Map showing the location of Citizens Information & Advice Bureau"
    >
      {!mapLoaded && (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;