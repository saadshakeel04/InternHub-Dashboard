import React from 'react';
import { ChevronDown } from 'lucide-react';

const StatusBadge = ({ status, onChange }) => {

  const getStatusColor = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // If no onChange prop is provided return simple
  if (!onChange) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        getStatusColor(status)
      }`}>
        {status}
      </span>
    );
  }

  // If onChange prop is provided, render a selectable dropdown
  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)} 
        className={`appearance-none rounded-full text-xs font-medium px-2.5 py-0.5 pr-6 border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
          getStatusColor(status)
        }`}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-current pointer-events-none" />
      
    </div>
  );
};

export default StatusBadge;
