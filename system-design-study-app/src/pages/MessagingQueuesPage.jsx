import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import SidebarMQ from '../components/messaging_queues/SidebarMQ';
import { messagingQueuesAppData } from '../data/messagingQueuesAppData'; // Assuming this file exists

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
  // Pass user and auth-related functions if necessary, or manage them within TopicPageLayout/context
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
      return <ScenariosModuleMQ {...commonProps} />; // Consider how user prop is handled
    case 'cheatsheet':
      return <CheatSheetModuleMQ {...commonProps} />;
    case 'practice':
      return <PracticeModuleMQ {...commonProps} />; // Consider how user prop is handled
    default:
      return (
        <Suspense fallback={<CircularProgress />}>
          <IntroModuleMQ {...commonProps} />
        </Suspense>
      );
  }
};

function MessagingQueuesPage() {
  // Auth state (user, login/logout) might need to be lifted to a context or handled by TopicPageLayout
  // For now, focusing on layout structure
  return (
    <TopicPageLayout
      pageTitle="Messaging Queues"
      SidebarComponent={SidebarMQ} // Pass the SidebarMQ component
      renderViewFunction={renderMessagingQueuesView}
      initialView="intro" // Default view for Messaging Queues
      appData={messagingQueuesAppData}
      topicId="messaging-queues" // Unique ID for this topic
    />
  );
}

export default MessagingQueuesPage;
