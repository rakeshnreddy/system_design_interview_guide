import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function NetworkingBasicsView({ appData }) {
  if (!appData || !appData.networkingConcepts) {
    return <Typography className="p-4">Loading networking concepts data...</Typography>;
  }

  const { title, items } = appData.networkingConcepts;

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom component="h1">
        <RenderTextWithLinks text={title || "Key Networking Concepts"} glossaryData={glossaryData} />
      </Typography>

      {items && items.map((item, index) => (
        <Paper key={index} elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="h2">
            <RenderTextWithLinks text={item.name} glossaryData={glossaryData} />
          </Typography>

          {item.description && (
            <Typography variant="body1" component="div" paragraph>
              <RenderTextWithLinks text={item.description} glossaryData={glossaryData} />
            </Typography>
          )}

          {/* Specific rendering for TCP vs UDP */}
          {item.tcp && item.udp && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{p:1.5, height: '100%'}}>
                  <Typography variant="h6" component="div" gutterBottom>TCP (Transmission Control Protocol)</Typography>
                  <Typography variant="body2" component="div"><strong>Type:</strong> <RenderTextWithLinks text={item.tcp.type} glossaryData={glossaryData} /></Typography>
                  <Typography variant="body2" component="div"><strong>Reliability:</strong> <RenderTextWithLinks text={item.tcp.reliability} glossaryData={glossaryData} /></Typography>
                  <Typography variant="body2" component="div"><strong>Overhead:</strong> <RenderTextWithLinks text={item.tcp.overhead} glossaryData={glossaryData} /></Typography>
                  <Typography variant="body2" component="div"><strong>Use Cases:</strong> <RenderTextWithLinks text={item.tcp.useCases} glossaryData={glossaryData} /></Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{p:1.5, height: '100%'}}>
                  <Typography variant="h6" component="div" gutterBottom>UDP (User Datagram Protocol)</Typography>
                  <Typography variant="body2" component="div"><strong>Type:</strong> <RenderTextWithLinks text={item.udp.type} glossaryData={glossaryData} /></Typography>
                  <Typography variant="body2" component="div"><strong>Reliability:</strong> <RenderTextWithLinks text={item.udp.reliability} glossaryData={glossaryData} /></Typography>
                  <Typography variant="body2" component="div"><strong>Overhead:</strong> <RenderTextWithLinks text={item.udp.overhead} glossaryData={glossaryData} /></Typography>
                  <Typography variant="body2" component="div"><strong>Use Cases:</strong> <RenderTextWithLinks text={item.udp.useCases} glossaryData={glossaryData} /></Typography>
                </Paper>
              </Grid>
              {item.tradeoffSummary && (
                <Grid item xs={12}>
                    <Typography variant="caption" display="block" sx={{mt:1, fontStyle: 'italic', p:1, backgroundColor: 'action.hover', borderRadius:1}}>
                        <RenderTextWithLinks text={item.tradeoffSummary} glossaryData={glossaryData} />
                    </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {/* Specific rendering for HTTP Versions */}
          {item.versions && item.versions.length > 0 && (
            <List dense>
              {item.versions.map((v, vIndex) => (
                <ListItem key={vIndex} disableGutters>
                  <ListItemText
                    primary={<Typography variant="subtitle1" component="span" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={v.version} glossaryData={glossaryData} /></Typography>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={<RenderTextWithLinks text={v.description} glossaryData={glossaryData} />}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      ))}
    </Box>
  );
}

export default NetworkingBasicsView;
