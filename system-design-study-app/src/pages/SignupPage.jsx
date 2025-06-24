import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import Card from '../components/common/Card';
import Button from '../components/common/Button';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    // Basic password strength check (example)
    if (password.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      navigate('/'); // Redirect to home page or dashboard after successful signup
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else {
        setError('Failed to create an account. Please try again later.');
      }
      console.error("Signup error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <Card className="w-full max-w-md" shadow="shadow-xl" border="border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-light mb-6">Create Account</h2>
        {error && <p role="alert" id="form-error-message" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" disabled={loading} size="lg">
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary inline-block p-3 rounded">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default SignupPage;
