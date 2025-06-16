import React from 'react';

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
