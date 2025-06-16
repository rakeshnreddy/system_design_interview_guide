import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function ScenariosView({ appData }) {
  if (!appData || !appData.scenarios) {
    return <Typography>Loading API design scenario data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Design Scenarios
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
                />
                <ListItemText
                  primary={<strong>Key Considerations / Solution Sketch:</strong>}
                  secondary={
                    <List dense disablePadding>
                      {scenario.considerations.map((item, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={item} />
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
        Real-world API design scenarios and example solutions/considerations will be presented here, using data from <code>apiDesignAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default ScenariosView;
