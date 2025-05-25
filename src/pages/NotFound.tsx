import React from 'react';
import { Link } from 'react-router-dom';
import { AnchorIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <div className="text-center max-w-md px-4">
        <AnchorIcon className="w-16 h-16 mx-auto text-marine-600 mb-4" />
        <h1 className="text-3xl font-bold text-marine-800 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Looks like you've sailed into uncharted waters. This page doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-marine-600 text-white font-medium rounded-md hover:bg-marine-700 transition-colors"
        >
          Return to Map
        </Link>
      </div>
    </div>
  );
};

export default NotFound;