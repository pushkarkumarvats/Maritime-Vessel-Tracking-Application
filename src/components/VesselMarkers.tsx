import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useVessels } from '../context/VesselContext';
import VesselStatusBadge from './VesselStatusBadge';

interface VesselMarkersProps {
  vessels: any[];
}

const VesselMarkers: React.FC<VesselMarkersProps> = ({ vessels }) => {
  const { selectedVessel, setSelectedVessel } = useVessels();
  const navigate = useNavigate();
  const map = useMap();

  // Create custom icon based on vessel type
  const createVesselIcon = (vessel: any) => {
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

  // Focus on selected vessel when it changes
  useEffect(() => {
    if (selectedVessel) {
      map.setView([selectedVessel.latitude, selectedVessel.longitude], 10);
    }
  }, [selectedVessel, map]);

  return (
    <>
      {vessels.map(vessel => (
        <Marker
          key={vessel.id}
          position={[vessel.latitude, vessel.longitude]}
          icon={createVesselIcon(vessel)}
          eventHandlers={{
            click: () => {
              setSelectedVessel(vessel);
            }
          }}
        >
          <Popup className="vessel-popup">
            <div className="w-60">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{vessel.name}</h3>
                <VesselStatusBadge status={vessel.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-1 text-sm mb-3">
                <div>
                  <span className="text-gray-600">Type:</span> {vessel.type}
                </div>
                <div>
                  <span className="text-gray-600">Flag:</span> {vessel.flag}
                </div>
                <div>
                  <span className="text-gray-600">IMO:</span> {vessel.imo}
                </div>
                <div>
                  <span className="text-gray-600">Speed:</span> {vessel.speed} knots
                </div>
              </div>
              
              <button
                className="w-full px-3 py-1 bg-marine-600 text-white rounded hover:bg-marine-700 transition-colors text-sm"
                onClick={() => navigate(`/vessel/${vessel.id}`)}
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default VesselMarkers;