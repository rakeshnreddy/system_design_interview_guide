import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function AlgorithmsView({ appData }) {
  if (!appData) {
    return <Typography>Loading algorithm data...</Typography>;
  }

  if (!appData.algorithms || appData.algorithms.length === 0) {
    return <Typography className="p-4">No load balancing algorithm data available.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Load Balancing Algorithms
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.algorithms.map((algo) => {
            // Construct the id by replacing underscores with hyphens, e.g., "round_robin" -> "round-robin"
            // This is to match the fragment we'll generate from topicsData's "lb-round-robin"
            const elementId = algo.id.replace(/_/g, '-');

            // Special handling for "lb-round-robin" to ensure it gets the specific ID from topicsData
            // if other algorithms also produce "round-robin".
            // However, the current structure of topicsData only has "lb-round-robin".
            // If algo.id from appData is "round_robin", elementId will be "round-robin".
            // The link from Layout.jsx for "lb-round-robin" should point to "#round-robin".

            return (
              <React.Fragment key={algo.id}>
                <ListItem id={elementId} sx={{ display: 'block', mb: 2 }}> {/* Use block display for better layout of multi-line content */}
                  <Typography variant="h6">{algo.name}</Typography>
                  <ListItemText
                    primary={<strong>How it works:</strong>}
                  secondary={algo.howItWorks}
                  sx={{mb: 1}}
                />
                <ListItemText
                  primary={<strong>Pros:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {algo.pros.map((pro, index) => (
                        <ListItem key={index} sx={{pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2'}} primary={pro} />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{mb: 1}}
                />
                <ListItemText
                  primary={<strong>Cons:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {algo.cons.map((con, index) => (
                        <ListItem key={index} sx={{pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2'}} primary={con} />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{mb: 1}}
                />
                <ListItemText
                  primary={<strong>Use Cases:</strong>}
                  secondary={algo.useCases}
                />
              </ListItem>
              <Divider component="li" sx={{mb:2}}/>
            </React.Fragment>
            );
          })}
        </List>
      </Paper>
      <Typography sx={{mt: 2}} variant="body1">
        Detailed explanations of various load balancing algorithms will be displayed here, using data from <code>loadBalancingAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default AlgorithmsView;
