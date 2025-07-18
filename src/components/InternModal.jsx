import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Props destructuring
const InternshipModal = ({
  isOpen,
  onClose,
  onSubmit,
  internship
}) => {

  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    duration: 12, 
    stipend: 10000, 
    status: 'Open',
    postedDate: new Date().toISOString().split('T')[0], // Default to current date (YYYY-MM-DD)
    applicants: 0 
  });

  // Manage validation errors
  const [errors, setErrors] = useState({});

  const departments = ['Development', 'Analytics', 'Design', 'Engineering', 'Human Resources'];

  // useEffect hook to populate form data when modal opens or 'internship' prop changes
  useEffect(() => {
    if (internship) {
      // If an internship object is provided (for editing), populate the form with its data
      setFormData({
        title: internship.title,
        department: internship.department,
        description: internship.description,
        duration: internship.duration,
        stipend: internship.stipend,
        status: internship.status,
        postedDate: internship.postedDate,
        applicants: internship.applicants
      });
    } 
    else {
      // If no internship object, reset the form to default values
      setFormData({
        title: '',
        department: '',
        description: '',
        duration: 12,
        stipend: 10000,
        status: 'Open',
        postedDate: new Date().toISOString().split('T')[0],
        applicants: 0
      });
    }
    // Clear errors whenever the modal state changes
    setErrors({});
  }, [internship, isOpen]); //re-run when internship object or isOpen prop changes

  //validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.duration < 1 || formData.duration > 52) {
      newErrors.duration = 'Duration must be between 1 and 52 weeks';
    }

    if (formData.stipend < 0) {
      newErrors.stipend = 'Stipend cannot be negative';
    }

    if (formData.applicants < 0) {
      newErrors.applicants = 'Applicants cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission

    if (!validateForm()) {
      return; // If fails then stop submission
    }

    onSubmit(formData); // gets the form data
    onClose(); // closing
  };

  // Generic handler for input, select, and textarea changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convert duration, stipend, and applicants to numbers
      [name]: name === 'duration' || name === 'stipend' || name === 'applicants' ? Number(value) : value
    }));

    // Clear error for the current field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // If modal is not open, null
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {internship ? 'Edit Internship' : 'Post New Internship'} 
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300' // Error styling
                }`}
                placeholder="Enter internship title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.department ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe the internship role and responsibilities"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Duration, Stipend, and Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (weeks) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                max="52"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.duration ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stipend (pkr/month) *
              </label>
              <input
                type="number"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.stipend ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.stipend && (
                <p className="mt-1 text-sm text-red-600">{errors.stipend}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Applicants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Applicants
            </label>
            <input
              type="number"
              name="applicants"
              value={formData.applicants}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.applicants ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter number of applicants"
            />
            {errors.applicants && (
              <p className="mt-1 text-sm text-red-600">{errors.applicants}</p>
            )}
          </div>

          {/* Posted Date field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posted Date
            </label>
            <input
              type="date"
              name="postedDate"
              value={formData.postedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Form action buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
            >
              {internship ? 'Update' : 'Post'} Internship 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipModal;