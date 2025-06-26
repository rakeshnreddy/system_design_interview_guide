// src/pages/DatabasesPage.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar'; // Import the new TopicSidebar
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';
import { databasesAppData } from '../data/databasesAppData';

const SectionIntroDB = lazy(() => import('../components/databases/SectionIntroDB'));
const SectionSqlDB = lazy(() => import('../components/databases/SectionSqlDB'));
const SectionKeyValueDB = lazy(() => import('../components/databases/SectionKeyValueDB'));
const SectionWideColumnDB = lazy(() => import('../components/databases/SectionWideColumnDB'));
const SectionDocumentDB = lazy(() => import('../components/databases/SectionDocumentDB'));
const SectionSearchDB = lazy(() => import('../components/databases/SectionSearchDB'));
const SectionGraphDB = lazy(() => import('../components/databases/SectionGraphDB'));
const SectionPolyglotDB = lazy(() => import('../components/databases/SectionPolyglotDB'));
const SectionReplicationDB = lazy(() => import('../components/databases/SectionReplicationDB'));
const SectionSummaryDB = lazy(() => import('../components/databases/SectionSummaryDB'));

const viewComponentsMap = {
  'intro': SectionIntroDB,
  'sql': SectionSqlDB,
  'key-value': SectionKeyValueDB,
  'wide-column': SectionWideColumnDB,
  'document': SectionDocumentDB,
  'search': SectionSearchDB,
  'graph': SectionGraphDB,
  'polyglot': SectionPolyglotDB,
  'replication': SectionReplicationDB,
  'summary': SectionSummaryDB,
};

const renderDatabasesView = (currentView, data) => {
  const ViewComponent = viewComponentsMap[currentView] || viewComponentsMap['intro'];
  return <ViewComponent appData={data} />;
};

// Define the sections for the sidebar
const databaseSidebarSections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'sql', title: 'Relational (SQL)' },
    { id: 'key-value', title: 'Key-Value Stores' },
    { id: 'wide-column', title: 'Wide-Column Stores' },
    { id: 'document', title: 'Document Databases' },
    { id: 'search', title: 'Search Indexes' },
    { id: 'graph', title: 'Graph Databases' },
    { id: 'polyglot', title: 'Polyglot Persistence' },
    { id: 'replication', title: 'Data Replication' },
    { id: 'summary', title: 'DB Comparison Summary' },
];

// Moved SidebarComponentWithProps outside the DatabasesPage component
const SidebarComponentWithProps = (props) => (
  <TopicSidebar
    topicTitle="Database Topics" // Pass the topic title
    sections={databaseSidebarSections} // Pass the sections data
    currentView={props.currentView}
    setCurrentView={props.setCurrentView}
  />
);

function DatabasesPage() {
  const pageTitle = "Database Selection | System Design Interview Prep";
  const pageDescription = "Learn to choose the right database (SQL vs. NoSQL), understand the CAP theorem, and explore various data models for system design interviews.";

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
        pageTitle="Databases Deep Dive"
        SidebarComponent={SidebarComponentWithProps}
        renderViewFunction={renderDatabasesView}
        initialView="intro"
        appData={databasesAppData}
        topicId="databases"
      />
    </>
  );
}

export default DatabasesPage;
