import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function DesignPatternsView({ appData }) {
  if (!appData || !appData.designPatterns) {
    return <Typography className="p-4">Loading design patterns data...</Typography>;
  }

  const { title, items } = appData.designPatterns;

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom component="h1">
        <RenderTextWithLinks text={title || "Networking & CDN Design Patterns"} glossaryData={glossaryData} />
      </Typography>

      {items && items.map((pattern, index) => (
        <Paper key={index} elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            <RenderTextWithLinks text={pattern.name} glossaryData={glossaryData} />
          </Typography>
          <Typography variant="body1" component="div" paragraph>
            <RenderTextWithLinks text={pattern.description} glossaryData={glossaryData} />
          </Typography>

          {/* Specific rendering for Strategic CDN Usage */}
          {pattern.whatToOffload && (
            <>
              <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', mt: 1.5 }}>What to Offload:</Typography>
              <List dense>
                {pattern.whatToOffload.map((item, i) => (
                  <ListItem key={i} sx={{ display: 'list-item', listStyleType: 'disc', pl: 2.5, py:0.5 }}>
                    <ListItemText primaryTypographyProps={{variant:'body2'}}>
                        <RenderTextWithLinks text={item} glossaryData={glossaryData} />
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {pattern.whatNotToOffloadTypically && (
            <>
              <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium', mt: 1 }}>What NOT to Offload (Typically):</Typography>
              <List dense>
                {pattern.whatNotToOffloadTypically.map((item, i) => (
                  <ListItem key={i} sx={{ display: 'list-item', listStyleType: 'disc', pl: 2.5, py:0.5 }}>
                     <ListItemText primaryTypographyProps={{variant:'body2'}}>
                        <RenderTextWithLinks text={item} glossaryData={glossaryData} />
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {pattern.importance && (
             <Typography variant="body2" component="div" sx={{mt:1, fontStyle:'italic', p:1, backgroundColor: 'action.hover', borderRadius:1}}>
                <strong>Importance:</strong> <RenderTextWithLinks text={pattern.importance} glossaryData={glossaryData} />
            </Typography>
          )}
           {pattern.benefits && (
             <Typography variant="body2" component="div" sx={{mt:1, fontStyle:'italic', p:1, backgroundColor: 'action.hover', borderRadius:1}}>
                <strong>Benefits:</strong> <RenderTextWithLinks text={pattern.benefits} glossaryData={glossaryData} />
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}

export default DesignPatternsView;
