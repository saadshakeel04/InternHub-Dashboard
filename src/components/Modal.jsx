import React from 'react';
import { X } from 'lucide-react';

// Define the ModalProps structure using JSDoc
/**
 * @typedef {object} ModalProps
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Function to call when the modal is requested to close.
 * @property {string} title - The title to display in the modal header.
 * @property {React.ReactNode} children - The content to be rendered inside the modal body.
 */

/**
 * Reusable Modal component.
 * Displays content in an overlay, with a title and a close button.
 * @param {ModalProps} { isOpen, onClose, title, children }
 * @returns {JSX.Element | null}
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
