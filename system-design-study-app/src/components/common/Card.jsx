import React from 'react';

/**
 * A reusable card component for displaying content in a structured manner.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card's container div.
 * @param {string} [props.padding='p-6'] - Tailwind CSS padding classes.
 * @param {string} [props.shadow='shadow-lg'] - Tailwind CSS shadow classes.
 * @param {string} [props.border=''] - Tailwind CSS border classes (e.g., 'border border-neutral-200 dark:border-neutral-700').
 */
const Card = ({
  children,
  className = '',
  padding = 'p-6', // Tailwind padding classes
  shadow = 'shadow-lg', // Tailwind shadow classes
  border = '', // e.g., 'border border-neutral-200 dark:border-neutral-700'
}) => {
  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-xl ${padding} ${shadow} ${border} ${className}`}>
      {children}
    </div>
  );
};
export default Card;
