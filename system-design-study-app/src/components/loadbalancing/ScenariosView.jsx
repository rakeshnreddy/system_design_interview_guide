import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function ScenariosView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading scenario data...</Typography>;
  }

  if (!appData.scenarios || appData.scenarios.length === 0) {
    return <Typography className="p-4">No load balancing scenario data available.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Load Balancing Scenarios
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.scenarios.map((scenario) => (
            <React.Fragment key={scenario.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{scenario.title}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={scenario.description}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <ListItemText
                  primary={<strong>Solution / Strategy:</strong>}
                  secondary={scenario.solution.strategy}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                 <ListItemText
                  primary={<strong>Key Components:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {scenario.solution.components.map((component, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2'}} primary={component} />
                        </ListItem>
                      ))}
                    </List>
                  }
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Real-world load balancing scenarios and their solutions will be presented here, using data from <code>loadBalancingAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default ScenariosView;
