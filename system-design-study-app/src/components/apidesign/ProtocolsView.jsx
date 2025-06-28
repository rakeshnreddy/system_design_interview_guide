import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import MermaidDiagram from '../common/MermaidDiagram'; // Import MermaidDiagram
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing';
import { glossaryData } from '../../../data/glossaryData';

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

function ProtocolsView({ appData }) {
  if (!appData || !appData.protocols) {
    return <Typography>Loading API protocol data...</Typography>;
  }
  const { mermaidDiagrams } = appData;
  const footerText = `Detailed information about API protocols like {{REST}}, {{GraphQL}}, {{gRPC}}, and {{WebSocket}} will be displayed here, using data from apiDesignAppData.js. Understanding these is key for {{API Design}}.`;


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        API Protocols & Styles
      </Typography>

      {mermaidDiagrams && mermaidDiagrams.restFlow && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" gutterBottom>REST API Call Flow</Typography>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <MermaidDiagram chart={mermaidDiagrams.restFlow} />
          </Paper>
        </Box>
      )}

      {mermaidDiagrams && mermaidDiagrams.graphQLFlow && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" gutterBottom>GraphQL Query Flow</Typography>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <MermaidDiagram chart={mermaidDiagrams.graphQLFlow} />
          </Paper>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <List>
          {appData.protocols.map((protocol) => (
            <React.Fragment key={protocol.id}>
              <ListItem sx={{ display: 'block', mb: 2 }}>
                <Typography variant="h6">{protocol.name}</Typography>
                <ListItemText
                  primary={<strong>Structure / Key Characteristics:</strong>}
                  secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(protocol.structure, glossaryData)} />}
                  sx={{ mb: 1 }}
                  secondaryTypographyProps={{ component: 'div' }}
                />

                <Typography component="div" sx={{ mb: 0.5, mt: 1 }} ><strong>Pros:</strong></Typography>
                <List dense disablePadding sx={{ pl: 2 }}>
                  {protocol.pros.map((pro, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                      <ListItemText
                        primaryTypographyProps={{ variant: 'body2' }}
                        primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(pro, glossaryData)} />}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Cons:</strong></Typography>
                <List dense disablePadding sx={{ pl: 2 }}>
                  {protocol.cons.map((con, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                      <ListItemText
                        primaryTypographyProps={{ variant: 'body2' }}
                        primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(con, glossaryData)} />}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Assuming protocol.useCases is an array of strings for this example */}
                {protocol.useCases && Array.isArray(protocol.useCases) && protocol.useCases.length > 0 && (
                  <>
                    <Typography component="div" sx={{ mb: 0.5, mt: 1 }}><strong>Common Use Cases:</strong></Typography>
                    <List dense disablePadding sx={{ pl: 2 }}>
                      {protocol.useCases.map((useCase, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={<RenderProcessedText textParts={parseTextForGlossaryLinks(useCase, glossaryData)} />}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {/* Fallback for if protocol.useCases is a single string */}
                {protocol.useCases && typeof protocol.useCases === 'string' && (
                   <ListItemText
                    primary={<strong>Common Use Cases:</strong>}
                    secondary={<RenderProcessedText textParts={parseTextForGlossaryLinks(protocol.useCases, glossaryData)} />}
                    secondaryTypographyProps={{ component: 'div' }}
                    sx={{ mt: 1 }}
                  />
                )}

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

export default ProtocolsView;
