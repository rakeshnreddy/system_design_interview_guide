import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AboutPage from './AboutPage';

// Mock metaUtils
import { vi } from 'vitest';
vi.mock('../utils/metaUtils'); // Simplified mock, actual functions will be spies

import { setMetaTag, removeMetaTag } from '../utils/metaUtils'; // Import after mock

const theme = createTheme();

describe('AboutPage Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ThemeProvider theme={theme}>
          <AboutPage />
        </ThemeProvider>
      </Router>
    );
  });

  test('renders the main heading "About Us"', () => {
    expect(screen.getByRole('heading', { name: /About Us/i, level: 1 })).toBeInTheDocument();
  });

  test('renders introductory content', () => {
    expect(screen.getByText(/Welcome to the System Design Guide!/i)).toBeInTheDocument();
    expect(screen.getByText(/Our mission is to provide comprehensive, easy-to-understand resources/i)).toBeInTheDocument();
  });

  test('renders "Our Vision" section', () => {
    expect(screen.getByRole('heading', { name: /Our Vision/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/We aim to be the go-to resource for system design interview preparation/i)).toBeInTheDocument();
  });

  test('sets page title and meta tags (mocked)', () => {
    expect(document.title).toBe('About Us | System Design Guide');
    // setMetaTag is now imported and is the auto-mocked version
    expect(setMetaTag).toHaveBeenCalledWith('description', expect.any(String), undefined);
    expect(setMetaTag).toHaveBeenCalledWith('og:title', 'About Us | System Design Guide', true);
  });
});
