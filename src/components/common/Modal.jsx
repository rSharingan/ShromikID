import React from 'react';
import { X } from 'lucide-react';

/**
 * Modal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Callback when modal closes
 * @param {string} [props.title] - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} [props.footer] - Footer content
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-gray-200 flex gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
