import React from 'react'; // Added React import
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import { AuthProvider } from '../contexts/AuthContext'; // Assuming AuthProvider might be needed by children
import { CustomThemeProvider } from '../contexts/ThemeContext'; // Import the actual provider
import '@testing-library/jest-dom';

// Mock Sidebar as it's complex and not the focus of this specific test
vi.mock('./Sidebar', () => ({
  default: () => <div data-testid="mock-sidebar">Mock Sidebar</div>,
}));

// Mock MUI components that are not directly under test but are part of Layout
vi.mock('@mui/material', () => ({
  AppBar: ({ children, ...props }) => React.createElement('header', props, children),
  Toolbar: ({ children, ...props }) => React.createElement('div', { ...props, 'data-testid': 'mock-toolbar' }, children), // Added testid for clarity
  IconButton: ({ children, component: PassedComponent, ...props }) => {
    if (PassedComponent) {
      // If PassedComponent is Link, it needs a 'to' prop, which should be in ...props
      return React.createElement(PassedComponent, props, children);
    }
    return React.createElement('button', props, children);
  },
  Typography: ({ children, noWrap, sx, ...props }) => (
    React.createElement('div', {
      'data-testid': "mock-typography",
      'data-nowrap': noWrap ? 'true' : 'false',
      'data-sx': JSON.stringify(sx),
      ...props
    }, children)
  ),
  Box: ({ children, sx, ...props }) => (
    React.createElement('div', {
      'data-testid': "mock-box",
      'data-sx': JSON.stringify(sx),
      ...props
    }, children)
  ),
}));

vi.mock('@mui/icons-material/Home', () => ({
  default: () => React.createElement('span', { 'data-testid': "mock-home-icon" }, "HomeIcon"),
}));


describe('Layout Component', () => {
  // Helper function to render Layout with a specific route
  const renderLayoutAtRoute = (route) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <CustomThemeProvider> {/* Provide theme context */}
          <AuthProvider> {/* Assuming AuthContext is used */}
            <Layout>
              <div>Page Content</div>
            </Layout>
          </AuthProvider>
        </CustomThemeProvider>
      </MemoryRouter>
    );
  };

  test('renders Sidebar and children for non-topic pages', () => {
    renderLayoutAtRoute('/');
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  describe('TopicPageLayout specific tests', () => {
    // Test one of the topic page paths
    const topicRoute = '/caches';

    test('renders minimal header with HomeIcon and title for topic pages', () => {
      renderLayoutAtRoute(topicRoute);
      expect(screen.getByTestId('mock-home-icon')).toBeInTheDocument();
      expect(screen.getByText('System Design Guide')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-sidebar')).not.toBeInTheDocument(); // Sidebar should not be present
    });

    test('Typography for title in TopicPageLayout has correct props for truncation and flexibility', () => {
      renderLayoutAtRoute(topicRoute);

      // Find all mock typography components
      const typographyElements = screen.getAllByTestId('mock-typography');
      // Find the one that contains the title text
      const titleTypography = typographyElements.find(el => el.textContent === 'System Design Guide');

      expect(titleTypography).toBeInTheDocument();
      expect(titleTypography).toHaveAttribute('data-nowrap', 'true'); // Check noWrap prop

      const sxProps = JSON.parse(titleTypography.getAttribute('data-sx'));
      expect(sxProps).toEqual(expect.objectContaining({
        flexGrow: 1,
        minWidth: 0,
      }));
    });
  });
});
