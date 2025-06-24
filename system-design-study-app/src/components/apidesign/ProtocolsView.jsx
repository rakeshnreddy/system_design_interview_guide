import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function ProtocolsView({ appData }) {
  if (!appData || !appData.protocols) {
    return <Typography>Loading API protocol data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Protocols & Styles
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.protocols.map((protocol) => (
            <React.Fragment key={protocol.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{protocol.name}</Typography>
                <ListItemText
                  primary={<strong>Structure / Key Characteristics:</strong>}
                  secondary={protocol.structure}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <ListItemText
                  primary={<strong>Pros:</strong>}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {protocol.pros.map((pro, index) => (
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
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <List dense disablePadding>
                      {protocol.cons.map((con, index) => (
                        <ListItem key={index} sx={{ pl: 2, py: 0.2, display: 'list-item', listStyleType: 'disc' }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={con} />
                        </ListItem>
                      ))}
                    </List>
                  }
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Common Use Cases:</strong>}
                  secondary={protocol.useCases}
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Detailed information about API protocols like REST, GraphQL, gRPC, and WebSockets will be displayed here, using data from <code>apiDesignAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default ProtocolsView;
