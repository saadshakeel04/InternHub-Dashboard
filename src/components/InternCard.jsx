import React from 'react';
import { Calendar, Banknote, Users, MapPin, Edit2, Trash2 } from 'lucide-react';

// Props are directly destructured from the argument object
const InternshipCard = ({ internship, onEdit, onDelete }) => {

  // gets the color of status
  const getStatusColor = (status) => {
    // Convert status to lowercase
    const lowerCaseStatus = status.toLowerCase();
    return lowerCaseStatus === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (

    // Main card
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* styling*/}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{internship.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {internship.department}
            </div>
          </div>
          {/* Statusbadge dynamically colored based on status */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(internship.status)}`}>
            {internship.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {internship.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" /> {/* Calendar icon */}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Banknote className="h-4 w-4 mr-2" /> 
            {internship.stipend}/month
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" /> 
            {internship.applicants} applicants
          </div>
        </div>

        {/* last section in card*/}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Posted {new Date(internship.postedDate).toLocaleDateString()} {/* Formatted posted date */}
          </div>
          <div className="flex space-x-2">

            {/* Edit Button */}
            <button
              onClick={() => onEdit(internship)} // Calls the current internship object
              className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
            >
              <Edit2 className="h-4 w-4" /> {/* Edit icon */}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(internship.id)} // Calls the internship ID
              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;