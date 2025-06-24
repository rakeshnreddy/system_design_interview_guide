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
    // Content should not be visible initially
    expect(screen.queryByText('Normalization content.')).not.toBeVisible();

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

    // Content should now be visible. We use dangerouslySetInnerHTML so direct text match for <p> is tricky.
    // A better approach would be to have a test-id on the content div if possible,
    // or check for a snippet of the text without HTML.
    expect(screen.getByText(/Normalization content\./)).toBeInTheDocument();
    expect(screen.getByText(firstItemTitle).closest('button').querySelector('[data-testid="KeyboardArrowUpIcon"]')).toBeInTheDocument();
    expect(screen.getByText(firstItemTitle).closest('button').querySelector('[data-testid="KeyboardArrowDownIcon"]')).not.toBeInTheDocument();
  });

  test('clicking an open accordion item closes it', () => {
    render(<SectionSqlDB />);
    const firstItemTitle = 'Normalization vs. Denormalization';
    const button = screen.getByText(firstItemTitle);

    // Open it first
    fireEvent.click(button);
    expect(screen.getByText(/Normalization content\./)).toBeInTheDocument();
    expect(button.querySelector('[data-testid="KeyboardArrowUpIcon"]')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(button);
    // A robust way to check for not visible/not present if content is removed from DOM:
    expect(screen.queryByText(/Normalization content\./)).not.toBeVisible();
    expect(button.querySelector('[data-testid="KeyboardArrowDownIcon"]')).toBeInTheDocument();
    expect(button.querySelector('[data-testid="KeyboardArrowUpIcon"]')).not.toBeInTheDocument();
  });

   test('only one accordion item can be open at a time', () => {
    render(<SectionSqlDB />);
    const firstItemTitle = "Normalization vs. Denormalization";
    const secondItemTitle = "Indexing Strategies (B-Trees, B+Trees)";

    const firstButton = screen.getByText(firstItemTitle);
    const secondButton = screen.getByText(secondItemTitle);

    // Open first item
    fireEvent.click(firstButton);
    expect(screen.getByText(/Normalization content\./)).toBeInTheDocument();
    expect(screen.queryByText(/Indexing content\./)).not.toBeVisible();

    // Open second item
    fireEvent.click(secondButton);
    expect(screen.queryByText(/Normalization content\./)).not.toBeVisible();
    expect(screen.getByText(/Indexing content\./)).toBeInTheDocument();
    expect(secondButton.querySelector('[data-testid="KeyboardArrowUpIcon"]')).toBeInTheDocument();
    expect(firstButton.querySelector('[data-testid="KeyboardArrowDownIcon"]')).toBeInTheDocument();
  });
});
