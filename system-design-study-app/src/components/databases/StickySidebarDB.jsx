// src/components/databases/StickySidebarDB.jsx
import React from 'react';

const StickySidebarDB = ({ sections, activeSection, onNavClick }) => {
  return (
    <aside className="w-64 hidden lg:block sticky top-0 h-screen flex-shrink-0 overflow-y-auto p-6 pr-8 border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        {/* The `top-0` assumes it's a direct child of a flex container that fills the screen.
            If Layout.jsx has a header, this might need adjustment or the parent div in DatabasesPage.jsx
            might need to account for the header height. For now, this is standard.
            `h-screen` ensures it tries to take full viewport height.
            `overflow-y-auto` in case of many sections.
        */}
      <nav className="space-y-1.5 sticky top-6"> {/* Sticky within its container if needed */}
        <h3 className="font-bold text-lg mb-3 text-neutral-800 dark:text-neutral-100 px-3">
          Database Topics
        </h3>
        {sections.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`} // Semantic href for accessibility
            onClick={(e) => {
              e.preventDefault();
              onNavClick(section.id);
            }}
            className={`block px-3 py-2 text-sm rounded-md transition-all duration-150 ease-in-out transform
              ${activeSection === section.id
                ? 'bg-primary-light/20 text-primary dark:text-primary-light font-semibold border-l-4 border-primary shadow-sm translate-x-px' // Active state with left border and slight shadow/translate
                : 'border-l-4 border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </aside>
  );
};
export default StickySidebarDB;
