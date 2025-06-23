import React from 'react';

/**
 * A reusable card component for displaying content in a structured manner,
 * styled with design tokens from tailwind.config.js.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card's container div.
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'none' | string} [props.padding='md'] - Padding size key from Tailwind spacing scale or a custom Tailwind class. 'md' corresponds to spacing-6 (24px).
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none' | string} [props.shadow='DEFAULT'] - Shadow key from Tailwind boxShadow scale or a custom Tailwind class.
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string} [props.rounded='md'] - Border radius key from Tailwind borderRadius scale or a custom Tailwind class. 'md' corresponds to the default 8px.
 * @param {boolean} [props.border=false] - Whether to apply a default border.
 */
const Card = ({
  children,
  className = '',
  padding = 'md', // Corresponds to '6' in the 4px spacing scale (24px)
  shadow = 'DEFAULT', // Uses the 'DEFAULT' boxShadow from tailwind.config.js
  rounded = 'md', // Uses 'md' (8px) from borderRadius scale
  border = false, // Option to add a default border
}) => {
  // Mapping padding prop to Tailwind spacing classes (assuming 4px base)
  // These keys should ideally match a simplified scale or allow direct Tailwind class input.
  // Example: 'sm' -> 'p-4', 'md' -> 'p-6', 'lg' -> 'p-8'
  const paddingClasses = {
    sm: 'p-4', // spacing-4
    md: 'p-6', // spacing-6
    lg: 'p-8', // spacing-8
    xl: 'p-10',// spacing-10
    none: 'p-0',
  };

  // Mapping shadow prop to Tailwind shadow classes
  const shadowClasses = {
    sm: 'shadow-sm',
    DEFAULT: 'shadow', // Uses 'DEFAULT' from config
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
    none: 'shadow-none',
  };

  // Mapping rounded prop to Tailwind border-radius classes
  const roundedClasses = {
    sm: 'rounded-sm', // 4px
    md: 'rounded-md', // 8px (DEFAULT in our config)
    lg: 'rounded-lg', // 12px
    xl: 'rounded-xl', // 16px
    '2xl': 'rounded-2xl', // 24px
    full: 'rounded-full',
  };

  const borderClass = border ? 'border border-neutral-300 dark:border-neutral-600' : '';

  // Determine final classes by checking if prop value is a key or a direct Tailwind class
  const finalPaddingClass = paddingClasses[padding] || padding;
  const finalShadowClass = shadowClasses[shadow] || shadow;
  const finalRoundedClass = roundedClasses[rounded] || rounded;

  return (
    <div
      className={`
        bg-white dark:bg-neutral-800
        ${finalPaddingClass}
        ${finalShadowClass}
        ${finalRoundedClass}
        ${borderClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
