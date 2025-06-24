import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Correctly import useAuth
import SignupPage from './SignupPage';
import '@testing-library/jest-dom';

// Mock useAuth hook
vi.mock('../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../contexts/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(), // Will be mocked per test or describe block
  };
});

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('SignupPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedNavigate.mockClear();
    // Default mock for useAuth, can be overridden in specific tests
    vi.mocked(useAuth).mockReturnValue({
      signup: vi.fn().mockRejectedValue(new Error('Default signup error')),
      currentUser: null,
    });
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <AuthProvider> {/* AuthProvider might not be strictly necessary if useAuth is fully mocked */}
          <SignupPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('displays "Passwords do not match" error with role="alert"', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });

    // No need to await act if the state update is synchronous, which setError for password mismatch is
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    // Error message should appear synchronously
    const errorMessage = await screen.findByText('Passwords do not match');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id', 'form-error-message');
  });

  test('displays "Failed to create an account" error with role="alert" on general signup failure', async () => {
    // Configure specific mock for this test if needed, or rely on default from beforeEach
    // This setup will use the default mockRejectedValue from beforeEach
    vi.mocked(useAuth).mockReturnValue({
        signup: vi.fn().mockRejectedValue({ code: 'auth/some-other-error' }), // specific error for this test
        currentUser: null,
      });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'testvalid@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    const errorMessage = await screen.findByText('Failed to create an account. Please try again later.');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id', 'form-error-message');
  });

  test('Log in link has increased touch target padding', () => {
    renderComponent();
    const loginLink = screen.getByRole('link', { name: /log in/i });
    expect(loginLink).toHaveClass('p-3');
  });
});
