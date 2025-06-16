// src/pages/DatabasesPage.jsx
import React, { Suspense, lazy } from 'react'; // Removed useState, useEffect, useRef
import { Typography, CircularProgress } from '@mui/material'; // For fallback
import TopicPageLayout from '../components/common/TopicPageLayout';
import StickySidebarDB from '../components/databases/StickySidebarDB'; // Will be passed to layout
import { databasesAppData } from '../data/databasesAppData'; // Assuming this will be the source of truth

// Import section components - these will become "views"
// For a true view-switching model, each should be prepared to be the main content of the page.
// The current structure of DatabasesPage renders all sections linearly and uses scroll-spy.
// This will change to rendering ONE section component at a time based on currentView.

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
// SectionAiSimulatorDB is removed as AI modal is part of TopicPageLayout now.
// If specific AI interactions are needed per section, that's a different pattern.

// Mapping IDs to components for the render function
// This is a conceptual shift from the original scroll-spy page.
// Each 'section' is now a distinct 'view'.
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
  // 'ai-simulator' view is removed
};

// This function will be passed to TopicPageLayout
const renderDatabasesView = (currentView, data) => {
  // data prop is available if needed for any view, but views here import their own specifics or use appData
  const ViewComponent = viewComponentsMap[currentView] || viewComponentsMap['intro']; // Fallback to intro

  // The individual section components (SectionIntroDB etc.) are expected to use databasesAppData directly
  // or be refactored to accept parts of it if this page were to manage all data loading.
  // For now, assuming they access databasesAppData or are self-contained.
  // We pass appData down in case any view is refactored to use it.
  return <ViewComponent appData={data} />;
};

// Sidebar sections for StickySidebarDB. It now needs to map to view IDs.
const sidebarSections = [
    { id: 'intro', title: 'Introduction' }, // Adjusted title for consistency if needed
    { id: 'sql', title: 'Relational (SQL)' },
    { id: 'key-value', title: 'Key-Value Stores' },
    { id: 'wide-column', title: 'Wide-Column Stores' },
    { id: 'document', title: 'Document Databases' },
    { id: 'search', title: 'Search Indexes' },
    { id: 'graph', title: 'Graph Databases' },
    { id: 'polyglot', title: 'Polyglot Persistence' }, // Adjusted title
    { id: 'replication', title: 'Data Replication' },
    { id: 'summary', title: 'DB Comparison Summary' },
    // No 'ai-simulator' in sidebar as it's a global FAB now
];


function DatabasesPage() {
  // The old scroll-spy logic and AI modal state/handlers are removed.
  // TopicPageLayout handles view switching and the AI modal.

  // The SidebarComponent prop expects a component type.
  // We need to pass the sections data to StickySidebarDB.
  // TopicPageLayout's SidebarComponent prop will receive currentView and setCurrentView.
  // StickySidebarDB needs to be adapted to use these.
  const SidebarComponentWithProps = (props) => (
    <StickySidebarDB
      sections={sidebarSections}
      currentView={props.currentView} // currentView from TopicPageLayout
      setCurrentView={props.setCurrentView} // setCurrentView from TopicPageLayout
    />
  );

  return (
    <TopicPageLayout
      pageTitle="Databases Deep Dive" // Updated title
      SidebarComponent={SidebarComponentWithProps}
      renderViewFunction={renderDatabasesView}
      initialView="intro" // Default view for Databases
      appData={databasesAppData} // Pass the specific appData
      topicId="databases"
    />
  );
}

export default DatabasesPage;
