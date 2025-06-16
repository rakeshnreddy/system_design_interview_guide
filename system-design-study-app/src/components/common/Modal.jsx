import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * A reusable modal dialog component that renders its children into a portal.
 * Handles Escape key press for closing and manages body overflow.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {Function} props.onClose - Function to call when the modal should be closed.
 * @param {string} [props.title="Modal Title"] - The title displayed in the modal header.
 * @param {React.ReactNode} props.children - The content to display inside the modal body.
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} [props.size='md'] - The size of the modal.
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
     sm: 'max-w-sm',
     md: 'max-w-md',
     lg: 'max-w-lg',
     xl: 'max-w-xl',
     '2xl': 'max-w-2xl',
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900 bg-opacity-75 transition-opacity duration-300 ease-in-out">
      <div className={`bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full ${sizeStyles[size]} transform transition-all duration-300 ease-in-out scale-100 opacity-100`}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">{title || 'Modal Title'}</h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('root') // Or a dedicated modal root element if you have one
  );
};
export default Modal;
