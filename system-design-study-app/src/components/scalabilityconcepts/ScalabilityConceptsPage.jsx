import React, { Suspense, lazy } from 'react';
import { Typography, CircularProgress } from '@mui/material'; // Keep necessary MUI imports
import TopicPageLayout from '../common/TopicPageLayout'; // Import the new layout
import SidebarScalabilityConcepts from './SidebarScalabilityConcepts';
import { scalabilityConceptsAppData } from '../../data/scalabilityConceptsAppData';

// Lazy load views - these remain the same
const FundamentalsView = lazy(() => import('./FundamentalsView'));
const CoreConceptsView = lazy(() => import('./CoreConceptsView'));
const PatternsView = lazy(() => import('./PatternsView'));
const ScenariosView = lazy(() => import('./ScenariosView'));
const PracticeView = lazy(() => import('./PracticeView'));

// This function will be passed to TopicPageLayout
const renderScalabilityConceptsView = (currentView, data) => {
  const commonProps = { appData: data };
  switch (currentView) {
    case 'fundamentals':
      return <FundamentalsView {...commonProps} />;
    case 'coreConcepts':
      return <CoreConceptsView {...commonProps} />;
    case 'patterns':
      return <PatternsView {...commonProps} />;
    case 'scenarios':
      return <ScenariosView {...commonProps} />;
    case 'practice':
      return <PracticeView {...commonProps} />;
    default:
      // Fallback to fundamentals view or a placeholder
      return (
        <Suspense fallback={<CircularProgress />}>
          <FundamentalsView {...commonProps} />
        </Suspense>
      );
  }
};

function ScalabilityConceptsPage() {
  return (
    <TopicPageLayout
      pageTitle="Scalability Concepts"
      SidebarComponent={SidebarScalabilityConcepts}
      renderViewFunction={renderScalabilityConceptsView}
      initialView="fundamentals" // Default view for this page
      appData={scalabilityConceptsAppData}
      topicId="scalability-concepts" // Unique identifier for this topic page
    />
  );
}

export default ScalabilityConceptsPage;
