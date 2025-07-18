import React, { useState } from 'react';
import { Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
// Assuming these imports are correctly configured for your project
import { Candidate } from '../data/candidates';
import StatusBadge from './StatusBadge'; // Assuming StatusBadge is in this path

const CandidateTable = ({
  candidates,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  // State for the current sort field
  const [sortField, setSortField] = useState('name');
  // State for the current sort direction ('asc' or 'desc')
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc'); // Default to ascending when sorting a new field
    }
  };

  // Sort the candidates based on the current sort field and direction
  const sortedCandidates = [...candidates].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    // Compare values (handles strings and numbers naturally)
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0; // Values are equal
  });


  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      // Show a default icon if this field is not currently sorted
      return <ChevronUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />;
    }
    // Show up or down arrow based on sort direction for the active field
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : 
      <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
                <SortIcon field="name" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Applied Internship
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center space-x-1">
                <span>Status</span>
                <SortIcon field="status" />
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => handleSort('appliedDate')}
            >
              <div className="flex items-center space-x-1">
                <span>Applied Date</span>
                <SortIcon field="appliedDate" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedCandidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 animate-fadeIn">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center ring-2 ring-transparent hover:ring-indigo-500 transition-all duration-200">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {candidate.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{candidate.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.university}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{candidate.email}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{candidate.appliedInternship}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge 
                  status={candidate.status}
                  onChange={(newStatus) => onStatusChange(candidate.id, newStatus)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(candidate.appliedDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(candidate)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 p-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-all duration-200 hover:scale-110"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(candidate.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Message when no candidates are found */}
      {sortedCandidates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No candidates found</p>
        </div>
      )}
    </div>
  );
};

export default CandidateTable;
