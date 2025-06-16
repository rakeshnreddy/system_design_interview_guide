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

// Updated to accept setCurrentView from TopicPageLayout
const SidebarCaches = ({ currentView, setCurrentView }) => {
  return (
    // Using MUI components for consistency with TopicPageLayout's Drawer
    // This will also make it adapt better to MUI theming if applied later
    <div className="h-full flex flex-col"> {/* Ensure it takes full height of drawer */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
        <h1 className="text-xl font-bold text-primary dark:text-primary-light hidden md:block">Caching Guide</h1>
        <div className="text-2xl font-bold text-primary dark:text-primary-light md:hidden text-center">🧠</div>
      </div>
      <nav className="flex-grow overflow-y-auto"> {/* Allow scrolling if many items */}
        {navLinksData.map(link => (
          <button
            key={link.view}
            onClick={() => setCurrentView(link.view)} // Use setCurrentView directly
            title={link.label}
            className={`flex items-center p-3 md:p-4 text-sm font-medium w-full text-left transition-colors duration-150
              ${currentView === link.view
                ? 'bg-primary text-white shadow-inner'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-light/20 dark:hover:bg-neutral-700'}`}
          >
            <span className="text-xl md:text-2xl">{link.icon}</span>
            <span className="ml-3 md:ml-4 hidden md:inline">{link.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
export default SidebarCaches;
