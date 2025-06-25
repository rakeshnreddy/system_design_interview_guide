import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContactPage from './ContactPage';

// Mock metaUtils
import { vi } from 'vitest';
vi.mock('../utils/metaUtils'); // Simplified mock

import { setMetaTag, removeMetaTag } from '../utils/metaUtils'; // Import after mock

const theme = createTheme();

describe('ContactPage Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <ThemeProvider theme={theme}>
          <ContactPage />
        </ThemeProvider>
      </Router>
    );
    // Reset document title for each test if needed, as it's modified by useEffect
    document.title = '';
  });

  test('renders the main heading "Contact Us"', () => {
    expect(screen.getByRole('heading', { name: /Contact Us/i, level: 1 })).toBeInTheDocument();
  });

  test('renders introductory text', () => {
    expect(screen.getByText(/Have questions, feedback, or suggestions?/i)).toBeInTheDocument();
  });

  test('renders form fields: Name, Email, Message', () => {
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test('renders "Send Message" button', () => {
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('allows typing in form fields', () => {
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('John Doe');

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('john@example.com');

    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
    expect(screen.getByLabelText(/Message/i)).toHaveValue('Hello there!');
  });

  test('simulates form submission and shows success message', async () => {
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /Sending.../i })).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Checks for CircularProgress

    await waitFor(() => {
      expect(screen.getByText(/Your message has been sent successfully!/i)).toBeInTheDocument();
    }, { timeout: 2000 }); // Wait for simulated API call

    // Check if form fields are reset
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
    expect(screen.getByLabelText(/Message/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Send Message/i })).not.toBeDisabled();
  });

  test('sets page title and meta tags (mocked)', () => {
    // Re-render or ensure useEffect runs if title is reset aggressively
    // For this setup, the initial render in beforeEach should set it.
    render(
        <Router>
          <ThemeProvider theme={theme}>
            <ContactPage />
          </ThemeProvider>
        </Router>
      );
    expect(document.title).toBe('Contact Us | System Design Guide');
    // setMetaTag is now imported and is the auto-mocked version
    expect(setMetaTag).toHaveBeenCalledWith('description', expect.any(String), undefined);
    expect(setMetaTag).toHaveBeenCalledWith('og:title', 'Contact Us | System Design Guide', true);
  });
});
