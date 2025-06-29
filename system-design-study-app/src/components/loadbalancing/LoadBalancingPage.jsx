import React, { Suspense, lazy, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../common/TopicPageLayout';
import TopicSidebar from '../common/TopicSidebar'; // Import the unified TopicSidebar
import { loadBalancingAppData } from '../../data/loadBalancingAppData';
import { setMetaTag, removeMetaTag } from '../../utils/metaUtils';

// Lazy load views
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
      return (
        <Suspense fallback={<CircularProgress />}>
          <FundamentalsView {...commonProps} />
        </Suspense>
      );
  }
};

// Define the sections for the sidebar based on the views
const loadBalancingSidebarSections = [
  { id: 'fundamentals', title: 'Fundamentals' },
  { id: 'algorithms', title: 'Algorithms' },
  { id: 'types', title: 'Types of LBs' },
  { id: 'scenarios', title: 'Scenarios & Trade-offs' },
  { id: 'practice', title: 'Practice Questions' },
];

// Moved SidebarComponentWithProps outside the LoadBalancingPage component
const SidebarComponentWithProps = (props) => (
  <TopicSidebar
    topicTitle="Load Balancing" // Title for the sidebar
    sections={loadBalancingSidebarSections} // Pass the sections data
    currentView={props.currentView}
    setCurrentView={props.setCurrentView}
  />
);

function LoadBalancingPage() {
  const pageTitle = `${loadBalancingAppData.title || 'Load Balancing'} | System Design Interview Prep`;
  const pageDescription = loadBalancingAppData.overview
    ? loadBalancingAppData.overview.substring(0, 160) + (loadBalancingAppData.overview.length > 160 ? '...' : '')
    : "Understand various load balancing algorithms, types (L4/L7), and their impact on system availability, scalability, and performance.";

  useEffect(() => {
    const originalDocTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
      { name: 'og:type', content: 'website', isProperty: true },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalDocTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

  return (
    <TopicPageLayout
      pageTitle={loadBalancingAppData.title || "Load Balancing"}
      SidebarComponent={SidebarComponentWithProps}
      renderViewFunction={renderLoadBalancingView}
      initialView="fundamentals"
      appData={loadBalancingAppData}
      topicId="load-balancing"
    />
  );
}

export default LoadBalancingPage;
