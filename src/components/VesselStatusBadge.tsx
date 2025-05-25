import React from 'react';

interface VesselStatusBadgeProps {
  status: string;
  className?: string;
}

const VesselStatusBadge: React.FC<VesselStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'moving':
        return 'bg-status-moving/10 text-status-moving border-status-moving';
      case 'anchored':
        return 'bg-status-anchored/10 text-status-anchored border-status-anchored';
      case 'moored':
        return 'bg-status-moored/10 text-status-moored border-status-moored';
      case 'underway':
        return 'bg-status-underway/10 text-status-underway border-status-underway';
      case 'aground':
        return 'bg-status-aground/10 text-status-aground border-status-aground';
      default:
        return 'bg-status-unknown/10 text-status-unknown border-status-unknown';
    }
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default VesselStatusBadge;