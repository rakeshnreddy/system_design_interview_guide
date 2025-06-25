import React from 'react';

interface ModalProps {
  /**
   * Determines if the modal is visible or not.
   */
  isOpen: boolean;
  /**
   * Callback function to be called when the modal is requested to be closed (e.g., by clicking the close button or overlay).
   */
  onClose: () => void;
  /**
   * The title of the modal.
   */
  title?: string;
  /**
   * The content of the modal.
   */
  children: React.ReactNode;
  /**
   * Optional footer content for the modal.
   */
  footer?: React.ReactNode;
  /**
   * Additional CSS classes for styling the modal content.
   */
  className?: string;
}

/**
 * Modal component to display content in a layer above the main page.
 * It requires `isOpen` and `onClose` props to control its visibility.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, className }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className={`modal-content ${className || ''}`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
            <button onClick={onClose} className="modal-close-button" aria-label="Close modal">
              &times;
            </button>
          </div>
        )}
        {!title && (
           <button onClick={onClose} className="modal-close-button modal-close-button-no-header" aria-label="Close modal">
              &times;
            </button>
        )}
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
