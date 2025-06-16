import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function TypesView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading load balancer types data...</Typography>;
  }

  if (!appData.lbTypes || appData.lbTypes.length === 0) {
    return <Typography className="p-4">No load balancer type data available.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Types of Load Balancers
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.lbTypes.map((lbType) => (
            <React.Fragment key={lbType.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{lbType.name}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={lbType.description}
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Pros:</strong>}
                  secondary={
                    <List dense disablePadding>
                      {lbType.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={pro} />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Cons:</strong>}
                  secondary={
                    <List dense disablePadding>
                      {lbType.cons.map((con, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={con} />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Use Cases:</strong>}
                  secondary={lbType.useCases}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Information about different types of load balancers (Hardware, Software, Cloud) will be displayed here, using data from <code>loadBalancingAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default TypesView;
