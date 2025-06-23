// src/pages/CachesPage.jsx
import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar'; // Import the new TopicSidebar
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
      return <CachepediaView {...commonProps} />;
    case 'patterns':
      return <PatternsView {...commonProps} />;
    case 'scenarios':
      return <ScenariosView {...commonProps} />;
    case 'practice':
      return <PracticeView {...commonProps} />;
    case 'code':
      return <CodeLibraryView {...commonProps} />;
    default:
      return (
        <Suspense fallback={<CircularProgress />}>
          <FundamentalsView {...commonProps} />
        </Suspense>
      );
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

function CachesPage() {
  const SidebarComponentWithProps = (props) => (
    <TopicSidebar
      topicTitle="Caching Topics" // Pass the topic title
      sections={cacheSidebarSections} // Pass the sections data
      currentView={props.currentView}
      setCurrentView={props.setCurrentView}
    />
  );

  return (
    <TopicPageLayout
      pageTitle="Caching Strategies"
      SidebarComponent={SidebarComponentWithProps}
      renderViewFunction={renderCachesView}
      initialView="fundamentals"
      appData={cachesAppData}
      topicId="caches"
    />
  );
}

export default CachesPage;
