import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionSqlDB from './SectionSqlDB';
import { vi } from 'vitest';

// Mock Material UI Icons
// Assuming KeyboardArrowDown and KeyboardArrowUp are default exports from their modules
vi.mock('@mui/icons-material/KeyboardArrowDown', () => ({ default: () => <svg data-testid="KeyboardArrowDownIcon" /> }));
vi.mock('@mui/icons-material/KeyboardArrowUp', () => ({ default: () => <svg data-testid="KeyboardArrowUpIcon" /> }));

// Mock common components if they have complex logic or external dependencies not relevant to this test
vi.mock('../common/Card', () => ({
  default: ({ children, ...rest }) => <div data-testid="card" {...rest}>{children}</div>
}));
vi.mock('../common/Button', () => ({
  default: ({ children, onClick, className, ...rest }) => (
    <button data-testid="button" onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  )
}));

describe('SectionSqlDB', () => {
  const mockDeepDiveData = [
    { title: "Normalization vs. Denormalization", content: "<p>Normalization content.</p>" },
    { title: "Indexing Strategies (B-Trees, B+Trees)", content: "<p>Indexing content.</p>" },
  ];

  // A simplified version of the actual component's structure for testing,
  // as the original deepDiveData is internal to SectionSqlDB.jsx
  // We are more interested in the AccordionItem behavior here.

  test('renders the main title and introductory paragraph', () => {
    render(<SectionSqlDB />);
    expect(screen.getByText('Relational Databases (SQL)')).toBeInTheDocument();
    expect(screen.getByText(/The bedrock of many applications/)).toBeInTheDocument();
  });

  test('renders accordion items based on deepDiveData', () => {
    render(<SectionSqlDB />);
    // The actual titles are defined within the component, so we use them directly.
    expect(screen.getByText('Normalization vs. Denormalization')).toBeInTheDocument();
    expect(screen.getByText('Indexing Strategies (B-Trees, B+Trees)')).toBeInTheDocument();
    expect(screen.getByText('ACID Properties & Transactions')).toBeInTheDocument();
    expect(screen.getByText('SQL Joins (Inner, Outer, Self, Cross)')).toBeInTheDocument();
    expect(screen.getByText('Query Optimization & Execution Plans')).toBeInTheDocument();
  });

  test('accordion items are initially closed and show KeyboardArrowDownIcon', () => {
    render(<SectionSqlDB />);
    const firstItemTitle = 'Normalization vs. Denormalization';
    // Content (identified by data-testid) should not be in the document initially
    expect(screen.queryByTestId('accordion-content-0')).toBeNull();

    // Check for down arrow icon. The button contains the icon.
    const button = screen.getByText(firstItemTitle).closest('button');
    expect(button).not.toBeNull();
    // Check within the button for the down arrow icon
    expect(button.querySelector('[data-testid="KeyboardArrowDownIcon"]')).toBeInTheDocument();
    expect(button.querySelector('[data-testid="KeyboardArrowUpIcon"]')).not.toBeInTheDocument();
  });

  test('clicking an accordion item opens it, shows content, and KeyboardArrowUpIcon', () => {
    render(<SectionSqlDB />);
    const firstItemTitle = 'Normalization vs. Denormalization';
    const button = screen.getByText(firstItemTitle);

    fireEvent.click(button);

    // Content should now be visible.
    const contentDiv = screen.getByTestId('accordion-content-0');
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveTextContent(/Normalization content/i); // Check for partial text within the div
    expect(screen.getByText(firstItemTitle).closest('button').querySelector('[data-testid="KeyboardArrowUpIcon"]')).toBeInTheDocument();
    expect(screen.getByText(firstItemTitle).closest('button').querySelector('[data-testid="KeyboardArrowDownIcon"]')).not.toBeInTheDocument();
  });

  test('clicking an open accordion item closes it', () => {
    render(<SectionSqlDB />);
    const firstItemTitle = 'Normalization vs. Denormalization';
    const button = screen.getByText(firstItemTitle).closest('button');

    // Open it first
    fireEvent.click(button);
    expect(screen.getByTestId('accordion-content-0')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content-0')).toHaveTextContent(/Normalization content/i);
    expect(button.querySelector('[data-testid="KeyboardArrowUpIcon"]')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(button);
    expect(screen.queryByTestId('accordion-content-0')).toBeNull();
    expect(button.querySelector('[data-testid="KeyboardArrowDownIcon"]')).toBeInTheDocument();
    expect(button.querySelector('[data-testid="KeyboardArrowUpIcon"]')).not.toBeInTheDocument();
  });

   test('only one accordion item can be open at a time', () => {
    render(<SectionSqlDB />);
    const firstItemTitle = "Normalization vs. Denormalization";
    const secondItemTitle = "Indexing Strategies (B-Trees, B+Trees)"; // This is accordion-content-1

    const firstButton = screen.getByText(firstItemTitle).closest('button');
    const secondButton = screen.getByText(secondItemTitle).closest('button');

    // Open first item
    fireEvent.click(firstButton);
    expect(screen.getByTestId('accordion-content-0')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content-0')).toHaveTextContent(/Normalization content/i);
    expect(screen.queryByTestId('accordion-content-1')).toBeNull();

    // Open second item
    fireEvent.click(secondButton);
    expect(screen.queryByTestId('accordion-content-0')).toBeNull();
    expect(screen.getByTestId('accordion-content-1')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content-1')).toHaveTextContent(/Indexing content/i);
    expect(secondButton.querySelector('[data-testid="KeyboardArrowUpIcon"]')).toBeInTheDocument();
    expect(firstButton.querySelector('[data-testid="KeyboardArrowDownIcon"]')).toBeInTheDocument();
  });
});
