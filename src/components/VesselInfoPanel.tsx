import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import VesselStatusBadge from './VesselStatusBadge';

interface VesselInfoPanelProps {
  vessel: any;
  onClose: () => void;
}

const VesselInfoPanel: React.FC<VesselInfoPanelProps> = ({ vessel, onClose }) => {
  return (
    <div className="details-panel">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-marine-800">{vessel.name}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">{vessel.type}</span>
          <VesselStatusBadge status={vessel.status} />
        </div>
        <span className="text-sm text-gray-600">{vessel.flag}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
        <div>
          <span className="text-gray-600">IMO:</span> {vessel.imo}
        </div>
        <div>
          <span className="text-gray-600">MMSI:</span> {vessel.mmsi}
        </div>
        <div>
          <span className="text-gray-600">Call Sign:</span> {vessel.callsign}
        </div>
        <div>
          <span className="text-gray-600">Length:</span> {vessel.length}m
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md mb-4">
        <h3 className="font-medium text-sm mb-2">Current Position</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-gray-600">Latitude:</span> {vessel.latitude.toFixed(4)}°
          </div>
          <div>
            <span className="text-gray-600">Longitude:</span> {vessel.longitude.toFixed(4)}°
          </div>
          <div>
            <span className="text-gray-600">Speed:</span> {vessel.speed} knots
          </div>
          <div>
            <span className="text-gray-600">Course:</span> {vessel.course}°
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium text-sm mb-2">Destination</h3>
        <p className="text-sm">{vessel.destination || 'Not specified'}</p>
        {vessel.eta && (
          <p className="text-sm text-gray-600">ETA: {vessel.eta}</p>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium text-sm mb-2">Last Update</h3>
        <p className="text-sm">{new Date().toLocaleString()}</p>
      </div>
      
      <Link 
        to={`/vessel/${vessel.id}`} 
        className="inline-flex items-center w-full px-4 py-2 bg-marine-600 text-white rounded-md hover:bg-marine-700 justify-center"
      >
        View Full Details
        <ExternalLink className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default VesselInfoPanel;