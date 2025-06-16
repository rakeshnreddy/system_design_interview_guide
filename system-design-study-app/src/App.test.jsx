import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom'; // To handle router context

describe('App', () => {
  it('renders the main application layout', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    // Look for a common element, e.g., the sidebar title or a nav item
    // Assuming 'Caching Strategies' is a link in the Sidebar
    expect(screen.getByText(/Caching Strategies/i)).toBeInTheDocument();
  });
});
