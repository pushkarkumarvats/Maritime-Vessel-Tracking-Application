import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, AnchorIcon, Ship, Navigation, Info, BarChart3, History } from 'lucide-react';
import { useVessels } from '../context/VesselContext';
import VesselPositionMap from '../components/VesselPositionMap';
import VesselStatusBadge from '../components/VesselStatusBadge';

const VesselDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { vessels, getVesselById, loadVesselDetails } = useVessels();
  
  const vessel = getVesselById(id || '');
  
  useEffect(() => {
    if (id) {
      loadVesselDetails(id);
    }
  }, [id, loadVesselDetails]);
  
  if (!vessel) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Vessel Not Found</h2>
          <p className="text-gray-600 mb-4">The vessel you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-marine-600 text-white rounded-md hover:bg-marine-700">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center text-marine-600 hover:text-marine-800">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Map
        </Link>
        <VesselStatusBadge status={vessel.status} className="text-sm" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-marine-800">{vessel.name}</h1>
                  <p className="text-gray-600">
                    {vessel.type} • {vessel.flag} • IMO: {vessel.imo}
                  </p>
                </div>
                <Ship className="w-10 h-10 text-marine-600" />
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <VesselPositionMap vessel={vessel} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Navigation className="w-5 h-5 text-marine-600 mr-2" />
                <h2 className="text-lg font-semibold">Navigation Data</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed</span>
                  <span className="font-medium">{vessel.speed} knots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course</span>
                  <span className="font-medium">{vessel.course}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heading</span>
                  <span className="font-medium">{vessel.heading}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-medium">{vessel.destination || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA</span>
                  <span className="font-medium">{vessel.eta || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Info className="w-5 h-5 text-marine-600 mr-2" />
                <h2 className="text-lg font-semibold">Vessel Information</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">IMO</span>
                  <span className="font-medium">{vessel.imo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">MMSI</span>
                  <span className="font-medium">{vessel.mmsi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Call Sign</span>
                  <span className="font-medium">{vessel.callsign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flag</span>
                  <span className="font-medium">{vessel.flag}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Built</span>
                  <span className="font-medium">{vessel.built || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-5 h-5 text-marine-600 mr-2" />
              <h2 className="text-lg font-semibold">Specifications</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Length</span>
                <span className="font-medium">{vessel.length} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beam</span>
                <span className="font-medium">{vessel.beam} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Draught</span>
                <span className="font-medium">{vessel.draught} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gross Tonnage</span>
                <span className="font-medium">{vessel.grossTonnage} t</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dead Weight</span>
                <span className="font-medium">{vessel.deadWeight || 'N/A'} t</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <History className="w-5 h-5 text-marine-600 mr-2" />
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {vessel.recentActivity?.map((activity, index) => (
                <div key={index} className="border-l-2 border-marine-200 pl-4 pb-4">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-gray-600">{activity.location}</p>
                </div>
              )) || (
                <p className="text-gray-500 italic">No recent activity recorded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselDetails;