import React from 'react';
import { ChevronDown } from 'lucide-react';
// Assuming Candidate type is implicitly defined or imported from '../data/candidates'

// Define the Candidate type (or a relevant subset) using JSDoc for clarity
/**
 * @typedef {object} Candidate
 * @property {'Pending' | 'Approved' | 'Rejected'} status
 * // ... other properties of Candidate if needed elsewhere
 */

// Define the StatusBadgeProps structure using JSDoc
/**
 * @typedef {object} StatusBadgeProps
 * @property {Candidate['status']} status - The current status to display.
 * @property {(status: Candidate['status']) => void} [onChange] - Optional callback for when the status changes (if it's a selectable badge).
 */

/**
 * StatusBadge component displays a colored badge for a candidate's status.
 * It can also act as a dropdown to change the status if an `onChange` prop is provided.
 * @param {StatusBadgeProps} { status, onChange }
 * @returns {JSX.Element}
 */
const StatusBadge = ({ status, onChange }) => {
  /**
   * Returns Tailwind CSS classes for the badge's background and text color based on status.
   * @param {Candidate['status']} currentStatus - The status value.
   * @returns {string} - Tailwind CSS classes.
   */
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

  // If no onChange prop is provided, render a static badge (span)
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
        onChange={(e) => onChange(e.target.value)} // Cast to Candidate['status'] is implicit in JSX
        className={`appearance-none rounded-full text-xs font-medium px-2.5 py-0.5 pr-6 border-0 focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
          getStatusColor(status)
        }`}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      {/* Chevron icon for the dropdown, positioned absolutely */}
      <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-current pointer-events-none" />
    </div>
  );
};

export default StatusBadge;
