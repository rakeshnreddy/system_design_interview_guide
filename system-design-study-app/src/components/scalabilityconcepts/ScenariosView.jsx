import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function ScenariosView({ appData }) {
  if (!appData || !appData.scenarios) {
    return <Typography>Loading scalability scenario data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Scalability Scenarios
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
                {/* Moved Key Considerations out of ListItemText secondary */}
                <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                  <strong>Key Considerations / Strategies:</strong>
                </Typography>
                <List dense disablePadding sx={{ pl: 2 }}>
                  {scenario.considerations.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                      <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={item} />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Real-world scalability scenarios and example solutions/considerations will be presented here, using data from <code>scalabilityConceptsAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default ScenariosView;
