// This file already has useEffect, setMetaTag, removeMetaTag imports and usage.
// The existing useEffect hook correctly sets the meta tags.
// No change needed here for meta tags, it was already implemented correctly.
// I will just re-verify its content.

// useEffect(() => {
// const originalTitle = document.title;
// document.title = pageTitle; // pageTitle is "Messaging Queues | System Design Interview Prep"

// const metaTags = [
//      { name: 'description', content: pageDescription }, // pageDescription is "Explore message brokers..."
//      { name: 'og:title', content: pageTitle, isProperty: true },
// ...
// ];
// metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));
// return () => { ... };
// }, [pageTitle, pageDescription]);

// The existing implementation is fine.
import React, { Suspense, lazy, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar'; // Corrected import
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';
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

// Moved SidebarComponentWithProps outside the MessagingQueuesPage component
const SidebarComponentWithProps = (props) => (
  <TopicSidebar
    topicTitle="Messaging Queues"
    sections={mqSidebarSections}
    currentView={props.currentView}
    setCurrentView={props.setCurrentView}
  />
);

function MessagingQueuesPage() {
  const pageTitle = "Messaging Queues | System Design Interview Prep";
  const pageDescription = "Explore message brokers, delivery semantics, and patterns for resilient and scalable distributed systems. Learn about Kafka, RabbitMQ, and more.";

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
        pageTitle="Messaging Queues"
        SidebarComponent={SidebarComponentWithProps} // Correctly pass TopicSidebar with props
        renderViewFunction={renderMessagingQueuesView}
        initialView="intro"
        appData={messagingQueuesAppData}
        topicId="messaging-queues"
      />
    </>
  );
}

export default MessagingQueuesPage;
