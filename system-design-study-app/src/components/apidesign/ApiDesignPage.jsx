import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../common/TopicPageLayout';
import TopicSidebar from '../common/TopicSidebar'; // Import the new TopicSidebar
import { apiDesignAppData } from '../../data/apiDesignAppData';

// Lazy load views
const FundamentalsView = lazy(() => import('./FundamentalsView'));
const ProtocolsView = lazy(() => import('./ProtocolsView'));
const PatternsView = lazy(() => import('./PatternsView'));
const SecurityView = lazy(() => import('./SecurityView'));
const ScenariosView = lazy(() => import('./ScenariosView'));
const PracticeView = lazy(() => import('./PracticeView'));

// This function will be passed to TopicPageLayout
const renderApiDesignView = (currentView, data) => {
  const commonProps = { appData: data };
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
      return (
        <Suspense fallback={<CircularProgress />}>
          <FundamentalsView {...commonProps} />
        </Suspense>
      );
  }
};

// Define the sections for the sidebar
const apiDesignSidebarSections = [
  { id: 'fundamentals', title: 'Fundamentals' },
  { id: 'protocols', title: 'Protocols (REST, gRPC, GraphQL)' },
  { id: 'patterns', title: 'Design Patterns' },
  { id: 'security', title: 'Security Best Practices' },
  { id: 'scenarios', title: 'Scenarios & Trade-offs' },
  { id: 'practice', title: 'Practice Questions' },
];

// Moved SidebarComponentWithProps outside the ApiDesignPage component
const SidebarComponentWithProps = (props) => (
  <TopicSidebar
    topicTitle="API Design Topics" // Pass the topic title
    sections={apiDesignSidebarSections} // Pass the sections data
    currentView={props.currentView}
    setCurrentView={props.setCurrentView}
  />
);

function ApiDesignPage() {
  return (
    <TopicPageLayout
      pageTitle="API Design"
      SidebarComponent={SidebarComponentWithProps}
      renderViewFunction={renderApiDesignView}
      initialView="fundamentals"
      appData={apiDesignAppData}
      topicId="api-design"
    />
  );
}

export default ApiDesignPage;
