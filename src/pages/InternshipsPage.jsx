import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { internships as initialInternships } from '../data/internships'; // Import initial internship data
import InternshipCard from '../components/InternCard'; // Import InternshipCard component
import InternshipModal from '../components/InternModal'; // Import InternshipModal component

// Define the Internship type using JSDoc for clarity
/**
 * @typedef {object} Internship
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} department
 * @property {string} location
 * @property {string} duration
 * @property {string} status - 'Open' or 'Closed'
 * @property {number} applicants
 * @property {string} description
 * @property {number} stipend
 */

// InternshipsPage functional component
// This component manages the entire internship listing page including filtering and CRUD operations
const InternshipsPage = () => {
  // State to manage the list of internships
  const [internships, setInternships] = useState(initialInternships);
  // State for search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State for department filter dropdown
  const [departmentFilter, setDepartmentFilter] = useState('all');
  // State for status filter dropdown
  const [statusFilter, setStatusFilter] = useState('all');
  // State to control modal visibility (open/closed)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold internship data when editing (null for new internship)
  const [editingInternship, setEditingInternship] = useState(null);

  // Dynamically extract unique departments from the internships list for filter dropdown
  const departments = Array.from(new Set(internships.map(internship => internship.department)));

  // Filter internships based on search term and filter selections
  const filteredInternships = internships.filter(internship => {
    // Check if title or department matches the search term (case-insensitive)
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.department.toLowerCase().includes(searchTerm.toLowerCase());
    // Check if department matches the selected filter
    const matchesDepartment = departmentFilter === 'all' || internship.department === departmentFilter;
    // Check if status matches the selected filter
    const matchesStatus = statusFilter === 'all' || internship.status === statusFilter;

    // Return true only if all conditions are met
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handler function for adding a new internship
  const handleAddInternship = (internshipData) => {
    // Create a new internship object with a unique ID
    const newInternship = {
      ...internshipData,
      id: Date.now().toString() // Simple unique ID generation using timestamp
    };
    // Add the new internship to the existing list
    setInternships([...internships, newInternship]);
    // Close the modal after successful addition
    setIsModalOpen(false);
  };

  // Handler function for updating an existing internship
  const handleUpdateInternship = (internshipData) => {
    if (editingInternship) {
      // Map over internships and update the one that matches the editingInternship's ID
      setInternships(internships.map(internship =>
        internship.id === editingInternship.id ? { ...internshipData, id: editingInternship.id } : internship
      ));
      // Clear editing state
      setEditingInternship(null);
      // Close the modal after successful update
      setIsModalOpen(false);
    }
  };

  // Handler function for initiating internship edit
  const handleEditInternship = (internship) => {
    // Set the internship to be edited
    setEditingInternship(internship);
    // Open the modal for editing
    setIsModalOpen(true);
  };

  // Handler function for deleting an internship
  const handleDeleteInternship = (id) => {
    // Filter out the internship with the specified ID
    setInternships(internships.filter(internship => internship.id !== id));
  };

  // Handler function for opening the modal to post a new internship
  const handlePostNewInternship = () => {
    // Ensure no internship is being edited when opening for new post
    setEditingInternship(null);
    // Open the modal
    setIsModalOpen(true);
  };

  // Handler function for closing the modal
  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
    // Clear editing state when modal closes
    setEditingInternship(null);
  };

  return (
    <>
      {/* Page Header Section: Combines title, description, and the "Post New Internship" button */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 px-6 sm:px-0 mb-6">
        {/* Left side content (title and description) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full"> {/* Adjusted for responsive order */}
          <div className="flex flex-col order-1 sm:order-none"> {/* This div will stack h1 and p on small screens */}
            <h1 className="text-2xl font-bold text-gray-900">Internships Overview</h1>
            <p className="mt-2 text-sm text-gray-600">
              Explore and manage all available internship programs.
            </p>
          </div>
          {/* Primary action button - positioned using order classes for responsive layout */}
          <button
            onClick={handlePostNewInternship}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-103 transition-colors duration-200 mt-4 sm:mt-0 order-2 sm:order-none" // order-2 on small screens, normal order on sm and up
          >
            <Plus className="h-4 w-4 mr-2" /> {/* Plus icon */}
            Post New Internship
          </button>
        </div>
      </div>

      {/* Main container for the internships page content */}
      <div className="space-y-6">
        {/* Filters and Search section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mx-6 sm:mx-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Search input with search icon */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full sm:w-auto"
              />
            </div>

            {/* Filter controls and results count */}
            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
              {/* Department filter dropdown with filter icon */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none bg-white w-full sm:w-auto"
                >
                  <option value="all">All Departments</option>
                  {departments.map(department => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>

              {/* Status filter dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none bg-white w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Display count of filtered vs total internships */}
              <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
                {filteredInternships.length} of {internships.length} internships
              </div>
            </div>
          </div>
        </div>

        {/* Internship Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-0">
          {filteredInternships.map(internship => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onEdit={handleEditInternship}
              onDelete={handleDeleteInternship}
            />
          ))}
        </div>

        {/* Empty state message when no internships match the filters */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12 px-6 sm:px-0">
            <p className="text-gray-500">No internships found matching your criteria</p>
          </div>
        )}

        {/* Internship Modal for adding/editing internships */}
        <InternshipModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          // Pass either handleUpdateInternship or handleAddInternship based on editing state
          onSubmit={editingInternship ? handleUpdateInternship : handleAddInternship}
          internship={editingInternship} // Pass the internship object if editing, null for new
        />
      </div>
    </>
  );
};

export default InternshipsPage;
