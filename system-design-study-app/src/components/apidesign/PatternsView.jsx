import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

function PatternsView({ appData }) {
  if (!appData || !appData.patterns) {
    return <Typography className="p-4">Loading API design pattern data...</Typography>;
  }
  const patterns = appData.patterns || [];
  const footerText = "Information about common API design patterns such as {{Pagination}}, {{Rate Limiting}}, {{API Versioning Strategies|API Versioning}}, etc., will be displayed here using data from apiDesignAppData.js. Consider how {{Idempotency}} plays a role in some patterns.";

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom>
        Common API Design Patterns
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {patterns.map((pattern) => (
            <React.Fragment key={pattern.id}>
              <ListItem sx={{ display: 'block', mb: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  <RenderTextWithLinks text={pattern.name} glossaryData={glossaryData} />
                </Typography>

                <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Description:</Typography>
                <Typography variant="body2" component="div" paragraph>
                  <RenderTextWithLinks text={pattern.description} glossaryData={glossaryData} />
                </Typography>

                {/* Specific rendering for API Versioning Strategies */}
                {pattern.id === 'api_versioning_strategies' && pattern.strategies && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1.5 }}>Specific Strategies:</Typography>
                    {pattern.strategies.map((strat, index) => (
                      <Box key={index} sx={{my:1, p:1.5, border: '1px solid', borderColor: 'divider', borderRadius:1}}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 'medium'}}>
                          <RenderTextWithLinks text={strat.name} glossaryData={glossaryData} />
                        </Typography>
                        <Typography variant="body2" component="div" sx={{my:0.5}}>
                          <RenderTextWithLinks text={strat.detail} glossaryData={glossaryData} />
                        </Typography>
                        {strat.pros && strat.pros.length > 0 && (
                          <List dense disablePadding sx={{pl:1.5}}><Typography variant="caption" component="strong">Pros: </Typography>
                            {strat.pros.map((pro, pIdx)=><ListItem key={pIdx} sx={{display:'list-item', listStyleType:'disc', py:0, pl:1, fontSize:'0.8rem'}}><ListItemText primaryTypographyProps={{variant:'caption'}}><RenderTextWithLinks text={pro} glossaryData={glossaryData}/></ListItemText></ListItem>)}
                          </List>
                        )}
                        {strat.cons && strat.cons.length > 0 && (
                           <List dense disablePadding sx={{pl:1.5, mt:0.5}}><Typography variant="caption" component="strong">Cons: </Typography>
                            {strat.cons.map((con, cIdx)=><ListItem key={cIdx} sx={{display:'list-item', listStyleType:'disc', py:0, pl:1, fontSize:'0.8rem'}}><ListItemText primaryTypographyProps={{variant:'caption'}}><RenderTextWithLinks text={con} glossaryData={glossaryData}/></ListItemText></ListItem>)}
                          </List>
                        )}
                      </Box>
                    ))}
                  </>
                )}
                 {pattern.id === 'api_versioning_strategies' && pattern.generalConsiderations && (
                    <>
                        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1.5 }}>General Considerations:</Typography>
                        <List dense disablePadding sx={{pl:2}}>
                        {pattern.generalConsiderations.map((item, index) => (
                            <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'bullet', py: 0.2, pl:0 }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                                    <RenderTextWithLinks text={item} glossaryData={glossaryData} />
                                </ListItemText>
                            </ListItem>
                        ))}
                        </List>
                    </>
                 )}


                {pattern.pros && pattern.pros.length > 0 && pattern.id !== 'api_versioning_strategies' && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Pros:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {pattern.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                           <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={pro} glossaryData={glossaryData} />
                           </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {pattern.cons && pattern.cons.length > 0 && pattern.id !== 'api_versioning_strategies' && (
                  <>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Cons:</Typography>
                    <List dense disablePadding sx={{pl:2}}>
                      {pattern.cons.map((con, index) => (
                        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                          <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                            <RenderTextWithLinks text={con} glossaryData={glossaryData} />
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

                {pattern.useCases && (
                    <>
                     <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1 }}>Common Use Cases:</Typography>
                     <Typography variant="body2" component="div" paragraph>
                        <RenderTextWithLinks text={pattern.useCases} glossaryData={glossaryData} />
                    </Typography>
                    </>
                 )}
                 {pattern.example && (
                    <Box sx={{my: 1, p:1, backgroundColor: 'action.hover', borderRadius: 1}}>
                        <Typography variant="caption" component="div" sx={{fontWeight: 'bold'}}>Example:</Typography>
                        <Typography variant="caption" component="div">
                            <RenderTextWithLinks text={pattern.example} glossaryData={glossaryData} />
                        </Typography>
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

export default PatternsView;
