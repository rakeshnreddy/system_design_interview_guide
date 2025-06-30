import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


function TypesView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading load balancer types data...</Typography>;
  }

  const lbTypes = appData.lbTypes || [];
  const footerText = "Information about different types of load balancers (Hardware, Software, Cloud like {{AWS ELB}}) will be displayed here. These can perform at {{Layer 4 (L4) Load Balancing}} or {{Layer 7 (L7) Load Balancing}} levels.";

  if (lbTypes.length === 0) {
    return <Typography className="p-4">No load balancer type data available.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Types of Load Balancers
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {lbTypes.map((lbType) => (
            <React.Fragment key={lbType.id}>
              <ListItem sx={{ display: 'block', mb: 3 }}>
                <Typography variant="h6" gutterBottom component="div">
                  <RenderTextWithLinks text={lbType.name} glossaryData={glossaryData} />
                </Typography>

                <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Description:</Typography>
                <Typography variant="body2" component="div" paragraph>
                  <RenderTextWithLinks text={lbType.description} glossaryData={glossaryData} />
                </Typography>

                {lbType.commonTechniques && lbType.commonTechniques.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Common Techniques:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {lbType.commonTechniques.map((technique, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }} >
                            <RenderTextWithLinks text={technique} glossaryData={glossaryData} />
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {lbType.pros && lbType.pros.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Pros:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {lbType.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={pro} glossaryData={glossaryData} />
                           </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {lbType.cons && lbType.cons.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Cons:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {lbType.cons.map((con, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={con} glossaryData={glossaryData} />
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {lbType.whenToUse && lbType.whenToUse.length > 0 && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>When to Use:</Typography>
                     <List dense disablePadding sx={{pl:2}}>
                      {lbType.whenToUse.map((item, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={item} glossaryData={glossaryData} />
                           </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {lbType.interviewTalkingPoints && lbType.interviewTalkingPoints.length > 0 && (
                    <Box sx={{mt: 1.5, p:1, backgroundColor: 'action.hover', borderRadius: 1}}>
                        <Typography variant="caption" component="div" sx={{fontWeight: 'bold'}}>Interview Talking Points:</Typography>
                        <List dense disablePadding sx={{pl:1.5}}>
                        {lbType.interviewTalkingPoints.map((point, index) => (
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

export default TypesView;
