import React, { Suspense, lazy } from 'react';
import { Typography, CircularProgress } from '@mui/material'; // Keep necessary MUI imports
import TopicPageLayout from '../common/TopicPageLayout'; // Import the new layout
import SidebarLoadBalancing from './SidebarLoadBalancing';
import { loadBalancingAppData } from '../../data/loadBalancingAppData';

// Lazy load views - these remain the same
const FundamentalsView = lazy(() => import('./FundamentalsView'));
const AlgorithmsView = lazy(() => import('./AlgorithmsView'));
const TypesView = lazy(() => import('./TypesView'));
const ScenariosView = lazy(() => import('./ScenariosView'));
const PracticeView = lazy(() => import('./PracticeView'));

// This function will be passed to TopicPageLayout
const renderLoadBalancingView = (currentView, data) => {
  const commonProps = { appData: data };
  switch (currentView) {
    case 'fundamentals':
      return <FundamentalsView {...commonProps} />;
    case 'algorithms':
      return <AlgorithmsView {...commonProps} />;
    case 'types':
      return <TypesView {...commonProps} />;
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

function LoadBalancingPage() {
  return (
    <TopicPageLayout
      pageTitle="Load Balancing"
      SidebarComponent={SidebarLoadBalancing}
      renderViewFunction={renderLoadBalancingView}
      initialView="fundamentals" // Default view for this page
      appData={loadBalancingAppData}
      topicId="load-balancing" // Unique identifier for this topic page
    />
  );
}

export default LoadBalancingPage;
