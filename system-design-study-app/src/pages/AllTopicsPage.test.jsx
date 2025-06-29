import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AllTopicsPage from './AllTopicsPage';

// Mock metaUtils
vi.mock('../utils/metaUtils', () => ({
  setMetaTag: vi.fn(),
  removeMetaTag: vi.fn(),
}));

// Mock appData imports as they can be large and complex
// We only need their structure for AllTopicsPage to process them.
vi.mock('../data/cachesAppData', () => ({ cachesAppData: { title: 'Caching', overview: 'Cache overview', terminology: [], metrics: [] } }));
vi.mock('../data/databasesAppData', () => ({ databasesAppData: { title: 'Databases', overview: 'DB overview', terminology: [], databasepedia: [] } }));
vi.mock('../data/messagingQueuesAppData', () => ({ messagingQueuesAppData: { title: 'Messaging Queues', overview: 'MQ overview', terminology: [] } }));
vi.mock('../data/loadBalancingAppData', () => ({ loadBalancingAppData: { title: 'Load Balancing', overview: 'LB overview', terminology: [] } }));
vi.mock('../data/apiDesignAppData', () => ({ apiDesignAppData: { title: 'API Design', overview: 'API overview', terminology: [] } }));
vi.mock('../data/scalabilityConceptsAppData', () => ({ scalabilityConceptsAppData: { title: 'Scalability Concepts', overview: 'Scalability overview', terminology: [] } }));
vi.mock('../data/interviewApproachAppData', () => ({ interviewApproachAppData: { title: 'Interview Approach', overview: 'Interview overview', sections: [] } }));


describe('AllTopicsPage', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('renders the main title "All Topics"', () => {
    render(
      <Router>
        <AllTopicsPage />
      </Router>
    );
    expect(screen.getByRole('heading', { name: /All Topics/i, level: 1 })).toBeInTheDocument();
  });

  test('renders search input for topics', () => {
    render(
      <Router>
        <AllTopicsPage />
      </Router>
    );
    expect(screen.getByLabelText('Search Topics & Descriptions')).toBeInTheDocument();
  });

  test('renders main topic titles from the guides data', () => {
    render(
      <Router>
        <AllTopicsPage />
      </Router>
    );
    // Check for a few known main topic titles
    expect(screen.getByText('Caching Strategies')).toBeInTheDocument();
    expect(screen.getByText('Database Selection')).toBeInTheDocument();
    expect(screen.getByText('Interview Approach')).toBeInTheDocument(); // This is from the guides array in AllTopicsPage
    expect(screen.getByText('Glossary of Terms')).toBeInTheDocument(); // Static link at the bottom
  });

  test('filters topics based on search term', () => {
    render(
      <Router>
        <AllTopicsPage />
      </Router>
    );
    const searchInput = screen.getByLabelText('Search Topics & Descriptions');
    fireEvent.change(searchInput, { target: { value: 'Caching' } });

    expect(screen.getByText('Caching Strategies')).toBeInTheDocument();
    expect(screen.queryByText('Database Selection')).not.toBeInTheDocument(); // Should be filtered out

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Database Selection')).toBeInTheDocument(); // Should reappear
  });

});
