import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'; // Renamed to MuiThemeProvider
import { CustomThemeProvider } from '../contexts/ThemeContext'; // Import CustomThemeProvider
import Layout from './Layout';
import { topicsData } from '../data/topicsData'; // Corrected path for topicsData

// Mocking localStorage for ThemeContext
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const muiTheme = createTheme(); // For MuiThemeProvider

// Helper component to display current location for navigation testing
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}{location.hash}</div>;
};

// Mock CachesPage to avoid rendering its actual complex content
// We only care that navigation reaches a route that *would* render it.
import CachesPage from '../pages/CachesPage'; // Corrected Import the mock
import DatabasesPage from '../pages/DatabasesPage'; // Corrected Import the mock
import { vi } from 'vitest'; // Import vi for mocking

vi.mock('../pages/CachesPage', () => ({ // Corrected path in mock and use vi.mock
  default: () => { // Ensure the mock returns a default export if that's how it's imported
    const location = useLocation();
    // When navigating to /caches#some-id, CachesPage mock should indicate the fragment
    // For this test, we'll just have it render its path and hash too.
    return (
      <div data-testid="caches-page-content">
        Caches Page Mock
        <div data-testid="mock-caches-location">{location.pathname}{location.hash}</div>
      </div>
    );
  }
}));
vi.mock('../pages/DatabasesPage', () => ({ // Corrected path in mock and use vi.mock
  default: () => <div>Databases Page Mock</div> // Ensure mock returns a default export
}));

const TestChild = () => <div>Test Child Content</div>;

const renderLayoutWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CustomThemeProvider>
        <MuiThemeProvider theme={muiTheme}>
          <Routes>
            <Route path="/*" element={
              <Layout>
                <LocationDisplay />
                <TestChild />
              </Layout>
            } />
            {/* Define routes that our nav links point to, using mocks */}
            <Route path="/caches" element={
              <Layout>
                <CachesPage /> {/* Use the imported mock directly */}
                <LocationDisplay />
              </Layout>
            } />
             <Route path="/databases" element={
              <Layout>
                <DatabasesPage /> {/* Use the imported mock directly */}
                <LocationDisplay />
              </Layout>
            } />
            {/* Add more routes as needed for comprehensive nav testing */}
          </Routes>
        </MuiThemeProvider>
      </CustomThemeProvider>
    </MemoryRouter>
  );
};


describe('Layout Component - Basic Rendering', () => {
  beforeEach(() => {
    window.localStorage.clear();
    // For basic rendering tests, initial route doesn't matter as much
    renderLayoutWithRouter();
  });

  test('renders the header with site title', () => {
    expect(screen.getByText(/System Design Guide/i, { selector: 'a' })).toBeInTheDocument();
  });

  test('renders navigation links in the header for desktop', () => {
    expect(screen.getByRole('button', { name: /All Topics/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Featured Study Guides/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Study Resources/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /About Us/i })).toBeInTheDocument();
  });

  test('renders children content', () => {
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });

  test('renders the footer with copyright information', () => {
    expect(screen.getByText(/© \d{4} System Design Guide. All rights reserved./i)).toBeInTheDocument();
  });

  test('renders privacy policy and terms of service links in the footer', () => {
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Terms of Service/i })).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    expect(screen.getByRole('button', { name: /toggle site theme/i })).toBeInTheDocument();
  });

  test('mobile menu button is not present in default desktop view', () => {
    const menuButton = screen.queryByRole('button', { name: /open drawer/i });
    expect(menuButton).not.toBeInTheDocument();
  });
});


describe('Layout Component - Navigation', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('navigates to a Featured Study Guide page (Caching Strategies)', async () => {
    renderLayoutWithRouter(['/']); // Start at home

    const featuredGuidesButton = screen.getByRole('button', { name: /Featured Study Guides/i });
    fireEvent.click(featuredGuidesButton);

    const cachingLink = await screen.findByRole('menuitem', { name: /Caching Strategies/i });
    fireEvent.click(cachingLink);

    // Check if the location display (rendered inside Layout, now part of the /caches route's Layout) reflects the new path
    // This relies on CachesPage mock or actual page to render LocationDisplay or unique text
    await waitFor(() => {
      // We expect to be on the /caches path. LocationDisplay within that route's Layout will show it.
      expect(screen.getByTestId('location-display')).toHaveTextContent('/caches');
    });
  });

  test('navigates to an All Topics link with fragment (Client-Side Caching)', async () => {
    renderLayoutWithRouter(['/']); // Start at home

    const allTopicsButton = screen.getByRole('button', { name: /All Topics/i });
    fireEvent.click(allTopicsButton);

    // Find the specific topic from topicsData to ensure we click a valid one
    const clientSideCachingTopic = topicsData.find(topic => topic.id === 'cache-client-side');
    expect(clientSideCachingTopic).toBeDefined(); // Ensure the topic exists

    const topicLink = await screen.findByRole('menuitem', { name: clientSideCachingTopic.title });
    fireEvent.click(topicLink);

    // Check if the location display reflects the new path and hash
    // Link should be /caches#cache-client-side
    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent('/caches#cache-client-side');
    });
    // Additionally, if CachesPage mock is sophisticated enough, you could check for its content
    // For now, checking location-display is the primary goal.
  });

  // TODO: Add a test for mobile navigation if time permits and useMediaQuery can be mocked.
});
