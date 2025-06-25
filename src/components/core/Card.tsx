import React from 'react';

interface CardProps {
  /**
   * The title of the card
   */
  title?: string;
  /**
   * The content of the card
   */
  children: React.ReactNode;
  /**
   * Optional footer content for the card
   */
  footer?: React.ReactNode;
  /**
   * Additional CSS classes for styling
   */
  className?: string;
}

/**
 * Card component for displaying content in a structured layout.
 */
const Card: React.FC<CardProps> = ({ title, children, footer, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
