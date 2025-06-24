import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Correctly import useAuth
import LoginPage from './LoginPage';
import '@testing-library/jest-dom';

// Mock useAuth hook
vi.mock('../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../contexts/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(), // Will be mocked per test or describe block if needed
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

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedNavigate.mockClear();
    vi.mocked(useAuth).mockReturnValue({
      login: vi.fn().mockRejectedValue(new Error('Test login error')),
      currentUser: null,
    });
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <AuthProvider> {/* AuthProvider might not be strictly necessary if useAuth is fully mocked */}
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('displays an error message with role="alert" on login failure', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    const errorMessage = await screen.findByText('Failed to log in. Please check your credentials.');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id', 'form-error-message');
  });

  test('Sign up link has increased touch target padding', async () => {
    await act(async () => {
      renderComponent();
    });
    const signupLink = screen.getByRole('link', { name: /sign up/i });
    expect(signupLink).toHaveClass('p-3');
  });
});
