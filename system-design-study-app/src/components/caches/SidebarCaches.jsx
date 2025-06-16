// src/components/caches/SidebarCaches.jsx
import React from 'react';

const navLinksData = [
  { view: 'fundamentals', label: 'Fundamentals', icon: '📖' },
  { view: 'cachepedia', label: 'Cachepedia', icon: '📚' },
  { view: 'patterns', label: 'Patterns & Policies', icon: '🎨' },
  { view: 'scenarios', label: 'Case Studies', icon: '💼' },
  { view: 'practice', label: 'Practice Tools', icon: '🏋️' },
  { view: 'code', label: 'Code Library', icon: '💻' },
];

const SidebarCaches = ({ currentView, onNavClick }) => {
  return (
    <nav className="w-16 md:w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-xl font-bold text-primary dark:text-primary-light hidden md:block">Caching Guide</h1>
        <div className="text-2xl font-bold text-primary dark:text-primary-light md:hidden text-center">🧠</div>
      </div>
      <div className="flex-grow">
        {navLinksData.map(link => (
          <button
            key={link.view}
            onClick={() => onNavClick(link.view)}
            title={link.label} // Added title for accessibility on hover for icon-only view
            className={`flex items-center p-3 md:p-4 text-sm font-medium w-full text-left transition-colors duration-150
              ${currentView === link.view
                ? 'bg-primary text-white shadow-inner' // Added shadow-inner for active state
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-light/20 dark:hover:bg-neutral-700'}`}
          >
            <span className="text-xl md:text-2xl">{link.icon}</span>
            <span className="ml-3 md:ml-4 hidden md:inline">{link.label}</span>
          </button>
        ))}
      </div>
      {/* Optional: Add a small footer or version number if desired */}
      {/* <div className="p-2 text-center text-xs text-neutral-400 dark:text-neutral-500 border-t border-neutral-200 dark:border-neutral-700">
        <p className="hidden md:block">v1.0</p>
      </div> */}
    </nav>
  );
};
export default SidebarCaches;
