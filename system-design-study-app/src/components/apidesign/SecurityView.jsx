import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../utils/textProcessing.js';
import { glossaryData } from '../../data/glossaryData.js';

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts }) => {
  if (typeof textParts === 'string') {
    return <>{textParts}</>;
  }
  if (!Array.isArray(textParts)) {
    return null;
  }
  return (
    <>
      {textParts.map((part, index) => {
        if (part.type === 'link') {
          return (
            <RouterLink
              key={`${part.displayText}-${index}`}
              to={`/glossary?search=${encodeURIComponent(part.term.term)}`}
              className="glossary-link text-blue-600 hover:text-blue-800 hover:underline"
              title={getDefinitionSnippet(part.term.definition)}
            >
              {part.displayText}
            </RouterLink>
          );
        }
        return <React.Fragment key={`text-${index}`}>{part.content}</React.Fragment>;
      })}
    </>
  );
};

function SecurityView({ appData }) {
  if (!appData || !appData.security) {
    return <Typography>Loading API security data...</Typography>;
  }
  const footerText = "Key API security topics like {{Authentication (AuthN)}} ({{OAuth}}, {{JWT}}), {{Authorization (AuthZ)}}, Input Validation, {{TLS/SSL (HTTPS)}}, and OWASP Top 10 will be discussed here, using data from apiDesignAppData.js.";


  return (
    <Box id="api-security" sx={{ p: 2 }}>
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
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(secItem.description, glossaryData)} />}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <ListItemText
                  primary={<strong>Importance / Key Takeaway:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(secItem.importance, glossaryData)} />}
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Typography sx={{ mt: 2 }} variant="body1">
       <RenderProcessedText textParts={parseTextForGlossaryLinks(footerText, glossaryData)} />
      </Typography>
    </Box>
  );
}

export default SecurityView;
