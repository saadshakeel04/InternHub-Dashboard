import React, { useState } from 'react';
import { Plus, Search, Filter, Briefcase, TrendingUp } from 'lucide-react';
// Assuming these imports are correctly configured for your project
import { internships as initialInternships } from '../data/internships';
import InternshipCard from '../components/InternCard';
import InternshipModal from '../components/InternModal';

const InternshipsPage = () => {
  // State for the list of internships, initialized from mock data
  const [internships, setInternships] = useState(initialInternships);
  // State for search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State for department filter selection
  const [departmentFilter, setDepartmentFilter] = useState('all');
  // State for status filter selection
  const [statusFilter, setStatusFilter] = useState('all');
  // State to control the visibility of the internship modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the internship being edited (null if adding new)
  const [editingInternship, setEditingInternship] = useState(null);

  // Dynamically get unique department names for the filter dropdown
  const departments = Array.from(new Set(internships.map(i => i.department)));

  // Filter internships based on search term and selected filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || internship.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || internship.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  /**
   * Handles adding a new internship.
   * @param {Omit<Internship, 'id'>} internshipData - The data for the new internship, without an ID.
   */
  const handleAddInternship = (internshipData) => {
    const newInternship = {
      ...internshipData,
      id: Date.now().toString() // Generate a unique ID for the new internship
    };
    setInternships([...internships, newInternship]); // Add new internship to the list
    setIsModalOpen(false); // Close the modal
  };

  /**
   * Handles updating an existing internship.
   * @param {Omit<Internship, 'id'>} internshipData - The updated data for the internship.
   */
  const handleUpdateInternship = (internshipData) => {
    if (editingInternship) {
      setInternships(internships.map(i => 
        i.id === editingInternship.id ? { ...internshipData, id: editingInternship.id } : i
      ));
      setEditingInternship(null); // Clear editing state
      setIsModalOpen(false); // Close the modal
    }
  };

  /**
   * Sets the internship to be edited and opens the modal.
   * @param {Internship} internship - The internship object to be edited.
   */
  const handleEditInternship = (internship) => {
    setEditingInternship(internship);
    setIsModalOpen(true);
  };

  /**
   * Deletes an internship by its ID.
   * @param {string} id - The ID of the internship to delete.
   */
  const handleDeleteInternship = (id) => {
    setInternships(internships.filter(i => i.id !== id)); // Remove internship from the list
  };

  // Calculate summary statistics
  const openInternships = internships.filter(i => i.status === 'Open').length;
  const totalApplicants = internships.reduce((sum, i) => sum + i.applicants, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Briefcase className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Internships</h1>
              <p className="text-purple-100 mt-1">
                Manage internship positions and track applications
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-right">
            <div>
              <div className="text-2xl font-bold">{openInternships}</div>
              <div className="text-purple-100 text-sm">Open Positions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalApplicants}</div>
              <div className="text-purple-100 text-sm">Total Applicants</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Internship Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Post New Internship
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              {filteredInternships.length} of {internships.length} internships
            </div>
          </div>
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
        {filteredInternships.map(internship => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            onEdit={handleEditInternship}
            onDelete={handleDeleteInternship}
          />
        ))}
      </div>

      {/* No Internships Found Message */}
      {filteredInternships.length === 0 && (
        <div className="text-center py-12 animate-fadeIn">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No internships found matching your criteria</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Internship Add/Edit Modal */}
      <InternshipModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingInternship(null); // Clear editing state when modal closes
        }}
        onSubmit={editingInternship ? handleUpdateInternship : handleAddInternship}
        internship={editingInternship}
      />
    </div>
  );
};

export default InternshipsPage;
