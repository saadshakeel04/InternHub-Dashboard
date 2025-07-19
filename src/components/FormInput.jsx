import React from 'react';

const FormInput = ({ 
  label, 
  type = "text",
  value, 
  onChange, 
  error, 
  required = false, 
  placeholder,
  rightElement,
  name, 
  rows 
}) => {

  const inputClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
    rightElement ? 'pr-10' : '' // Add right padding if rightElement exists
  } ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 3} // Default rows to 3 if not provided
          className={inputClasses}
        />
      );
    }
    return (
      <input
        type={type}
        name={name} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />
    );
  };

  return (
    // Styling the form input container
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {/* Relative container for the input and optional right element */}
      <div className="relative">
        {renderInput()}
        {/* Conditional rendering for the right element */}
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {/* Display error message if present */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
