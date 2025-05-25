import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import SearchPanel from '../components/SearchPanel';
import VesselMarkers from '../components/VesselMarkers';
import { useVessels } from '../context/VesselContext';
import VesselInfoPanel from '../components/VesselInfoPanel';

const MapView: React.FC = () => {
  const { vessels, selectedVessel, setSelectedVessel } = useVessels();
  const [searchVisible, setSearchVisible] = useState(true);

  // Initial map position (Atlantic Ocean)
  const initialPosition = { lat: 40.7128, lng: -28.0060, zoom: 4 };

  return (
    <div className="relative">
      <MapContainer
        center={[initialPosition.lat, initialPosition.lng]}
        zoom={initialPosition.zoom}
        zoomControl={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <VesselMarkers vessels={vessels} />
      </MapContainer>

      {/* Search and Filter Panel */}
      {searchVisible && (
        <SearchPanel onClose={() => setSearchVisible(false)} />
      )}

      {/* Vessel Info Panel */}
      {selectedVessel && (
        <VesselInfoPanel 
          vessel={selectedVessel}
          onClose={() => setSelectedVessel(null)}
        />
      )}

      {/* Toggle search panel button (mobile) */}
      {!searchVisible && (
        <button
          className="absolute top-4 left-4 z-[999] bg-white p-2 rounded-md shadow-md"
          onClick={() => setSearchVisible(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MapView;