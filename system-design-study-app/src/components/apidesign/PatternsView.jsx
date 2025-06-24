import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function PatternsView({ appData }) {
  if (!appData || !appData.patterns) {
    return <Typography>Loading API design pattern data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Common API Design Patterns
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.patterns.map((pattern) => (
            <React.Fragment key={pattern.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{pattern.name}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={pattern.description}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                {pattern.pros && pattern.pros.length > 0 && (
                  <>
                    <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Pros:</strong></Typography>
                    <List dense disablePadding sx={{ pl: 2 }}>
                      {pattern.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl: 0 }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={pro} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {pattern.cons && pattern.cons.length > 0 && (
                  <>
                    <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Cons:</strong></Typography>
                    <List dense disablePadding sx={{ pl: 2 }}>
                      {pattern.cons.map((con, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl: 0 }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={con} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                <ListItemText
                  primary={<strong>Common Use Cases:</strong>}
                  secondary={pattern.useCases}
                  secondaryTypographyProps={{ component: 'div' }}
                  sx={{ mt: 1 }}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Information about common API design patterns such as Pagination, Rate Limiting, Versioning, etc., will be displayed here using data from <code>apiDesignAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default PatternsView;
