import React from 'react';
import { Box, Typography } from '@mui/material';

// Ultra-Minimal Stub for TopicPageLayout
function TopicPageLayout({ pageTitle, topicId, initialView, appData, SidebarComponent, renderViewFunction }) {
  // Log all props to see what CachesPage is trying to pass
  console.log('MINIMAL STUB TopicPageLayout - Props Received:', { pageTitle, topicId, initialView, appData: !!appData, SidebarComponent: !!SidebarComponent, renderViewFunction: !!renderViewFunction });

  return (
    <Box
      sx={{
        width: 'calc(100% - 40px)', // To ensure it's not full bleed and noticeable
        minHeight: '400px',
        border: '10px solid limegreen',
        p: 3,
        m: '20px', // Margin to pull it away from edges
        mt: '84px', // Margin top to clear main AppBar (64px) + some extra
        bgcolor: 'lightyellow'
      }}
      data-testid="topic-page-layout-stub"
    >
      <Typography variant="h2" sx={{ color: 'green', fontWeight: 'bold' }}>
        LIME GREEN BOX - TOPIC PAGE LAYOUT STUB
      </Typography>
      <Typography variant="h4" sx={{ color: 'darkgreen', mt: 2 }}>
        Page Title Prop Received: {pageTitle}
      </Typography>
      <Typography sx={{ color: 'darkgreen', mt: 1 }}>
        If you see this, CachesPage is rendering this TopicPageLayout stub.
      </Typography>
      <Typography sx={{ color: 'blue', mt: 1 }}>
        (Original Sidebar and Content would be here - currentView logic removed for this stub)
      </Typography>
      <Typography sx={{ color: 'blue', mt: 1 }}>
        (Actual appData is {appData ? 'present' : 'NOT present'})
      </Typography>
    </Box>
  );
}

export default TopicPageLayout;
