import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import MermaidDiagram from '../common/MermaidDiagram.jsx';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


function ProtocolsView({ appData }) {
  if (!appData || !appData.protocols) {
    return <Typography className="p-4">Loading API protocol data...</Typography>;
  }
  const { mermaidDiagrams, protocols } = appData;
  const footerText = `Detailed information about API protocols like {{REST}}, {{GraphQL}}, {{gRPC}}, and {{WebSocket}} will be displayed here, using data from apiDesignAppData.js. Understanding these is key for {{API Design}}.`;

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' }  }}>
      <Typography variant="h4" gutterBottom>
        API Protocols & Styles
      </Typography>

      {mermaidDiagrams && mermaidDiagrams.restFlow && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" gutterBottom>REST API Call Flow</Typography>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <MermaidDiagram diagramDefinition={mermaidDiagrams.restFlow} diagramId="rest-flow-diagram" />
          </Paper>
        </Box>
      )}

      {mermaidDiagrams && mermaidDiagrams.graphQLFlow && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" gutterBottom>GraphQL Query Flow</Typography>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <MermaidDiagram diagramDefinition={mermaidDiagrams.graphQLFlow} diagramId="graphql-flow-diagram" />
          </Paper>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <List>
          {protocols.map((protocol) => (
            <React.Fragment key={protocol.id}>
              <ListItem sx={{ display: 'block', mb: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  <RenderTextWithLinks text={protocol.name} glossaryData={glossaryData} />
                </Typography>

                <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Structure / Key Characteristics:</Typography>
                <Typography variant="body2" component="div" paragraph>
                    <RenderTextWithLinks text={protocol.structure} glossaryData={glossaryData} />
                </Typography>

                {protocol.realWorldExample && (
                  <Box sx={{my: 1.5, p:1.5, backgroundColor: 'info.lightest', border: '1px dashed', borderColor: 'info.main', borderRadius: 1}}>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>Real-World Example:</Typography>
                    <Typography variant="body2" component="div">
                      <RenderTextWithLinks text={protocol.realWorldExample} glossaryData={glossaryData} />
                    </Typography>
                  </Box>
                )}

                {protocol.pros && protocol.pros.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Pros:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {protocol.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={pro} glossaryData={glossaryData} />
                           </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {protocol.cons && protocol.cons.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Cons:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {protocol.cons.map((con, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={con} glossaryData={glossaryData} />
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {protocol.whenToUse && protocol.whenToUse.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>When to Use:</Typography>
                     <List dense disablePadding sx={{pl:2}}>
                      {protocol.whenToUse.map((item, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={item} glossaryData={glossaryData} />
                           </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                 {protocol.interviewTalkingPoints && protocol.interviewTalkingPoints.length > 0 && (
                    <Box sx={{mt: 1.5, p:1, backgroundColor: 'action.hover', borderRadius: 1}}>
                        <Typography variant="caption" component="div" sx={{fontWeight: 'bold'}}>Interview Talking Points:</Typography>
                        <List dense disablePadding sx={{pl:1.5}}>
                        {protocol.interviewTalkingPoints.map((point, index) => (
                            <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'bullet', py: 0.1, pl:0, fontSize: '0.8rem' }}>
                                <ListItemText primaryTypographyProps={{ variant: 'caption' }}>
                                    <RenderTextWithLinks text={point} glossaryData={glossaryData} />
                                </ListItemText>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                )}

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

export default ProtocolsView;
