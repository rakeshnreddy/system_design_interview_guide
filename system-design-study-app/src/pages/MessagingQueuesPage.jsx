import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar'; // Corrected import
import { messagingQueuesAppData } from '../data/messagingQueuesAppData';

// Lazy load views
const IntroModuleMQ = lazy(() => import('../components/messaging_queues/IntroModuleMQ'));
const DeepDiveModuleMQ = lazy(() => import('../components/messaging_queues/DeepDiveModuleMQ'));
const GuaranteesModuleMQ = lazy(() => import('../components/messaging_queues/GuaranteesModuleMQ'));
const ScalabilityModuleMQ = lazy(() => import('../components/messaging_queues/ScalabilityModuleMQ'));
const FrameworksModuleMQ = lazy(() => import('../components/messaging_queues/FrameworksModuleMQ'));
const ScenariosModuleMQ = lazy(() => import('../components/messaging_queues/ScenariosModuleMQ'));
const CheatSheetModuleMQ = lazy(() => import('../components/messaging_queues/CheatSheetModuleMQ'));
const PracticeModuleMQ = lazy(() => import('../components/messaging_queues/PracticeModuleMQ'));

// This function will be passed to TopicPageLayout
const renderMessagingQueuesView = (currentView, data) => {
  const commonProps = { appData: data };

  switch (currentView) {
    case 'intro':
      return <IntroModuleMQ {...commonProps} />;
    case 'deepdive':
      return <DeepDiveModuleMQ {...commonProps} />;
    case 'guarantees':
      return <GuaranteesModuleMQ {...commonProps} />;
    case 'scalability':
      return <ScalabilityModuleMQ {...commonProps} />;
    case 'frameworks':
      return <FrameworksModuleMQ {...commonProps} />;
    case 'scenarios':
      return <ScenariosModuleMQ {...commonProps} />;
    case 'cheatsheet':
      return <CheatSheetModuleMQ {...commonProps} />;
    case 'practice':
      return <PracticeModuleMQ {...commonProps} />;
    default:
      return (
        <Suspense fallback={<CircularProgress />}>
          <IntroModuleMQ {...commonProps} />
        </Suspense>
      );
  }
};

// Define the sections for the sidebar
const mqSidebarSections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'deepdive', title: 'Deep Dive' },
  { id: 'guarantees', title: 'Delivery Guarantees' },
  { id: 'scalability', title: 'Scalability & Ordering' },
  { id: 'frameworks', title: 'Frameworks (Kafka, RabbitMQ)' },
  { id: 'scenarios', title: 'Scenarios & Use Cases' },
  { id: 'cheatsheet', title: 'Cheat Sheet' },
  { id: 'practice', title: 'Practice Questions' },
];

function MessagingQueuesPage() {
  const SidebarComponentWithProps = (props) => (
    <TopicSidebar
      topicTitle="Messaging Queues"
      sections={mqSidebarSections}
      currentView={props.currentView}
      setCurrentView={props.setCurrentView}
    />
  );

  return (
    <TopicPageLayout
      pageTitle="Messaging Queues"
      SidebarComponent={SidebarComponentWithProps} // Correctly pass TopicSidebar with props
      renderViewFunction={renderMessagingQueuesView}
      initialView="intro"
      appData={messagingQueuesAppData}
      topicId="messaging-queues"
    />
  );
}

export default MessagingQueuesPage;
