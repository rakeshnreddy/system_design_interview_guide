import React from 'react';
// Potentially import Button component if using it directly for login/logout
// import Button from '../common/Button';

const SidebarMQ = ({ setActiveModule, activeModule, user, handleLogin, handleLogout }) => (
  <div className="w-64 p-4 bg-neutral-100 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
    <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">MQ Modules</h2>
    <nav className="flex-grow">
      <ul>
        {['intro', 'deepdive', 'guarantees', 'scalability', 'frameworks', 'scenarios', 'cheatsheet', 'practice'].map(moduleName => (
          <li key={moduleName} className="mb-2">
            <button
              onClick={() => setActiveModule(moduleName)}
              className={`block w-full text-left p-2 rounded-md hover:bg-primary-light/20 focus:outline-none focus:ring-2 focus:ring-primary capitalize
                ${activeModule === moduleName ? 'bg-primary-light/30 text-primary dark:text-primary-light font-semibold' : 'text-neutral-700 dark:text-neutral-300'}`}
            >
              {moduleName.replace(/([A-Z_])/g, ' $1').replace(/^./, str => str.toUpperCase())} {/* Format module names */}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <div className="mt-auto py-2">
      {user ? (
        <div className="p-2 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 truncate" title={user.displayName || user.email}>
            Welcome, {user.displayName?.split(' ')[0] || user.email}
          </p>
          <button
            onClick={handleLogout}
            // Using global Button component style for consistency - these are direct Tailwind classes from previous step, can be refactored to <Button>
            className="w-full px-3 py-1.5 text-xs bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          // Using global Button component style for consistency
          className="w-full px-4 py-2 text-sm bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors duration-150"
        >
          Login for Full Features
        </button>
      )}
    </div>
  </div>
);

export default SidebarMQ;
