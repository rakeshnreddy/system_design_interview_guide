import { render, screen } from '@testing-library/react';
import App from './App';
// MemoryRouter is removed as App.jsx provides its own Router.
// For tests requiring specific routes, MemoryRouter can be used more locally,
// or initialEntries can be passed if App's Router is MemoryRouter in test environment.

describe('App', () => {
  it('renders the main application layout', () => {
    // If App.jsx uses BrowserRouter, tests might need MemoryRouter wrapping
    // specific parts or a way to control history.
    // For now, rendering App directly assumes its internal Router handles context.
    render(<App />);
    // Look for a common element, e.g., the sidebar title or a nav item.
    // This assertion might need to be adjusted based on what's on the default route.
    // For example, if HomePage is the default and contains "Welcome", we can check for that.
    // Or, if Layout elements like Sidebar are always visible:
    // Make the query more specific to target the navigation link
    expect(screen.getByRole('link', { name: /Caching Strategies/i })).toBeInTheDocument();
  });
});
