import React from 'react';

/**
 * A customizable button component styled with Tailwind CSS using design tokens.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {Function} [props.onClick] - Optional click handler.
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - The button's style variant.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The button's size.
 * @param {React.ReactNode} [props.leftIcon] - Optional icon to display to the left of the children.
 * @param {React.ReactNode} [props.rightIcon] - Optional icon to display to the right of the children.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  // Base styles using Tailwind classes (referencing tokens from tailwind.config.js)
  const baseStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'rounded-md', // Using 'md' from our defined borderRadius scale
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2', // For better visibility on focus
    'dark:focus-visible:ring-offset-neutral-900', // Dark mode offset
    'transition-colors',
    'duration-150',
    'ease-in-out',
  ].join(' ');

  // Variant styles mapping to Tailwind utility classes
  // These should use colors defined in `tailwind.config.js` (e.g., bg-primary, text-white)
  const variantStyles = {
    primary: [
      'bg-primary', // Uses colors.primary.DEFAULT
      'text-white',
      'hover:bg-primary-dark', // Assumes primary.dark is defined for hover
      'focus-visible:ring-primary', // Ring color matches primary
      'shadow-sm', // Optional: adding a subtle shadow
    ].join(' '),
    secondary: [
      'bg-secondary', // Uses colors.secondary.DEFAULT
      'text-white', // Or could be dark text if secondary color is light
      'hover:bg-secondary-dark', // Assumes secondary.dark is defined
      'focus-visible:ring-secondary',
      'shadow-sm',
    ].join(' '),
    outline: [
      'bg-transparent',
      'text-primary', // Text color is primary
      'border',
      'border-primary', // Border color is primary
      'hover:bg-primary-light', // Light primary background on hover
      'hover:text-white', // Change text on hover for better contrast if needed
      'dark:text-primary-light',
      'dark:border-primary-light',
      'dark:hover:bg-primary-dark',
      'dark:hover:text-white',
      'focus-visible:ring-primary',
    ].join(' '),
  };

  // Size styles mapping to Tailwind utility classes for padding and text size
  // These should use spacing and fontSize tokens from `tailwind.config.js`
  const sizeStyles = {
    sm: 'px-3 py-3 text-sm min-w-[2.75rem]', // Adjusted for 44px min height/width. py-3 (12px padding top/bottom) + text-sm (20px line-height) = 44px.
    md: 'px-4 py-2 text-base',// Uses spacing-4, spacing-2, fontSize.base
    lg: 'px-6 py-3 text-lg',  // Uses spacing-6, spacing-3, fontSize.lg
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  // Icon sizing based on button size
  const iconSizeClasses = {
    sm: 'h-4 w-4', // text-xs or sm might have 16px icons
    md: 'h-5 w-5', // text-base might have 20px icons
    lg: 'h-6 w-6', // text-lg might have 24px icons
  };
  const currentIconSize = iconSizeClasses[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {leftIcon && <span className={`mr-2 ${currentIconSize}`}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={`ml-2 ${currentIconSize}`}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
