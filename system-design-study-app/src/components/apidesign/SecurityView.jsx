import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

function SecurityView({ appData }) {
  if (!appData || !appData.security) {
    return <Typography>Loading API security data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Security Considerations
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {appData.security.map((secItem) => (
            <React.Fragment key={secItem.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{secItem.name}</Typography>
                <ListItemText
                  primary={<strong>Description:</strong>}
                  secondary={secItem.description}
                  sx={{ mb: 1 }}
                />
                <ListItemText
                  primary={<strong>Importance / Key Takeaway:</strong>}
                  secondary={secItem.importance}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
        Key API security topics like Authentication (OAuth 2.0, JWT), Authorization, Input Validation, TLS/SSL, and OWASP Top 10 will be discussed here, using data from <code>apiDesignAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default SecurityView;
