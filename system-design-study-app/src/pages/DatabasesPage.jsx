// src/pages/DatabasesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
// Import section components once they are created
// import StickySidebarDB from '../components/databases/StickySidebarDB';
// import SectionIntroDB from '../components/databases/SectionIntroDB';
// ... other section imports
import Card from '../components/common/Card'; // Already exists
import StickySidebarDB from '../components/databases/StickySidebarDB';

// IMPORTANT: User must provide their Gemini API key here for AI features in SectionAiSimulatorDB
const GEMINI_API_KEY = "AIzaSyBFYfB6q6jTlXchN0t24-8THXXxXUn-ehU";

// Placeholder components until actual ones are created and imported
// const StickySidebarDBPlaceholder = ({ sections, activeSection, onNavClick }) => ( ... ); // Removed

const SectionPlaceholder = ({ title, id, children }) => (
    <Card padding="p-6 md:p-8" shadow="shadow-lg" id={id} className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-light mb-4">{title}</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
            {children || <p>Content for this section will be populated by the actual component: <code className="text-sm bg-neutral-200 dark:bg-neutral-700 p-1 rounded">{`Section${id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, '')}DB.jsx`}</code></p>}
        </div>
    </Card>
);

// Temporary placeholders for actual section components
import SectionIntroDB from '../components/databases/SectionIntroDB';
import SectionSqlDB from '../components/databases/SectionSqlDB';
import SectionKeyValueDB from '../components/databases/SectionKeyValueDB';
import SectionWideColumnDB from '../components/databases/SectionWideColumnDB';
import SectionDocumentDB from '../components/databases/SectionDocumentDB';
import SectionSearchDB from '../components/databases/SectionSearchDB';
import SectionGraphDB from '../components/databases/SectionGraphDB';
import SectionPolyglotDB from '../components/databases/SectionPolyglotDB';
import SectionReplicationDB from '../components/databases/SectionReplicationDB';
// Removed duplicate SectionReplicationDB import
import SectionSummaryDB from '../components/databases/SectionSummaryDB';
import SectionAiSimulatorDB from '../components/databases/SectionAiSimulatorDB';


const DatabasesPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const sectionsRef = useRef({});

  const [aiProblem, setAiProblem] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Define sections with their respective (placeholder) components
  const sectionComponents = [
    { id: 'intro', title: 'The First Question', Component: SectionIntroDB },
    { id: 'sql', title: 'Relational (SQL)', Component: SectionSqlDB },
    { id: 'key-value', title: 'Key-Value Stores', Component: SectionKeyValueDB },
    { id: 'wide-column', title: 'Wide-Column Stores', Component: SectionWideColumnDB },
    { id: 'document', title: 'Document Databases', Component: SectionDocumentDB },
    { id: 'search', title: 'Search Indexes', Component: SectionSearchDB },
    { id: 'graph', title: 'Graph Databases', Component: SectionGraphDB },
    { id: 'polyglot', title: 'Putting It All Together', Component: SectionPolyglotDB },
    { id: 'replication', title: 'Data Replication', Component: SectionReplicationDB },
    { id: 'summary', title: 'DB Comparison Summary', Component: SectionSummaryDB }, // Added new section
    { id: 'ai-simulator', title: 'AI Interview Simulator', Component: SectionAiSimulatorDB, passProps: { geminiKey: GEMINI_API_KEY, isAiLoading, setIsAiLoading, aiProblem, setAiProblem } },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px", // Aim to activate when section is more in the upper-middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRefs = sectionsRef.current;
    Object.values(currentRefs).forEach(sectionEl => {
      if (sectionEl) observer.observe(sectionEl);
    });

    return () => {
      Object.values(currentRefs).forEach(sectionEl => {
        if (sectionEl) observer.unobserve(sectionEl);
      });
    };
  }, []);

  const handleNavClick = (sectionId) => {
     const sectionElement = sectionsRef.current[sectionId];
     if (sectionElement) {
         const mainLayout = document.querySelector('main'); // Assuming Layout.jsx main content area
         const topOffset = 80; // Approximate height of sticky header or desired offset

         if (mainLayout) {
            const elementPosition = sectionElement.offsetTop;
            mainLayout.scrollTo({
                top: elementPosition - topOffset,
                behavior: 'smooth'
            });
         } else { // Fallback for non-main layout scroll or direct window scroll
            const elementPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                 top: elementPosition - topOffset,
                 behavior: 'smooth'
            });
         }
         setActiveSection(sectionId); // Update active section on click
     }
  };

  return (
    <div className="flex flex-1 bg-neutral-50 dark:bg-neutral-900"> {/* Base page background */}
      <StickySidebarDB
         sections={sectionComponents.map(s => ({id: s.id, title: s.title}))}
         activeSection={activeSection}
         onNavClick={handleNavClick}
     />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}> {/* Main content area should scroll */}
        <div className="max-w-4xl mx-auto"> {/* Content column */}
          {sectionComponents.map(({ id, Component, passProps = {} }) => (
            // Each section wrapper needs the ref for IntersectionObserver
            // The `scroll-mt` class provides top margin when scrolled to, to not be hidden by a fixed header. Adjust value as needed.
            <section key={id} id={id} ref={el => sectionsRef.current[id] = el} className="db-section scroll-mt-20 md:scroll-mt-24 py-8 first:pt-0 last:pb-0">
              <Component {...passProps} />
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};
export default DatabasesPage;
