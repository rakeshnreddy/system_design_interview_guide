import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


function SecurityView({ appData }) {
  if (!appData || !appData.security) {
    return <Typography className="p-4">Loading API security data...</Typography>;
  }
  const securityItems = appData.security || [];
  const footerText = "Key API security topics like {{Authentication (AuthN)}} ({{OAuth 2.0|OAuth}}, {{JSON Web Tokens (JWT)|JWT}}), {{Authorization (AuthZ)}}, {{Input Validation}}, {{TLS/SSL (HTTPS)}}, and {{OWASP API Security Top 10|OWASP Top 10}} will be discussed here, using data from apiDesignAppData.js.";


  return (
    <Box id="api-security" sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom>
        API Security Considerations
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {securityItems.map((secItem) => (
            <React.Fragment key={secItem.id}>
              <ListItem sx={{ display: 'block', mb: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    <RenderTextWithLinks text={secItem.name} glossaryData={glossaryData} />
                </Typography>

                <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Description:</Typography>
                <Typography variant="body2" component="div" paragraph>
                    <RenderTextWithLinks text={secItem.description} glossaryData={glossaryData} />
                </Typography>

                <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Importance / Key Takeaway:</Typography>
                 <Typography variant="body2" component="div" paragraph>
                    <RenderTextWithLinks text={secItem.importance} glossaryData={glossaryData} />
                </Typography>
              </ListItem>
              <Divider component="li" sx={{ mb: 3 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
       <RenderTextWithLinks text={footerText} glossaryData={glossaryData} />
      </Typography>
    </Box>
  );
}

export default SecurityView;
