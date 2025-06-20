import React from 'react';

/**
 * A customizable button component.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {Function} [props.onClick] - Optional click handler.
 * @param {'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'} [props.variant='primary'] - The button's style variant.
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
  variant = 'primary', // 'primary', 'secondary', 'danger', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  leftIcon,
  rightIcon,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors duration-150';

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary',
    danger: 'bg-error hover:bg-red-700 text-white focus:ring-error',
    outline: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-primary dark:text-primary-light border border-primary focus:ring-primary',
    ghost: 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 focus:ring-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {leftIcon && <span className="mr-2 h-4 w-4">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 h-4 w-4">{rightIcon}</span>}
    </button>
  );
};
export default Button;
