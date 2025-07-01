import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils'; // Using custom render
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Keep MemoryRouter for specific route testing
import GlossaryPage from './GlossaryPage';
import * as glossaryDataModule from '../data/glossaryData.js';
import * as metaUtilsModule from '../utils/metaUtils.js';

// Mock the glossaryData - using a more comprehensive mock
const mockGlossaryData = [
  { term: "API", definition: "Application Programming Interface. A set of rules.", details: "Defines interactions." },
  { term: "Algorithm", definition: "A process or set of rules to be followed.", details: "Usually in calculations." },
  { term: "Backend", definition: "The part of a system not directly accessed by the user.", details: "Server-side logic." },
  { term: "Cache", definition: "A hardware or software component that stores data.", details: "For faster access." },
  { term: "CDN", definition: "Content Delivery Network.", details: "Distributes content."}
];

// Mock GlossaryTermDetail and Modal
vi.mock('../components/glossary/GlossaryTermDetail', () => ({
  default: ({ term }) => <div data-testid="glossary-term-detail">Term: {term.term}</div>,
}));

vi.mock('../components/common/Modal', () => ({
  default: ({ isOpen, onClose, title, children }) => isOpen ? (
    <div data-testid="modal">
      <h2 id="modal-title">{title}</h2> {/* Ensure modal title has an ID for aria-labelledby if needed */}
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ) : null,
}));

// Mock meta utils
vi.spyOn(metaUtilsModule, 'setMetaTag').mockImplementation(() => {});
vi.spyOn(metaUtilsModule, 'removeMetaTag').mockImplementation(() => {});

describe('GlossaryPage', () => {
  beforeEach(() => {
    // Provide the mock data for each test by spying on the getter
    vi.spyOn(glossaryDataModule, 'glossaryData', 'get').mockReturnValue(mockGlossaryData);

    // Mock IntersectionObserver (from original test file)
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;

    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore original implementations and spies
  });

  // Updated helper to use the modified customRender
  const renderGlossaryPage = (routerProps = { initialEntries: ['/glossary'] }) => {
    // The Routes wrapper is still needed here because GlossaryPage itself uses useLocation,
    // and for useLocation to work correctly in tests when initialEntries change,
    // it needs to be rendered within a Routes context that defines its path.
    // The MemoryRouter is now handled by the customRender via routerProps.
    return render(
      <Routes>
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>,
      { routerProps }
    );
  };

  test('renders the main title "Glossary" and search input', () => {
    renderGlossaryPage();
    expect(screen.getByRole('heading', { name: /Glossary/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search terms...')).toBeInTheDocument();
  });

  test('displays terms grouped by letter and sorted alphabetically', () => {
    renderGlossaryPage();
    // Check for letter headings
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();

    // Check for terms under their respective letters and their order
    const sectionA = screen.getByText('A').closest('div');
    const termsInA = Array.from(sectionA.querySelectorAll('dl dt')).map(dt => dt.textContent);
    expect(termsInA).toEqual(['Algorithm', 'API']);

    const sectionB = screen.getByText('B').closest('div');
    const termsInB = Array.from(sectionB.querySelectorAll('dl dt')).map(dt => dt.textContent);
    expect(termsInB).toEqual(['Backend']);

    const sectionC = screen.getByText('C').closest('div');
    const termsInC = Array.from(sectionC.querySelectorAll('dl dt')).map(dt => dt.textContent);
    expect(termsInC).toEqual(['Cache', 'CDN']);
  });

  test('filters terms based on search input (term name)', () => {
    renderGlossaryPage();
    const searchInput = screen.getByPlaceholderText('Search terms...');

    fireEvent.change(searchInput, { target: { value: 'API' } });
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.queryByText('Algorithm')).not.toBeInTheDocument();
    expect(screen.queryByText('Backend')).not.toBeInTheDocument();
  });

  test('filters terms based on search input (definition content)', () => {
    renderGlossaryPage();
    const searchInput = screen.getByPlaceholderText('Search terms...');
    fireEvent.change(searchInput, { target: { value: 'rules' } });

    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('Algorithm')).toBeInTheDocument();
    expect(screen.queryByText('Backend')).not.toBeInTheDocument();
  });


  test('opens modal with term details when a term is clicked', async () => {
    renderGlossaryPage();
    const apiTermElement = screen.getByText('API');
    fireEvent.click(apiTermElement);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      // Check if modal title is correct
      const modalTitle = screen.getByRole('heading', {name: 'API', level: 2}); // Assuming modal title is h2
      expect(modalTitle).toBeInTheDocument();
      expect(screen.getByTestId('glossary-term-detail')).toHaveTextContent('Term: API');
    });

    // Close modal
    fireEvent.click(screen.getByText('Close')); // Assuming the close button has "Close" text
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  test('handles URL search parameter for initial filtering', () => {
    renderGlossaryPage({ initialEntries: ['/glossary?search=Cache'] });
    expect(screen.getByPlaceholderText('Search terms...')).toHaveValue('Cache');
    expect(screen.getByText('Cache')).toBeInTheDocument();
    expect(screen.queryByText('API')).not.toBeInTheDocument();
  });

  test('handles URL hash for scrolling to a term', async () => {
    renderGlossaryPage({ initialEntries: ['/glossary#term-Cache'] });

    await waitFor(() => {
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    }, { timeout: 200 });
  });

  test('scrollIntoView is called when hash matches an existing term ID', async () => {
    renderGlossaryPage({ initialEntries: [`/glossary#term-${encodeURIComponent("API")}`] });
    await waitFor(() => {
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    }, {timeout: 250});
  });


  test('shows "No terms match" message when filter yields no results', () => {
    renderGlossaryPage();
    const searchInput = screen.getByPlaceholderText('Search terms...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentTerm123' } });
    expect(screen.getByText(/No terms match your search for "NonExistentTerm123"./i)).toBeInTheDocument();
  });

  test('shows "Loading terms or glossary is empty..." if glossaryData is empty initially', () => {
    // Directly mock glossaryData to be empty for this test's scope
    vi.spyOn(glossaryDataModule, 'glossaryData', 'get').mockReturnValue([]);

    renderGlossaryPage();

    // For debugging in case it still fails:
    // screen.debug(null, Infinity); // Log the entire DOM

    expect(screen.getByText(/Loading terms or glossary is empty.../i)).toBeInTheDocument();
  });

});
