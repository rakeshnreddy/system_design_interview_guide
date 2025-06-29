import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function FundamentalsView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading data...</Typography>;
  }

  const overviewText = appData.overview || "Load balancing distributes traffic across servers to improve {{Availability}} and {{Scalability}}. It uses algorithms like {{Round Robin}} or {{Least Connections}} and operates at {{Layer 4 (L4) Load Balancing}} or {{Layer 7 (L7) Load Balancing}}.";
  const footerText = "More content related to load balancing fundamentals, including {{Health Checks}} and {{Sticky Sessions (Session Affinity)}}, will be displayed here.";


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Load Balancing Fundamentals
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          <RenderTextWithLinks text={overviewText} glossaryData={glossaryData} />
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Metrics
        </Typography>
        <List>
          {!appData.metrics || appData.metrics.length === 0 ? (
            <ListItem><ListItemText primary="No metrics data available." /></ListItem>
          ) : (
            appData.metrics.map((metric) => (
                <React.Fragment key={metric.id}>
                  <ListItem>
                  <ListItemText
                    primary={<RenderTextWithLinks text={metric.name} glossaryData={glossaryData} />}
                    secondary={<RenderTextWithLinks text={metric.description} glossaryData={glossaryData} />}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Core Terminology
        </Typography>
        <List>
          {!appData.terminology || appData.terminology.length === 0 ? (
            <ListItem><ListItemText primary="No terminology data available." /></ListItem>
          ) : (
            appData.terminology.map((term) => (
                <React.Fragment key={term.id || term.term }>
                  <ListItem>
                  <ListItemText
                    primary={<RenderTextWithLinks text={term.term} glossaryData={glossaryData} />}
                    secondary={<RenderTextWithLinks text={term.definition} glossaryData={glossaryData} />}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
       <Typography sx={{mt: 2}} variant="body1">
        <RenderTextWithLinks text={footerText} glossaryData={glossaryData} />
      </Typography>
    </Box>
  );
}

export default FundamentalsView;
