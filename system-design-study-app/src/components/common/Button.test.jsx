import { render, screen } from '@testing-library/react';
import Button from './Button'; // Assuming Button.jsx is in the same directory
import '@testing-library/jest-dom';

describe('Button Component', () => {
  test('applies correct classes for "sm" size to meet touch target requirements', () => {
    render(<Button size="sm">Small Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /small button/i });

    // Check for padding classes (py-3)
    // Note: Tailwind might compile this to a single class, or apply multiple.
    // A more robust check might be to verify computed styles if possible,
    // but class checking is a good first step for Tailwind.
    expect(buttonElement).toHaveClass('py-3');

    // Check for min-width class (min-w-[2.75rem])
    // The actual class name might be different after Tailwind compilation.
    // This assertion might need adjustment based on how Tailwind handles arbitrary values in classes.
    // A more direct way if Tailwind generates a specific class:
    // expect(buttonElement).toHaveClass('min-w-[2.75rem]');
    // Or, if checking inline styles (less common for Tailwind utility-first):
    // expect(buttonElement.style.minWidth).toBe('2.75rem');

    // For now, let's check for the presence of a class that implies min-width.
    // This is a placeholder as direct class name for arbitrary values can be tricky.
    // We're checking if our intended utility 'min-w-[2.75rem]' is part of the className string.
    // This is not ideal as it might match substrings, but it's a start without computed styles.
    const classList = buttonElement.className;
    expect(classList).toContain('min-w-[2.75rem]');
    expect(classList).toContain('text-sm'); // also check for text size
  });

  test('applies primary variant styles correctly', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /primary button/i });
    expect(buttonElement).toHaveClass('bg-primary');
    expect(buttonElement).toHaveClass('text-white');
  });

  test('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
