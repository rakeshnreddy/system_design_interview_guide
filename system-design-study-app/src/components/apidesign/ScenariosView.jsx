import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


function ScenariosView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading API design scenario data...</Typography>;
  }

  const scenarios = appData.scenarios || [];
  const comparison = appData.protocolComparison;
  const footerText = "Real-world API design scenarios and example solutions/considerations will be presented here, using data from apiDesignAppData.js. These often involve choosing between {{REST}}, {{GraphQL}}, or {{gRPC}} based on needs like {{Pagination}} or {{Real-time data}}.";

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' }, '.MuiTableCell-root': { overflowWrap: 'break-word'} }}>
      <Typography variant="h4" gutterBottom>
        API Design Scenarios & Comparisons
      </Typography>

      {scenarios.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="div">Design Scenarios</Typography>
          <List>
            {scenarios.map((scenario) => (
              <React.Fragment key={scenario.id}>
                <ListItem sx={{ display: 'block', mb: 3 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    <RenderTextWithLinks text={scenario.title} glossaryData={glossaryData} />
                  </Typography>

                  <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Description:</Typography>
                  <Typography variant="body2" component="div" paragraph>
                    <RenderTextWithLinks text={scenario.description} glossaryData={glossaryData} />
                  </Typography>

                  {scenario.problem && (
                     <>
                        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Problem:</Typography>
                        <Typography variant="body2" component="div" paragraph>
                            <RenderTextWithLinks text={scenario.problem} glossaryData={glossaryData} />
                        </Typography>
                     </>
                  )}
                  {scenario.solution && typeof scenario.solution === 'string' && (
                     <>
                        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Solution Sketch:</Typography>
                        <Typography variant="body2" component="div" paragraph>
                            <RenderTextWithLinks text={scenario.solution} glossaryData={glossaryData} />
                        </Typography>
                     </>
                  )}
                   {scenario.solution && typeof scenario.solution === 'object' && scenario.solution.strategy && (
                     <>
                        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Solution Sketch:</Typography>
                        <Typography variant="body2" component="div" paragraph>
                            <RenderTextWithLinks text={scenario.solution.strategy} glossaryData={glossaryData} />
                        </Typography>
                     </>
                  )}
                  {scenario.considerations && scenario.considerations.length > 0 && (
                    <>
                      <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>Key Considerations:</Typography>
                      <List dense disablePadding sx={{pl:2}}>
                        {scenario.considerations.map((item, index) => (
                          <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl:0 }}>
                            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                              <RenderTextWithLinks text={item} glossaryData={glossaryData} />
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </ListItem>
                <Divider component="li" sx={{ mb: 3 }} />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {comparison && comparison.rows && comparison.rows.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="div">
            <RenderTextWithLinks text={comparison.title || "Protocol Comparison"} glossaryData={glossaryData} />
          </Typography>
          {comparison.introduction && (
            <Typography variant="body1" paragraph>
              <RenderTextWithLinks text={comparison.introduction} glossaryData={glossaryData} />
            </Typography>
          )}
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead sx={{backgroundColor: 'action.hover'}}>
                <TableRow>
                  {comparison.headers?.map(header => (
                    <TableCell key={header} sx={{fontWeight: 'bold'}}><RenderTextWithLinks text={header} glossaryData={glossaryData} /></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {comparison.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} hover>
                    <TableCell component="th" scope="row" sx={{fontWeight: 'medium'}}>
                      <RenderTextWithLinks text={row.characteristic} glossaryData={glossaryData} />
                    </TableCell>
                    <TableCell><RenderTextWithLinks text={row.rest} glossaryData={glossaryData} /></TableCell>
                    <TableCell><RenderTextWithLinks text={row.graphql} glossaryData={glossaryData} /></TableCell>
                    <TableCell><RenderTextWithLinks text={row.grpc} glossaryData={glossaryData} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {comparison.summary && (
            <Typography variant="body2" sx={{mt:2, fontStyle: 'italic', p:1, backgroundColor: 'background.paper', borderRadius:1}}>
              <RenderTextWithLinks text={comparison.summary} glossaryData={glossaryData} />
            </Typography>
          )}
        </Paper>
      )}

      <Typography sx={{ mt: 2 }} variant="body1">
        <RenderTextWithLinks text={footerText} glossaryData={glossaryData} />
      </Typography>
    </Box>
  );
}

export default ScenariosView;
