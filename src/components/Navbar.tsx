import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnchorIcon, SearchIcon, Ship } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-marine-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Ship className="h-6 w-6" />
          <span>MarineTracker</span>
        </Link>
        
        {isHomePage && (
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="flex items-center space-x-1 bg-marine-600 hover:bg-marine-500 px-3 py-1.5 rounded-md transition-colors"
              title="Search Vessels"
            >
              <SearchIcon className="h-4 w-4" />
              <span>Search</span>
            </button>
            <button 
              className="flex items-center space-x-1 bg-marine-600 hover:bg-marine-500 px-3 py-1.5 rounded-md transition-colors"
              title="Active Vessels"
            >
              <AnchorIcon className="h-4 w-4" />
              <span>Active Vessels</span>
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <a 
            href="#" 
            className="bg-accent-500 hover:bg-accent-600 px-3 py-1.5 rounded-md transition-colors text-white font-medium"
          >
            Live Data
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;