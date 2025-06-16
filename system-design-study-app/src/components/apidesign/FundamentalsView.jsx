import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function FundamentalsView({ appData }) {
  if (!appData || !appData.metrics || !appData.terminology) {
    return <Typography>Loading fundamental API design data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Design Fundamentals
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
          {appData.terminology.map((term) => (
            <React.Fragment key={term.term}> {/* Assuming term.term is unique for now */}
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
        More content related to API design fundamentals will be displayed here, using data from <code>apiDesignAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default FundamentalsView;
