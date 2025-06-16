// src/pages/CachesPage.jsx
import React, { Suspense, lazy } from 'react'; // Removed useState, useEffect for now
import { Typography, CircularProgress } from '@mui/material'; // For fallback
import TopicPageLayout from '../components/common/TopicPageLayout';
import SidebarCaches from '../components/caches/SidebarCaches'; // Will be passed to layout
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
  // The onGenerateAIScenario prop for ScenariosView is removed as AI modal is in TopicPageLayout
  // If ScenariosView *itself* needs to trigger the modal, that's a different pattern (e.g., context or callback prop)
  switch (currentView) {
    case 'fundamentals':
      return <FundamentalsView {...commonProps} />;
    case 'cachepedia':
      return <CachepediaView {...commonProps} />;
    case 'patterns':
      return <PatternsView {...commonProps} />;
    case 'scenarios':
      return <ScenariosView {...commonProps} />; // Removed onGenerateAIScenario
    case 'practice':
      return <PracticeView {...commonProps} />;
    case 'code':
      return <CodeLibraryView {...commonProps} />;
    default:
      // Fallback to fundamentals view or a placeholder
      return (
        <Suspense fallback={<CircularProgress />}>
          <FundamentalsView {...commonProps} />
        </Suspense>
      );
  }
};

function CachesPage() {
  // The useEffect for hash-based navigation is removed for now.
  // TopicPageLayout sets initialView. If hash sync is needed, it's a more complex feature
  // to integrate with the reusable layout (e.g. passing window.location.hash to initialView or custom effect in TPL)

  return (
    <TopicPageLayout
      pageTitle="Caching Strategies"
      SidebarComponent={SidebarCaches} // Pass the SidebarCaches component itself
      renderViewFunction={renderCachesView}
      initialView="fundamentals" // Default view for Caches
      appData={cachesAppData}
      topicId="caches"
    />
  );
}

export default CachesPage;
