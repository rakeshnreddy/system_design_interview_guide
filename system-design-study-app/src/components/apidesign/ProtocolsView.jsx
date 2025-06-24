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

                <Typography component="div" sx={{ mb: 0.5, mt: 1 }} ><strong>Pros:</strong></Typography>
                <List dense disablePadding sx={{ pl: 2 }}>
                  {protocol.pros.map((pro, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                      <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={pro} />
                    </ListItem>
                  ))}
                </List>

                <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Cons:</strong></Typography>
                <List dense disablePadding sx={{ pl: 2 }}>
                  {protocol.cons.map((con, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                      <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={con} />
                    </ListItem>
                  ))}
                </List>

                <ListItemText
                  primary={<strong>Common Use Cases:</strong>}
                  secondary={protocol.useCases}
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
        Detailed information about API protocols like REST, GraphQL, gRPC, and WebSockets will be displayed here, using data from <code>apiDesignAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default ProtocolsView;
