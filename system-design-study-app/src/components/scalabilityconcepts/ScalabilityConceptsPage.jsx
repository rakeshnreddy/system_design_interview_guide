import React, { Suspense, lazy, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material'; // Keep necessary MUI imports
import TopicPageLayout from '../common/TopicPageLayout'; // Import the new layout
import SidebarScalabilityConcepts from './SidebarScalabilityConcepts';
import { scalabilityConceptsAppData } from '../../data/scalabilityConceptsAppData';
import { setMetaTag, removeMetaTag } from '../../utils/metaUtils';

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
  const pageTitle = `${scalabilityConceptsAppData.title || 'Scalability Concepts'} | System Design Interview Prep`;
  const pageDescription = scalabilityConceptsAppData.overview
    ? scalabilityConceptsAppData.overview.substring(0, 160) + (scalabilityConceptsAppData.overview.length > 160 ? '...' : '')
    : "Master core concepts for designing scalable systems, including horizontal vs. vertical scaling, CAP theorem, and various architectural patterns.";

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
      pageTitle={scalabilityConceptsAppData.title || "Scalability Concepts"}
      SidebarComponent={SidebarScalabilityConcepts}
      renderViewFunction={renderScalabilityConceptsView}
      initialView="fundamentals" // Default view for this page
      appData={scalabilityConceptsAppData}
      topicId="scalability-concepts" // Unique identifier for this topic page
    />
  );
}

export default ScalabilityConceptsPage;
