import React, { useState, useMemo } from 'react';
import { Search, Plus, ChevronUp, ChevronDown } from 'lucide-react';
// Assuming these imports are correctly configured for your project
import { candidates } from '../data/candidates';
import { internships } from '../data/internships';
import Modal from '../components/Modal'; // Assuming Modal is a JSX component
import FormInput from '../components/FormInput'; // Assuming FormInput is a JSX component
import FormSelect from '../components/FormSelect'; // Assuming FormSelect is a JSX component
import Button from '../components/Button'; // Assuming Button is a JSX component
import StatusBadge from '../components/StatusBadge'; // Assuming StatusBadge is a JSX component

// Define the Candidate type using JSDoc for clarity
/**
 * @typedef {object} Candidate
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} appliedInternship
 * @property {'Pending' | 'Approved' | 'Rejected'} status
 * @property {string} appliedDate
 */

/**
 * @typedef {object} Internship
 * @property {string} id
 * @property {string} title
 * // ... other properties if needed
 */

/**
 * Candidates component for managing and displaying internship candidates.
 * Allows searching, sorting, and adding new candidates.
 * @returns {JSX.Element}
 */
const Candidates = () => {
  // State for the list of candidates
  const [candidatesList, setCandidatesList] = useState(candidates);
  // State for the search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for the field to sort by ('name' or 'status')
  const [sortField, setSortField] = useState('name');
  // State for the sort direction ('asc' or 'desc')
  const [sortDirection, setSortDirection] = useState('asc');
  // State to control the visibility of the add candidate modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the new candidate form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    internshipTitle: '',
    status: 'Pending' // Changed from 'pending' to 'Pending' for consistency
  });
  // State for form validation errors
  const [formErrors, setFormErrors] = useState({});

  /**
   * Memoized array of filtered and sorted candidates.
   * Re-calculates only when candidatesList, searchTerm, sortField, or sortDirection changes.
   * @type {Candidate[]}
   */
  const filteredAndSortedCandidates = useMemo(() => {
    // Filter candidates based on the search term
    let filtered = candidatesList.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered candidates
    filtered.sort((a, b) => {
      // Get the values from the current sort field for comparison
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Perform locale-aware string comparison
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [candidatesList, searchTerm, sortField, sortDirection]);

  /**
   * Handles changing the sort field and direction.
   * @param {'name' | 'status'} field - The field to sort by.
   */
  const handleSort = (field) => {
    if (sortField === field) {
      // If clicking the same field, toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  /**
   * Generic handler for input and select changes in the form.
   * @param {string} field - The name of the form field.
   * @returns {(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}
   */
  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear the error for this field if it exists
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  /**
   * Validates the form data.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const errors = {};
    
    // Basic validation checks
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email';
    if (!formData.internshipTitle) errors.internshipTitle = 'Internship title is required';
    if (!formData.status) errors.status = 'Status is required';

    setFormErrors(errors); // Update form errors state
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  /**
   * Handles form submission for adding a new candidate.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validateForm()) { // Only proceed if form is valid
      const newCandidate = {
        id: candidatesList.length + 1, // Simple ID generation (consider UUID in a real app)
        name: formData.name,
        email: formData.email,
        appliedInternship: formData.internshipTitle,
        status: formData.status,
        appliedDate: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
      };
      
      setCandidatesList(prev => [...prev, newCandidate]); // Add new candidate to the list
      setFormData({ name: '', email: '', internshipTitle: '', status: 'Pending' }); // Reset form, changed to 'Pending'
      setIsModalOpen(false); // Close the modal
    }
  };

  // Prepare options for the internship dropdown from the imported `internships` data
  const internshipOptions = internships.map(internship => ({
    value: internship.title,
    label: internship.title
  }));

  // Define options for the status dropdown
  const statusOptions = [
    { value: 'Pending', label: 'Pending' }, // Changed value to 'Pending'
    { value: 'Approved', label: 'Approved' }, // Changed value to 'Approved'
    { value: 'Rejected', label: 'Rejected' } // Changed value to 'Rejected'
  ];

  return (
    <>
      {/* Page Header Section */}
      <div className="space-y-3 px-6 sm:px-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates Overview</h1>
          <p className="mt-2 text-sm text-gray-600 mb-6">
            Welcome to your candidate management dashboard.
          </p>
        </div>
      </div>

      <div className="space-y-6"> {/* Removed animate-fadeIn as it's on the outer div in MainLayout */}
        {/* Header section with search input and add candidate button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-0"> {/* Added px-6 sm:px-0 for consistent padding */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 transition-all duration-200 hover:scale-103">
            <Plus size={20} />
            <span>Add Candidate</span>
          </Button>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden px-6 sm:px-0"> {/* Added px-6 sm:px-0 for consistent padding */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {/* Display sort icon based on current sort field and direction */}
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Internship
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {/* Display sort icon based on current sort field and direction */}
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{candidate.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{candidate.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{candidate.appliedInternship}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* StatusBadge component to display candidate status */}
                      <StatusBadge status={candidate.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {/* Format the applied date for display */}
                      {new Date(candidate.appliedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Candidate Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFormData({ name: '', email: '', internshipTitle: '', status: 'Pending' }); // Reset form on close, changed to 'Pending'
            setFormErrors({}); // Clear errors on close
          }}
          title="Add New Candidate"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FormInput for Name */}
            <FormInput
              label="Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={formErrors.name}
              required
              placeholder="Enter candidate name"
            />
            
            {/* FormInput for Email */}
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={formErrors.email}
              required
              placeholder="Enter candidate email"
            />
            
            {/* FormSelect for Internship Title */}
            <FormSelect
              label="Internship Title"
              value={formData.internshipTitle}
              onChange={handleInputChange('internshipTitle')}
              options={internshipOptions}
              error={formErrors.internshipTitle}
              required
            />
            
            {/* FormSelect for Status */}
            <FormSelect
              label="Status"
              value={formData.status}
              onChange={handleInputChange('status')}
              options={statusOptions}
              error={formErrors.status}
              required
            />
            
            {/* Form action buttons */}
            <div className="flex justify-end space-x-3 pt-4" >
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Candidate
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Candidates;
