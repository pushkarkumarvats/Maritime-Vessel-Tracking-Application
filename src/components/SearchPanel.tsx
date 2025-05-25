import React, { useState, useEffect } from 'react';
import { X, Search, Filter, ChevronDown, CheckCheck } from 'lucide-react';
import { useVessels } from '../context/VesselContext';

interface SearchPanelProps {
  onClose: () => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onClose }) => {
  const { vessels, searchVessels } = useVessels();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    vesselTypes: [] as string[],
    status: [] as string[],
    flag: [] as string[]
  });

  // Get unique vessel types, statuses, and flags for filter options
  const vesselTypes = [...new Set(vessels.map(v => v.type))];
  const statuses = [...new Set(vessels.map(v => v.status))];
  const flags = [...new Set(vessels.map(v => v.flag))];

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter changes
  const toggleFilter = (type: 'vesselTypes' | 'status' | 'flag', value: string) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index >= 0) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
      
      return { ...prev, [type]: current };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      vesselTypes: [],
      status: [],
      flag: []
    });
    setSearchTerm('');
  };

  // Effect to perform search/filtering
  useEffect(() => {
    searchVessels(searchTerm, filters);
  }, [searchTerm, filters, searchVessels]);

  return (
    <div className="filter-panel">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-marine-800">Find Vessels</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by name, IMO or MMSI..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marine-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      
      <div className="mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {showFilters && (
          <div className="mt-3 space-y-4 p-3 bg-gray-50 rounded-md">
            {/* Vessel Types */}
            <div>
              <h3 className="font-medium mb-2 text-sm text-gray-700">Vessel Type</h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {vesselTypes.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={filters.vesselTypes.includes(type)}
                      onChange={() => toggleFilter('vesselTypes', type)}
                      className="rounded text-marine-600 focus:ring-marine-500"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Status */}
            <div>
              <h3 className="font-medium mb-2 text-sm text-gray-700">Status</h3>
              <div className="space-y-1">
                {statuses.map(status => (
                  <label key={status} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => toggleFilter('status', status)}
                      className="rounded text-marine-600 focus:ring-marine-500"
                    />
                    <span className="text-sm capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Flags */}
            <div>
              <h3 className="font-medium mb-2 text-sm text-gray-700">Flag</h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {flags.map(flag => (
                  <label key={flag} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={filters.flag.includes(flag)}
                      onChange={() => toggleFilter('flag', flag)}
                      className="rounded text-marine-600 focus:ring-marine-500"
                    />
                    <span className="text-sm">{flag}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              onClick={clearFilters}
              className="flex items-center text-sm text-marine-600 hover:text-marine-800"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
        <h3 className="font-medium text-sm text-gray-700">
          {vessels.length} vessels found
        </h3>
        
        {vessels.slice(0, 10).map(vessel => (
          <VesselListItem key={vessel.id} vessel={vessel} />
        ))}
        
        {vessels.length > 10 && (
          <p className="text-center text-xs text-gray-500 italic pt-2">
            Showing 10 of {vessels.length} vessels. Refine your search for more specific results.
          </p>
        )}
      </div>
    </div>
  );
};

interface VesselListItemProps {
  vessel: any;
}

const VesselListItem: React.FC<VesselListItemProps> = ({ vessel }) => {
  const { setSelectedVessel } = useVessels();
  
  return (
    <div 
      className="p-3 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-pointer border border-gray-200"
      onClick={() => setSelectedVessel(vessel)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{vessel.name}</h4>
          <p className="text-xs text-gray-600">{vessel.type} • {vessel.flag}</p>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`w-2 h-2 rounded-full ${vessel.status === 'moving' ? 'bg-status-moving' : vessel.status === 'anchored' ? 'bg-status-anchored' : 'bg-status-moored'}`}></span>
          <span className="text-xs capitalize">{vessel.status}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
        <span>IMO: {vessel.imo}</span>
        <span>{vessel.speed} knots</span>
      </div>
    </div>
  );
};

export default SearchPanel;