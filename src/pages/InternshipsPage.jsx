import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { internships as initialInternships } from '../data/internships'; // Import initial internship data
import InternshipCard from '../components/InternCard'; // Import InternshipCard component
import InternshipModal from '../components/InternModal'; // Import InternshipModal component


// InternshipsPage functional component
const InternshipsPage = () => {
  // State to manage the list of internships
  const [internships, setInternships] = useState(initialInternships);
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for department filter
  const [departmentFilter, setDepartmentFilter] = useState('all');
  // State for status filter
  const [statusFilter, setStatusFilter] = useState('all');
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold internship data when editing
  const [editingInternship, setEditingInternship] = useState(null);

  // Dynamically get unique departments from the internships list
  const departments = Array.from(new Set(internships.map(i => i.department)));

  // Filtered internships based on search term and filters
  const filteredInternships = internships.filter(internship => {
    // Check if title or department matches the search term (case-insensitive)
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.department.toLowerCase().includes(searchTerm.toLowerCase());
    // Check if department matches the selected filter
    const matchesDepartment = departmentFilter === 'all' || internship.department === departmentFilter;
    // Check if status matches the selected filter
    const matchesStatus = statusFilter === 'all' || internship.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handler for adding a new internship
  const handleAddInternship = (internshipData) => {
    // Create a new internship object with a unique ID
    const newInternship = {
      ...internshipData,
      id: Date.now().toString() // Simple unique ID generation
    };
    setInternships([...internships, newInternship]); // Add to the list
    setIsModalOpen(false); // Close the modal
  };

  // Handler for updating an existing internship
  const handleUpdateInternship = (internshipData) => {
    if (editingInternship) {
      // Map over internships and update the one that matches the editingInternship's ID
      setInternships(internships.map(i =>
        i.id === editingInternship.id ? { ...internshipData, id: editingInternship.id } : i
      ));
      setEditingInternship(null); // Clear editing state
      setIsModalOpen(false); // Close the modal
    }
  };

  // Handler for initiating internship edit
  const handleEditInternship = (internship) => {
    setEditingInternship(internship); // Set the internship to be edited
    setIsModalOpen(true); // Open the modal
  };

  // Handler for deleting an internship
  const handleDeleteInternship = (id) => {
    setInternships(internships.filter(i => i.id !== id)); // Filter out the deleted internship
  };

  return (
    // Main container for the internships page with vertical spacing
    <div className="space-y-6 p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header section: Title, Description, and Post New Internship button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internships</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage internship positions and track applications
          </p>
        </div>
        {/* Button to open the "Post New Internship" modal */}
        <button
          onClick={() => {
            setEditingInternship(null); // Ensure no internship is being edited when opening for new post
            setIsModalOpen(true);
          }}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" /> {/* Plus icon */}
          Post New Internship
        </button>
      </div>

      {/* Filters and Search section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search input with icon */}
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

          {/* Filter dropdowns and count */}
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            {/* Department filter dropdown with icon */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none bg-white w-full sm:w-auto"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
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

            {/* Display count of filtered internships */}
            <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
              {filteredInternships.length} of {internships.length} internships
            </div>
          </div>
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map(internship => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            onEdit={handleEditInternship}
            onDelete={handleDeleteInternship}
          />
        ))}
      </div>

      {/* Message if no internships found */}
      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No internships found matching your criteria</p>
        </div>
      )}

      {/* Internship Modal for adding/editing */}
      <InternshipModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingInternship(null); // Clear editing state when modal closes
        }}
        // Pass either handleUpdateInternship or handleAddInternship based on editing state
        onSubmit={editingInternship ? handleUpdateInternship : handleAddInternship}
        internship={editingInternship} // Pass the internship object if editing
      />
    </div>
  );
};

export default InternshipsPage;
