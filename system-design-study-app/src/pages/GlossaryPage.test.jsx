import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Needed for useLocation
import GlossaryPage from './GlossaryPage';

// Mock glossaryData. Using vi.mock to ensure it's hoisted.
vi.mock('../data/glossaryData.js', () => ({
  glossaryData: [
    { id: 'term1', term: 'Cache', definition: 'A hardware or software component that stores data so that future requests for that data can be served faster.' },
    { id: 'term2', term: 'API', definition: 'Application Programming Interface.' },
  ]
}));

describe('GlossaryPage', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;

    // Mock for URLSearchParams used by useLocation().search
    const mockURLSearchParams = vi.fn(() => ({
        get: vi.fn((param) => {
            if (param === 'search') return null; // Default behavior, can be overridden in tests
            return null;
        }),
    }));
    global.URLSearchParams = mockURLSearchParams;
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Clean up mocks
  });

  test('renders the main title "Glossary"', () => {
    render(
      <Router>
        <GlossaryPage />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /Glossary/i, level: 1 })).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(
      <Router>
        <GlossaryPage />
      </Router>
    );
    expect(screen.getByPlaceholderText('Search terms...')).toBeInTheDocument();
  });

  test('renders terms from mocked glossaryData', () => {
    render(
      <Router>
        <GlossaryPage />
      </Router>
    );
    expect(screen.getByRole('heading', { name: 'A', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'C', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Cache')).toBeInTheDocument();
  });

  test('displays "No terms match" message for an unmatchable search', () => {
    render(
      <Router>
        <GlossaryPage />
      </Router>
    );
    const searchInput = screen.getByPlaceholderText('Search terms...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentTerm123' } });
    expect(screen.getByText('No terms match your search for "NonExistentTerm123".')).toBeInTheDocument();
  });
});
