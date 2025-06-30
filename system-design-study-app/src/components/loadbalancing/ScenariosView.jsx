import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';


function ScenariosView({ appData }) {
  if (!appData) {
    return <Typography className="p-4">Loading scenario data...</Typography>;
  }

  const scenarios = appData.scenarios || [];
  const tradeOffsData = appData.tradeOffs;
  const footerText = "Real-world load balancing scenarios, such as handling {{Flash Sales}} or scaling {{Microservices}}, and their solutions will be presented here.";

  return (
    <Box sx={{ p: 2, '.MuiListItemText-root': { overflowWrap: 'break-word' } }}>
      <Typography variant="h4" gutterBottom>
        Load Balancing Scenarios & Trade-offs
      </Typography>

      {scenarios.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom component="div">Real-World Scenarios</Typography>
          <List>
            {scenarios.map((scenario) => (
              <React.Fragment key={scenario.id}>
                <ListItem sx={{ display: 'block', mb: 2 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    <RenderTextWithLinks text={scenario.title} glossaryData={glossaryData} />
                  </Typography>

                  <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt: 1}}>Description:</Typography>
                  <Typography variant="body2" component="div" paragraph>
                    <RenderTextWithLinks text={scenario.description} glossaryData={glossaryData} />
                  </Typography>

                  {scenario.solution && (
                    <>
                      <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold'}}>Solution / Strategy:</Typography>
                      <Typography variant="body2" component="div" paragraph>
                        <RenderTextWithLinks text={scenario.solution.strategy} glossaryData={glossaryData} />
                      </Typography>
                      {scenario.solution.components && scenario.solution.components.length > 0 && (
                        <>
                          <Typography component="div" variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>Key Components:</Typography>
                          <List dense disablePadding sx={{ pl: 2 }}>
                            {scenario.solution.components.map((component, index) => (
                              <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', py: 0.2, pl: 0 }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                                  <RenderTextWithLinks text={component} glossaryData={glossaryData} />
                                </ListItemText>
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </>
                  )}
                  {scenario.challenges && (
                    <>
                      <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1.5 }}>Challenges:</Typography>
                      <Typography variant="body2" component="div" paragraph>
                        <RenderTextWithLinks text={scenario.challenges} glossaryData={glossaryData} />
                      </Typography>
                    </>
                  )}
                  {scenario.learnings && (
                     <>
                      <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold', mt:1.5 }}>Learnings:</Typography>
                      <Typography variant="body2" component="div" paragraph>
                        <RenderTextWithLinks text={scenario.learnings} glossaryData={glossaryData} />
                      </Typography>
                    </>
                  )}
                </ListItem>
                <Divider component="li" sx={{ mb: 2 }} />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {tradeOffsData && tradeOffsData.points && tradeOffsData.points.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb:3 }}>
          <Typography variant="h5" gutterBottom component="div">
            <RenderTextWithLinks text={tradeOffsData.title || "Key Trade-offs & Considerations"} glossaryData={glossaryData} />
          </Typography>
          {tradeOffsData.introduction && (
            <Typography variant="body1" paragraph>
              <RenderTextWithLinks text={tradeOffsData.introduction} glossaryData={glossaryData} />
            </Typography>
          )}
          {tradeOffsData.points.map(point => (
            <Box key={point.id} sx={{ mb: 2.5, p:1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1}}>
              <Typography variant="h6" component="div" gutterBottom>
                <RenderTextWithLinks text={point.title} glossaryData={glossaryData} />
              </Typography>
              <Typography variant="body2" component="div" paragraph>
                <RenderTextWithLinks text={point.description} glossaryData={glossaryData} />
              </Typography>

              {/* For Single vs Multiple LBs */}
              {point.id === "single_vs_multiple_lb" && (
                <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 2}}>
                  <Box sx={{flex:1}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight:'medium'}}>Single LB:</Typography>
                    {point.singleLB?.pros && <List dense disablePadding><strong>Pros:</strong> {point.singleLB.pros.map((p,i) => <ListItem key={i} sx={{display:'list-item', listStyleType:'disc', pl:2, py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={p} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                    {point.singleLB?.cons && <List dense disablePadding sx={{mt:0.5}}><strong>Cons:</strong> {point.singleLB.cons.map((c,i) => <ListItem key={i} sx={{display:'list-item', listStyleType:'disc', pl:2, py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={c} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                  </Box>
                  <Box sx={{flex:1}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight:'medium'}}>Multiple LBs (HA):</Typography>
                    {point.multipleLBs?.pros && <List dense disablePadding><strong>Pros:</strong> {point.multipleLBs.pros.map((p,i) => <ListItem key={i} sx={{display:'list-item', listStyleType:'disc', pl:2, py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={p} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                    {point.multipleLBs?.cons && <List dense disablePadding sx={{mt:0.5}}><strong>Cons:</strong> {point.multipleLBs.cons.map((c,i) => <ListItem key={i} sx={{display:'list-item', listStyleType:'disc', pl:2, py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={c} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                  </Box>
                </Box>
              )}
              {point.recommendation && <Typography variant="caption" component="div" sx={{mt:1, fontStyle:'italic'}}><RenderTextWithLinks text={`Recommendation: ${point.recommendation}`} glossaryData={glossaryData} /></Typography>}

              {/* For L4 vs L7 LBs */}
              {point.id === "l4_vs_l7_lb" && (
                 <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 2, mt:1.5}}>
                    <Box sx={{flex:1, p:1, border: '1px dashed', borderColor:'grey.400', borderRadius:1}}>
                        <Typography variant="subtitle1" component="div" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={point.l4.name} glossaryData={glossaryData}/></Typography>
                        <Typography variant="caption" display="block">Operates at: <RenderTextWithLinks text={point.l4.operatesAt} glossaryData={glossaryData}/></Typography>
                        <Typography variant="caption" display="block">Routing: <RenderTextWithLinks text={point.l4.routingDecisions} glossaryData={glossaryData}/></Typography>
                        {point.l4.pros && <List dense disablePadding sx={{mt:0.5}}><strong>Pros:</strong> {point.l4.pros.map((p,i)=><ListItem key={i} sx={{display:'list-item',listStyleType:'disc',pl:2,py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={p} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                        {point.l4.cons && <List dense disablePadding sx={{mt:0.5}}><strong>Cons:</strong> {point.l4.cons.map((c,i)=><ListItem key={i} sx={{display:'list-item',listStyleType:'disc',pl:2,py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={c} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                        {point.l4.useCases && <Typography variant="caption" display="block" sx={{mt:1}}><strong>Use Cases:</strong> <RenderTextWithLinks text={point.l4.useCases} glossaryData={glossaryData}/></Typography>}
                    </Box>
                     <Box sx={{flex:1, p:1, border: '1px dashed', borderColor:'grey.400', borderRadius:1}}>
                        <Typography variant="subtitle1" component="div" sx={{fontWeight:'medium'}}><RenderTextWithLinks text={point.l7.name} glossaryData={glossaryData}/></Typography>
                        <Typography variant="caption" display="block">Operates at: <RenderTextWithLinks text={point.l7.operatesAt} glossaryData={glossaryData}/></Typography>
                        <Typography variant="caption" display="block">Routing: <RenderTextWithLinks text={point.l7.routingDecisions} glossaryData={glossaryData}/></Typography>
                        {point.l7.pros && <List dense disablePadding sx={{mt:0.5}}><strong>Pros:</strong> {point.l7.pros.map((p,i)=><ListItem key={i} sx={{display:'list-item',listStyleType:'disc',pl:2,py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={p} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                        {point.l7.cons && <List dense disablePadding sx={{mt:0.5}}><strong>Cons:</strong> {point.l7.cons.map((c,i)=><ListItem key={i} sx={{display:'list-item',listStyleType:'disc',pl:2,py:0}}><ListItemText primaryTypographyProps={{variant:'body2'}}><RenderTextWithLinks text={c} glossaryData={glossaryData}/></ListItemText></ListItem>)}</List>}
                        {point.l7.useCases && <Typography variant="caption" display="block" sx={{mt:1}}><strong>Use Cases:</strong> <RenderTextWithLinks text={point.l7.useCases} glossaryData={glossaryData}/></Typography>}
                    </Box>
                 </Box>
              )}
            </Box>
          ))}
        </Paper>
      )}

      <Typography sx={{ mt: 2 }} variant="body1">
        <RenderTextWithLinks text={footerText} glossaryData={glossaryData} />
      </Typography>
    </Box>
  );
}

export default ScenariosView;
