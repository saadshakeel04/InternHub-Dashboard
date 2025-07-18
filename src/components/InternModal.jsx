import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Props are directly destructured from the argument object
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
    duration: 12, // Default duration
    stipend: 1000, // Default stipend
    status: 'Open', // Default status
    postedDate: new Date().toISOString().split('T')[0], // Default to current date (YYYY-MM-DD)
    requirements: [], // Array to hold requirements
    applicants: 0 // Default applicants count
  });

  // State for the individual requirement input field
  const [requirementInput, setRequirementInput] = useState('');
  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Predefined list of departments for the dropdown
  const departments = ['Engineering', 'Design', 'Marketing', 'Analytics', 'Operations', 'Finance'];

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
        requirements: internship.requirements,
        applicants: internship.applicants
      });
    } else {
      // If no internship object (for creating new), reset the form to default values
      setFormData({
        title: '',
        department: '',
        description: '',
        duration: 12,
        stipend: 1000,
        status: 'Open',
        postedDate: new Date().toISOString().split('T')[0],
        requirements: [],
        applicants: 0
      });
    }
    // Clear errors and requirement input whenever the modal state changes
    setErrors({});
    setRequirementInput('');
  }, [internship, isOpen]); // Dependencies: re-run when internship object or isOpen prop changes

  // Function to validate form fields
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission

    if (!validateForm()) {
      return; // If validation fails, stop the submission
    }

    onSubmit(formData); // Call the onSubmit prop with the form data
    onClose(); // Close the modal after successful submission
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

  // Function to add a new requirement to the list
  const addRequirement = () => {
    // Check if input is not empty and not already in the list
    if (requirementInput.trim() && !formData.requirements.includes(requirementInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()] // Add new requirement
      }));
      setRequirementInput(''); // Clear the input field
    }
  };

  // Function to remove a requirement by its index
  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index) // Filter out the requirement at the given index
    }));
  };

  // Handler for key presses in the requirement input field (e.g., Enter key)
  const handleRequirementKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if Enter is pressed in this field
      addRequirement(); // Add the requirement
    }
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    // Modal overlay: fixed position, semi-transparent black background, centered content
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal content area: white background, rounded corners, shadow, scrollable */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {internship ? 'Edit Internship' : 'Post New Internship'} {/* Dynamic title */}
          </h2>
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" /> {/* Close icon */}
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title and Department fields */}
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

          {/* Description field */}
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
                Stipend ($/month) *
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

          {/* Requirements section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyPress={handleRequirementKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add a requirement"
              />
              <button
                type="button"
                onClick={addRequirement}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Add
              </button>
            </div>
            {/* Display added requirements as badges */}
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    × {/* Close icon for removing requirement */}
                  </button>
                </span>
              ))}
            </div>
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
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
            >
              {internship ? 'Update' : 'Post'} Internship {/* Dynamic button text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipModal;
