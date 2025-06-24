import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext'; // Import theme context hook
import Button from './common/Button';
import IconButton from '@mui/material/IconButton'; // For theme toggle button
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon

const navItems = [
  { path: '/', label: 'Home', exact: true },
  { path: '/interview-approach', label: 'Interview Approach' }, // Added new item
  { path: '/caches', label: 'Caching Strategies' },
  { path: '/databases', label: 'Database Selection' },
  { path: '/messaging-queues', label: 'Messaging Queues' },
  { path: '/load-balancing', label: 'Load Balancing' }, // Added new item
  { path: '/api-design', label: 'API Design' }, // Added new item
  { path: '/scalability-concepts', label: 'Scalability Concepts' }, // Added new item
];

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const { themeMode, toggleTheme } = useCustomTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to log out:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="w-72 bg-white dark:bg-neutral-800 p-5 shadow-2xl flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-primary dark:text-primary-light">
            System Design
          </h1>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">Study Guides</span>
        </div>
        <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
      <nav className="flex-grow mt-4"> {/* Added mt-4 for spacing after title/toggle */}
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-3">
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ease-in-out duration-150
                  ${isActive
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-primary-light/20 dark:hover:bg-neutral-700 hover:text-primary dark:hover:text-primary-light'}`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        {currentUser ? (
          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 truncate" title={currentUser.email}>
              {currentUser.email}
            </p>
            <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login" className="w-full">
            <Button variant="primary" size="sm" className="w-full">
              Login / Sign Up
            </Button>
          </Link>
        )}
      </div>

      <div className="mt-auto pt-5 text-center text-xs text-neutral-500 dark:text-neutral-500">
        <p>&copy; {new Date().getFullYear()} StudyApp Inc.</p>
      </div>
    </div>
  );
};
export default Sidebar;
