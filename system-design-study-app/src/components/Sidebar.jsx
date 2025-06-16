import React from 'react';
import { NavLink } from 'react-router-dom';

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
  return (
    <div className="w-72 bg-white dark:bg-neutral-800 p-5 shadow-2xl flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-primary dark:text-primary-light">
          System Design
        </h1>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">Study Guides</span>
      </div>
      <nav className="flex-grow">
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
      <div className="mt-auto text-center text-xs text-neutral-400 dark:text-neutral-500">
        <p>&copy; {new Date().getFullYear()} StudyApp Inc.</p>
      </div>
    </div>
  );
};
export default Sidebar;
