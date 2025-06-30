import React, { Suspense, lazy, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar';
import { networkingCDNAppData } from '../data/networkingCDNAppData'; // Data for this page
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';

// Lazy load view components for each section
const OverviewView = lazy(() => import('../components/networkingcdn/OverviewView'));
const CDNConceptsView = lazy(() => import('../components/networkingcdn/CDNConceptsView'));
const NetworkingBasicsView = lazy(() => import('../components/networkingcdn/NetworkingBasicsView'));
const DesignPatternsView = lazy(() => import('../components/networkingcdn/DesignPatternsView'));
const UseCasesView = lazy(() => import('../components/networkingcdn/UseCasesView'));
const KeyTakeawaysView = lazy(() => import('../components/networkingcdn/KeyTakeawaysView'));
// Add more lazy loaded views here if new sections are created (e.g., for metrics, terminology if they get their own views)
// For now, some of these might be integrated into OverviewView or other broader views.

const viewComponentsMap = {
  'overview': OverviewView,
  'cdnconcepts': CDNConceptsView,
  'networkingbasics': NetworkingBasicsView,
  'designpatterns': DesignPatternsView,
  'usecases': UseCasesView,
  'keytakeaways': KeyTakeawaysView,
  // 'metrics': MetricsView, // Example if metrics had its own view
  // 'terminology': TerminologyView, // Example if terminology had its own view
};

const renderNetworkingCDNView = (currentView, data) => {
  const ViewComponent = viewComponentsMap[currentView] || viewComponentsMap['overview']; // Default to Overview
  return <ViewComponent appData={data} />;
};

// Define the sections for the sidebar
const networkingCDNSidebarSections = [
  { id: 'overview', title: 'Overview & Core Concepts' },
  { id: 'cdnconcepts', title: 'CDN Deep Dive' },
  { id: 'networkingbasics', title: 'Networking Protocols' },
  { id: 'designpatterns', title: 'Design Patterns & Strategies' },
  { id: 'usecases', title: 'Use Cases & Trade-offs' },
  { id: 'keytakeaways', title: 'Key Takeaways' },
  // { id: 'metrics', title: 'Key Metrics' }, // Example
  // { id: 'terminology', title: 'Terminology' }, // Example
];

const SidebarComponentWithProps = (props) => (
  <TopicSidebar
    topicTitle="Networking & CDN"
    sections={networkingCDNSidebarSections}
    currentView={props.currentView}
    setCurrentView={props.setCurrentView}
  />
);

function NetworkingCDNPage() {
  const pageData = networkingCDNAppData; // Use the imported data
  const pageTitle = `${pageData.title || 'Networking & CDN'} | System Design Interview Prep`;
  const pageDescription = pageData.overview
    ? pageData.overview.substring(0, 160).split('\n')[0] + '...' // First line of overview
    : "Learn networking fundamentals, TCP/UDP, HTTP, and how Content Delivery Networks (CDNs) improve performance and scalability.";

  useEffect(() => {
    const originalDocTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
      { name: 'og:type', content: 'website', isProperty: true },
      // Add other relevant meta tags if needed, e.g., og:image, og:url
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalDocTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

  return (
    <TopicPageLayout
      pageTitle={pageData.title || "Networking & CDN"}
      SidebarComponent={SidebarComponentWithProps}
      renderViewFunction={renderNetworkingCDNView}
      initialView="overview" // Default view to show
      appData={pageData}
      topicId="networking-cdn" // Used for potential internal linking or context
    />
  );
}

export default NetworkingCDNPage;
