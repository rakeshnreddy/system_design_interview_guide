// src/pages/DatabasesPage.jsx
import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { CircularProgress } from '@mui/material';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar'; // Import the new TopicSidebar
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

function DatabasesPage() {
  const pageTitle = "Database Selection | System Design Interview Prep";
  const pageDescription = "Learn to choose the right database (SQL vs. NoSQL), understand the CAP theorem, and explore various data models for system design interviews.";

  const SidebarComponentWithProps = (props) => (
    <TopicSidebar
      topicTitle="Database Topics" // Pass the topic title
      sections={databaseSidebarSections} // Pass the sections data
      currentView={props.currentView}
      setCurrentView={props.setCurrentView}
    />
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
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
