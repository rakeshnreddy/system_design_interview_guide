// src/pages/CachesPage.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar'; // Import the new TopicSidebar
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';
import { cachesAppData } from '../data/cachesAppData';

// Lazy load views
const FundamentalsView = lazy(() => import('../components/caches/FundamentalsView'));
const CachepediaView = lazy(() => import('../components/caches/CachepediaView'));
const PatternsView = lazy(() => import('../components/caches/PatternsView'));
const ScenariosView = lazy(() => import('../components/caches/ScenariosView'));
const PracticeView = lazy(() => import('../components/caches/PracticeView'));
const CodeLibraryView = lazy(() => import('../components/caches/CodeLibraryView'));

// This function will be passed to TopicPageLayout
const renderCachesView = (currentView, data) => {
  const commonProps = { appData: data };
  switch (currentView) {
    case 'fundamentals':
      return <FundamentalsView {...commonProps} />;
    case 'cachepedia':
      return <CachepediaView {...commonProps} />; // Original
      // return <div data-testid="cachepedia-test-content">CACHE PEDIA TEST VIEW VIA DIV</div>; // Diagnostic
    case 'patterns':
      return <PatternsView {...commonProps} />;
    case 'scenarios':
      return <ScenariosView {...commonProps} />;
    case 'practice':
      return <PracticeView {...commonProps} />;
    case 'code':
      return <CodeLibraryView {...commonProps} />;
    default:
      // Default to FundamentalsView, ensure it's wrapped in Suspense if not already handled by caller
      // However, TopicPageLayout already wraps the result of this function in Suspense.
      return <FundamentalsView {...commonProps} />;
  }
};

// Define the sections for the sidebar
const cacheSidebarSections = [
  { id: 'fundamentals', title: 'Fundamentals' },
  { id: 'cachepedia', title: 'Cachepedia' },
  { id: 'patterns', title: 'Caching Patterns' },
  { id: 'scenarios', title: 'Scenarios & Trade-offs' },
  { id: 'practice', title: 'Practice Questions' },
  { id: 'code', title: 'Code Library' },
];

// Moved SidebarComponentWithProps outside the CachesPage component
const SidebarComponentWithProps = (props) => (
  <TopicSidebar
    topicTitle="Caching Topics" // Pass the topic title
    sections={cacheSidebarSections} // Pass the sections data
    currentView={props.currentView}
    setCurrentView={props.setCurrentView}
  />
);

function CachesPage() {
  const pageTitle = "Caching Strategies | System Design Interview Prep";
  const pageDescription = "Master caching techniques, patterns, and trade-offs for high-performance systems. Learn about cache invalidation, eviction policies, and more.";

  useEffect(() => {
    const originalTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

  return (
    <>
      <TopicPageLayout
        pageTitle="Caching Strategies"
        SidebarComponent={SidebarComponentWithProps}
        renderViewFunction={renderCachesView}
        initialView="fundamentals"
        appData={cachesAppData}
        topicId="caches"
      />
    </>
  );
}

export default CachesPage;
