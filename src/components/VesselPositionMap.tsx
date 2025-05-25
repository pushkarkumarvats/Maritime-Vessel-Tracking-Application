import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface VesselPositionMapProps {
  vessel: any;
}

const VesselPositionMap: React.FC<VesselPositionMapProps> = ({ vessel }) => {
  // Create custom icon based on vessel type
  const createVesselIcon = () => {
    // Function to determine vessel color based on type
    const getVesselColor = (type: string) => {
      const typeMap: Record<string, string> = {
        'Cargo': '#16A34A',
        'Tanker': '#2563EB',
        'Passenger': '#8B5CF6',
        'Fishing': '#F39C12',
      };
      
      return typeMap[type] || '#71717A';
    };

    // Create a custom div with rotation based on heading
    const html = `
      <div class="vessel-marker" style="background-color: ${getVesselColor(vessel.type)}; transform: rotate(${vessel.heading}deg);">
        <div style="transform: rotate(-${vessel.heading}deg);">${vessel.name.charAt(0)}</div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'vessel-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <MapContainer
      center={[vessel.latitude, vessel.longitude]}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[vessel.latitude, vessel.longitude]}
        icon={createVesselIcon()}
      >
        <Popup>
          <div>
            <b>{vessel.name}</b><br />
            {vessel.status} at {vessel.speed} knots<br />
            Heading: {vessel.heading}°
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default VesselPositionMap;