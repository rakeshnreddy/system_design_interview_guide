import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card', () => {
  test('renders children content', () => {
    render(<Card><div>Card Content</div></Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders with title', () => {
    render(<Card title="Card Title"><div>Card Content</div></Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toHaveClass('card-header');
  });

  test('renders with footer', () => {
    render(<Card footer={<div>Card Footer</div>}><div>Card Content</div></Card>);
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toHaveClass('card-footer');
  });

  test('applies custom className', () => {
    render(<Card className="custom-card"><div>Card Content</div></Card>);
    // The base class 'card' should also be present
    expect(screen.getByText('Card Content').parentElement?.parentElement).toHaveClass('card custom-card');
  });

  test('renders without title or footer if not provided', () => {
    render(<Card><div>Card Content</div></Card>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument(); // Assuming title would be a heading
    expect(screen.queryByText(/Footer/i)).not.toBeInTheDocument(); // More generic check for footer
  });
});
