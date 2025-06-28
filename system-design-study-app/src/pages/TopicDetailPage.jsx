import React, { useState, useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { topicsData } from '../data/topicsData';
import { cachesAppData } from '../data/cachesAppData';
import { databasesAppData } from '../data/databasesAppData';
import { messagingQueuesAppData } from '../data/messagingQueuesAppData';
import { loadBalancingAppData } from '../data/loadBalancingAppData';
import { apiDesignAppData } from '../data/apiDesignAppData';
import { scalabilityConceptsAppData } from '../data/scalabilityConceptsAppData';
import { interviewApproachAppData } from '../data/interviewApproachAppData';
import TopicPageLayout from '../components/common/TopicPageLayout';
import TopicSidebar from '../components/common/TopicSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Typography } from '@mui/material';

const dataMap = {
  caching: cachesAppData,
  databases: databasesAppData,
  'messaging-queues': messagingQueuesAppData,
  'load-balancing': loadBalancingAppData,
  'api-design': apiDesignAppData,
  'scalability-concepts': scalabilityConceptsAppData,
  'interview-approach': interviewApproachAppData,
};

const viewMap = {
  caching: lazy(() => import('../components/caches/FundamentalsView')),
  databases: lazy(() => import('../components/databases/FundamentalsView')),
  // Add other topic views here
};

const renderView = (currentView, appData) => {
  const ViewComponent = viewMap[appData.id];
  return ViewComponent ? <ViewComponent appData={appData} /> : null;
};

const TopicDetailPage = () => {
  const { topicId } = useParams();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentTopic = topicsData.find((t) => t.id === topicId);
    if (currentTopic) {
      const appData = dataMap[topicId];
      if (appData) {
        setTopicData({ ...currentTopic, ...appData });
      } else {
        setTopicData(currentTopic);
      }
    }
    setLoading(false);
  }, [topicId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!topicData) {
    return (
      <div className="text-center py-12">
        <Typography variant="h4" color="error">
          404 - Topic Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          The topic you are looking for does not exist.
        </Typography>
      </div>
    );
  }

  const sidebarSections = [
    { id: 'fundamentals', title: 'Fundamentals' },
    { id: 'scenarios', title: 'Scenarios' },
  ];

  const SidebarComponentWithProps = (props) => (
    <TopicSidebar
      topicTitle={topicData.title}
      sections={sidebarSections}
      currentView={props.currentView}
      setCurrentView={props.setCurrentView}
    />
  );

  return (
    <TopicPageLayout
      pageTitle={topicData.title}
      SidebarComponent={SidebarComponentWithProps}
      renderViewFunction={renderView}
      initialView="fundamentals"
      appData={topicData}
      topicId={topicId}
    />
  );
};

export default TopicDetailPage;
