import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Users } from 'lucide-react';
// Assuming these imports are correctly configured for your project
import { candidates as initialCandidates } from '../data/candidates';
import { internships } from '../data/internships'; // Assuming Internship type is defined here or implicitly
import CandidateTable from '../components/CandidateTable';
import CandidateModal from '../components/CandidateModal';

const CandidatesPage = () => {
  // State for the list of candidates, initialized from mock data
  const [candidates, setCandidates] = useState(initialCandidates);
  // State for search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State for status filter selection
  const [statusFilter, setStatusFilter] = useState('all');
  // State to control the visibility of the candidate modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the candidate being edited (null if adding new)
  const [editingCandidate, setEditingCandidate] = useState(null);

  // Filter candidates based on search term and selected status filter
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /**
   * Handles adding a new candidate.
   * @param {Omit<Candidate, 'id'>} candidateData - The data for the new candidate, without an ID.
   */
  const handleAddCandidate = (candidateData) => {
    const newCandidate = {
      ...candidateData,
      id: Date.now().toString() // Generate a unique ID for the new candidate
    };
    setCandidates([...candidates, newCandidate]); // Add new candidate to the list
    setIsModalOpen(false); // Close the modal
  };

  /**
   * Handles updating an existing candidate.
   * @param {Omit<Candidate, 'id'>} candidateData - The updated data for the candidate.
   */
  const handleUpdateCandidate = (candidateData) => {
    if (editingCandidate) {
      setCandidates(candidates.map(c => 
        c.id === editingCandidate.id ? { ...candidateData, id: editingCandidate.id } : c
      ));
      setEditingCandidate(null); // Clear editing state
      setIsModalOpen(false); // Close the modal
    }
  };

  /**
   * Sets the candidate to be edited and opens the modal.
   * @param {Candidate} candidate - The candidate object to be edited.
   */
  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
    setIsModalOpen(true);
  };

  /**
   * Deletes a candidate by their ID.
   * @param {string} id - The ID of the candidate to delete.
   */
  const handleDeleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id)); // Remove candidate from the list
  };

  /**
   * Updates the status of a specific candidate.
   * @param {string} id - The ID of the candidate to update.
   * @param {Candidate['status']} status - The new status for the candidate.
   */
  const handleStatusChange = (id, status) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, status } : c
    ));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section with Enhanced Design */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Candidates</h1>
              <p className="text-indigo-100 mt-1">
                Manage internship candidates and their application status
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{candidates.length}</div>
            <div className="text-indigo-100">Total Candidates</div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Export and Add Candidate */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-md">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                {filteredCandidates.length} of {candidates.length} candidates
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Table */}
        <CandidateTable
          candidates={filteredCandidates}
          onEdit={handleEditCandidate}
          onDelete={handleDeleteCandidate}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Candidate Add/Edit Modal */}
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCandidate(null); // Clear editing state when modal closes
        }}
        onSubmit={editingCandidate ? handleUpdateCandidate : handleAddCandidate}
        candidate={editingCandidate}
        internships={internships} // Pass the internships data to the modal
      />
    </div>
  );
};

export default CandidatesPage;
