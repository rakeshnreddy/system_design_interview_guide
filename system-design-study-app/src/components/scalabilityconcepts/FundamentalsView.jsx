import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function FundamentalsView({ appData }) {
  if (!appData || !appData.metrics || !appData.terminology) {
    return <Typography>Loading fundamental scalability data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Scalability Fundamentals
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Metrics
        </Typography>
        <List>
          {appData.metrics.map((metric) => (
            <React.Fragment key={metric.id}>
              <ListItem>
                <ListItemText
                  primary={metric.name}
                  secondary={metric.description}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Core Terminology
        </Typography>
        <List>
          {appData.terminology.map((term, index) => ( // Added index for key as term.term might not be unique
            <React.Fragment key={`${term.term}-${index}`}>
              <ListItem>
                <ListItemText
                  primary={term.term}
                  secondary={term.definition}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
       <Typography sx={{mt: 2}} variant="body1">
        More content related to scalability fundamentals will be displayed here, using data from <code>scalabilityConceptsAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default FundamentalsView;
