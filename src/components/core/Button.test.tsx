import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  test('renders the button with the correct label', () => {
    render(<Button label="Click Me" />);
    expect(screen.getByRole('button', { name: /Click Me/i })).toBeInTheDocument();
  });

  test('applies primary styles when primary prop is true', () => {
    render(<Button label="Primary Button" primary />);
    expect(screen.getByRole('button')).toHaveClass('storybook-button--primary');
  });

  test('applies secondary styles when primary prop is false', () => {
    render(<Button label="Secondary Button" primary={false} />);
    expect(screen.getByRole('button')).toHaveClass('storybook-button--secondary');
  });

  test('applies the correct size class', () => {
    render(<Button label="Small Button" size="small" />);
    expect(screen.getByRole('button')).toHaveClass('storybook-button--small');
  });

  test('applies custom background color', () => {
    render(<Button label="Custom Color" backgroundColor="blue" />);
    expect(screen.getByRole('button')).toHaveStyle('background-color: blue');
  });
});
