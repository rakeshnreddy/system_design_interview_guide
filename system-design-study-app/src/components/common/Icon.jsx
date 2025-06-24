import React, { useState, useEffect, useRef } from 'react';

/**
 * A generic icon component that dynamically loads and renders an SVG.
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the icon (without .svg extension).
 * @param {string} [props.className] - Additional CSS classes for styling the SVG.
 * @param {string | number} [props.size='1em'] - Size of the icon. Can be a number (pixels) or a string (e.g., '24px', '1.5em').
 * @param {string} [props.color='currentColor'] - Fill color for the SVG.
 * @param {string} props['aria-label'] - Accessible label for the icon.
 * @param {string} [props.title] - Optional title for the icon, often shown on hover.
 */
const Icon = ({ name, className, size = '1em', color = 'currentColor', 'aria-label': ariaLabel, title, ...rest }) => {
  const [IconComponent, setIconComponent] = useState(null);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let importAttempted = false;

    const loadIcon = async () => {
      if (!name || importAttempted) return;
      importAttempted = true;

      try {
        // Dynamically import the SVG as a React component using Vite's ?react syntax
        // Adjust the path according to your project structure.
        const module = await import(`../../assets/icons/${name}.svg?react`);
        if (isMounted.current) {
          setIconComponent(() => module.default); // SVGR exports the component as default
          setError(null);
        }
      } catch (err) {
        console.error(`Icon not found: ${name}`, err);
        if (isMounted.current) {
          setError(`Icon "${name}" could not be loaded.`);
          setIconComponent(null);
        }
      }
    };

    loadIcon();

    return () => {
      isMounted.current = false; // Cleanup to prevent state updates on unmounted component
    };
  }, [name]); // Reload if icon name changes

  if (error) {
    return <span role="img" aria-label={ariaLabel || `Error loading icon ${name}`} style={{ fontSize: size, color: 'red' }}>⚠️</span>;
  }

  if (!IconComponent) {
    // Optional: return a placeholder or null while loading
    return <span role="img" aria-label={ariaLabel || `Loading icon ${name}`} style={{ fontSize: size, width: size, height: size, display: 'inline-block' }}></span>;
  }

  return (
    <IconComponent
      role="img"
      aria-label={ariaLabel}
      className={className}
      width={size}
      height={size}
      fill={color} // Common way to color SVGs, ensure your SVGs are prepared for this
      {...rest} // Spread other props like onClick, etc.
    >
      {title && <title>{title}</title>}
    </IconComponent>
  );
};

export default Icon;
