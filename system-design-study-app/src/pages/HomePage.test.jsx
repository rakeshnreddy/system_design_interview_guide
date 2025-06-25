import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './HomePage';

// Mock metaUtils if they cause issues in test environment or are not needed for these tests
import { vi } from 'vitest';
vi.mock('../utils/metaUtils'); // Simplified mock

import { setMetaTag, removeMetaTag } from '../utils/metaUtils'; // Import after mock

const theme = createTheme();

describe('HomePage Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      </Router>
    );
  });

  test('renders the hero section title', () => {
    expect(screen.getByRole('heading', { name: /Ace Your System Design Interview/i, level: 1 })).toBeInTheDocument();
  });

  test('renders the hero section subtitle', () => {
    expect(screen.getByText(/Comprehensive study guides designed to help you master complex topics/i)).toBeInTheDocument();
  });

  test('renders the hero section call-to-action button linking to topics', () => {
    const ctaButton = screen.getByRole('link', { name: /Explore All Topics/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/topics');
  });

  test('renders "Featured Study Guides" section title', () => {
    expect(screen.getByRole('heading', { name: /Featured Study Guides/i, level: 2 })).toBeInTheDocument();
  });

  test('renders guide cards', () => {
    // Check for titles of the guides
    expect(screen.getByText('Caching Strategies')).toBeInTheDocument();
    expect(screen.getByText('Database Selection')).toBeInTheDocument();
    expect(screen.getByText('Messaging Queues')).toBeInTheDocument();
    // Check for "Start Learning" buttons within cards
    const startLearningButtons = screen.getAllByRole('link', { name: /Start Learning/i });
    expect(startLearningButtons.length).toBeGreaterThanOrEqual(3);
  });

  test('renders "Explore All Topics" card section', () => {
    expect(screen.getByRole('heading', { name: /Explore All Topics/i, level: 2 })).toBeInTheDocument(); // The one in the card
    expect(screen.getByRole('link', { name: /Go to All Topics/i })).toBeInTheDocument();
  });

  test('renders "Why These Guides?" section', () => {
    expect(screen.getByRole('heading', { name: /Why These Guides?/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByText(/Curated content focusing on E5\/Senior Engineer level concepts./i)).toBeInTheDocument();
  });

  test('sets page title and meta tags (mocked)', () => {
    // Ensure the component has rendered and useEffect has run
    // Re-rendering or ensuring HomePage is fully mounted might be needed if title isn't set
    // However, the beforeEach should handle the initial render.
    expect(document.title).toBe('System Design Interview Prep | Ace Your Interview');

    // Access the mocked functions directly via the import
    // const { setMetaTag } = require('../utils/metaUtils'); // No longer needed due to import
    expect(setMetaTag).toHaveBeenCalledWith('description', expect.any(String), undefined);
    expect(setMetaTag).toHaveBeenCalledWith('og:title', pageTitle, true); // Use actual pageTitle for better assertion
  });
});

// Helper to define pageTitle here as it's used in the test
const pageTitle = "System Design Interview Prep | Ace Your Interview";
