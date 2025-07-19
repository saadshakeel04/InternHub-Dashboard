import React, { useState, useMemo } from 'react';
import { Search, Plus, ArrowUpDown} from 'lucide-react';
import { candidates } from '../data/candidates';
import { internships } from '../data/internships';
import Modal from '../components/Modal'; 
import FormInput from '../components/FormInput'; 
import FormSelect from '../components/FormSelect'; 
import Button from '../components/Button'; 
import StatusBadge from '../components/StatusBadge'; 


const Candidates = () => {

  // State for the list of candidates
  const [candidatesList, setCandidatesList] = useState(candidates);

  // State for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for the field to sort by name/status
  const [sortField, setSortField] = useState('name');

  // State for the sort direction asc/desc
  const [sortDirection, setSortDirection] = useState('asc');

  // State to control the visibility of the add candidate modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for the new candidate form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    internshipTitle: '',
    status: 'Pending' 
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  //used memo for remembering (searched name)
  const filteredAndSortedCandidates = useMemo(() => {
    // Filter candidates based on the search term
    let filtered = candidatesList.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered candidates
    filtered.sort((a, b) => {
      // Get the values from the current sort field for comparison
      let a1 = a[sortField];
      let b1 = b[sortField];
      
      // string comparison
      if (sortDirection === 'asc') {
        return a1.localeCompare(b1);
      } else {
        return b1.localeCompare(a1);
      }
    });

    return filtered;
  }, [candidatesList, searchTerm, sortField, sortDirection]);


  const handleSort = (field) => {
    if (sortField === field) {

      // If clicking the same field, toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } 
    else {

      setSortField(field);
      setSortDirection('asc');
    }
  };

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

  const validateForm = () => {
    const errors = {};
    
    // Basic validation checks
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email';
    if (!formData.internshipTitle) errors.internshipTitle = 'Internship title is required';
    if (!formData.status) errors.status = 'Status is required';

    setFormErrors(errors); 
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (validateForm()) { //if form is valid
      const newCandidate = {
        id: candidatesList.length + 1,
        name: formData.name,
        email: formData.email,
        appliedInternship: formData.internshipTitle,
        status: formData.status,
        appliedDate: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
      };
      
      setCandidatesList(prev => [...prev, newCandidate]); // Add new candidate to list
      setFormData({ name: '', email: '', internshipTitle: '', status: 'Pending' }); // Reset form
      setIsModalOpen(false); // Close the modal
    }
  };

  // Prepare options for the internship dropdown from the data
  const internshipOptions = internships.map(internship => ({
    value: internship.title,
    label: internship.title
  }));

  // Define options for the status dropdown
  const statusOptions = [
    { value: 'Pending', label: 'Pending' }, 
    { value: 'Approved', label: 'Approved' }, 
    { value: 'Rejected', label: 'Rejected' } 
  ];

  return (
    <>
    
      <div className="space-y-3 px-6 sm:px-0 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates Overview</h1>
          <p className="mt-2 text-sm text-gray-600 mb-6">
            Welcome to your candidate management dashboard.
          </p>
        </div>
      </div>

      <div className="space-y-6 animate-fadeIn"> 
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-0"> 
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden px-6 sm:px-0"> 
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 "
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                        <ArrowUpDown size={16} className="text-gray-600" />                    
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
                        <ArrowUpDown size={16} className="text-gray-600" /> 
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
                      {/* StatusBadge component to show candidate status */}
                      <StatusBadge status={candidate.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
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
            setFormData({ name: '', email: '', internshipTitle: '', status: 'Pending' }); // Reset form on close
            setFormErrors({}); // Clear errors on close
          }}
          title="Add New Candidate"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
         
            <FormInput
              label="Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={formErrors.name}
              required
              placeholder="Enter candidate name"
            />
            
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={formErrors.email}
              required
              placeholder="Enter candidate email"
            />
            
            <FormSelect
              label="Internship Title"
              value={formData.internshipTitle}
              onChange={handleInputChange('internshipTitle')}
              options={internshipOptions}
              error={formErrors.internshipTitle}
              required
            />
            
            <FormSelect
              label="Status"
              value={formData.status}
              onChange={handleInputChange('status')}
              options={statusOptions}
              error={formErrors.status}
              required
            />
            
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
