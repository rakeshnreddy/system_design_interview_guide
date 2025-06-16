import React, { Suspense, lazy } from 'react';
import { Typography, CircularProgress } from '@mui/material'; // Keep Typography for default case in renderView
import TopicPageLayout from '../common/TopicPageLayout'; // Import the new layout
import SidebarApiDesign from './SidebarApiDesign';
import { apiDesignAppData } from '../../data/apiDesignAppData';

// Lazy load views - these remain the same
const FundamentalsView = lazy(() => import('./FundamentalsView'));
const ProtocolsView = lazy(() => import('./ProtocolsView'));
const PatternsView = lazy(() => import('./PatternsView'));
const SecurityView = lazy(() => import('./SecurityView'));
const ScenariosView = lazy(() => import('./ScenariosView'));
const PracticeView = lazy(() => import('./PracticeView'));

// This function will be passed to TopicPageLayout
// It now takes 'currentView' and 'data' (which will be apiDesignAppData) as arguments
const renderApiDesignView = (currentView, data) => {
  const commonProps = { appData: data }; // Use the passed 'data'
  switch (currentView) {
    case 'fundamentals':
      return <FundamentalsView {...commonProps} />;
    case 'protocols':
      return <ProtocolsView {...commonProps} />;
    case 'patterns':
      return <PatternsView {...commonProps} />;
    case 'security':
      return <SecurityView {...commonProps} />;
    case 'scenarios':
      return <ScenariosView {...commonProps} />;
    case 'practice':
      return <PracticeView {...commonProps} />;
    default:
      // This fallback can be simpler or handled by TopicPageLayout if it has a default
      return (
        <Suspense fallback={<CircularProgress />}>
          <FundamentalsView {...commonProps} />
        </Suspense>
      );
  }
};

function ApiDesignPage() {
  return (
    <TopicPageLayout
      pageTitle="API Design"
      SidebarComponent={SidebarApiDesign}
      renderViewFunction={renderApiDesignView} // Pass the render function
      initialView="fundamentals" // Default view for this page
      appData={apiDesignAppData} // Pass the specific appData
      topicId="api-design" // Unique identifier for this topic page
    />
  );
}

export default ApiDesignPage;
