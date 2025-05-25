import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateMockVessels, generateVesselDetails } from '../utils/mockData';

// Define types
interface Vessel {
  id: string;
  name: string;
  imo: string;
  mmsi: string;
  callsign: string;
  type: string;
  flag: string;
  length: number;
  beam: number;
  draught: number;
  grossTonnage: number;
  deadWeight?: number;
  built?: string;
  status: string;
  speed: number;
  course: number;
  heading: number;
  latitude: number;
  longitude: number;
  destination?: string;
  eta?: string;
  lastUpdate: Date;
  recentActivity?: Array<{
    time: string;
    event: string;
    location: string;
  }>;
}

interface Filters {
  vesselTypes: string[];
  status: string[];
  flag: string[];
}

interface VesselContextType {
  vessels: Vessel[];
  filteredVessels: Vessel[];
  selectedVessel: Vessel | null;
  setSelectedVessel: (vessel: Vessel | null) => void;
  searchVessels: (term: string, filters: Filters) => void;
  getVesselById: (id: string) => Vessel | undefined;
  loadVesselDetails: (id: string) => void;
  isLoading: boolean;
}

// Create context
const VesselContext = createContext<VesselContextType | undefined>(undefined);

// Provider component
export const VesselProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [filteredVessels, setFilteredVessels] = useState<Vessel[]>([]);
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    const mockVessels = generateMockVessels(30);
    setVessels(mockVessels);
    setFilteredVessels(mockVessels);
    setIsLoading(false);

    // Set up interval to update vessel positions every 30 seconds
    const interval = setInterval(() => {
      setVessels(prevVessels => {
        return prevVessels.map(vessel => {
          // Simulate movement only for vessels that are moving
          if (vessel.status === 'moving' && vessel.speed > 0) {
            // Calculate new position based on heading and speed
            const latChange = vessel.speed * 0.0001 * Math.cos((vessel.heading * Math.PI) / 180);
            const lngChange = vessel.speed * 0.0001 * Math.sin((vessel.heading * Math.PI) / 180);
            
            return {
              ...vessel,
              latitude: vessel.latitude + latChange,
              longitude: vessel.longitude + lngChange,
              lastUpdate: new Date()
            };
          }
          return vessel;
        });
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Search and filter vessels
  const searchVessels = useCallback((term: string, filters: Filters) => {
    let results = [...vessels];
    
    // Apply text search
    if (term) {
      const searchLower = term.toLowerCase();
      results = results.filter(vessel => 
        vessel.name.toLowerCase().includes(searchLower) ||
        vessel.imo.includes(term) ||
        vessel.mmsi.includes(term)
      );
    }
    
    // Apply filters
    if (filters.vesselTypes.length > 0) {
      results = results.filter(vessel => filters.vesselTypes.includes(vessel.type));
    }
    
    if (filters.status.length > 0) {
      results = results.filter(vessel => filters.status.includes(vessel.status));
    }
    
    if (filters.flag.length > 0) {
      results = results.filter(vessel => filters.flag.includes(vessel.flag));
    }
    
    setFilteredVessels(results);
  }, [vessels]);

  // Get vessel by ID
  const getVesselById = useCallback((id: string) => {
    return vessels.find(vessel => vessel.id === id);
  }, [vessels]);

  // Load additional vessel details
  const loadVesselDetails = useCallback((id: string) => {
    setVessels(prevVessels => {
      return prevVessels.map(vessel => {
        if (vessel.id === id && !vessel.recentActivity) {
          const details = generateVesselDetails(vessel);
          return { ...vessel, ...details };
        }
        return vessel;
      });
    });
  }, []);

  return (
    <VesselContext.Provider
      value={{
        vessels: filteredVessels,
        filteredVessels,
        selectedVessel,
        setSelectedVessel,
        searchVessels,
        getVesselById,
        loadVesselDetails,
        isLoading
      }}
    >
      {children}
    </VesselContext.Provider>
  );
};

// Custom hook to use the vessel context
export const useVessels = () => {
  const context = useContext(VesselContext);
  if (context === undefined) {
    throw new Error('useVessels must be used within a VesselProvider');
  }
  return context;
};