// src/components/databases/FundamentalsView.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Accordion from '../common/Accordion';
// import Glossary from '../common/Glossary'; // Will render terminology directly
import Mermaid from '../common/Mermaid';
import { databasesAppData } from '../../data/databasesAppData'; // Assuming appData is passed or use this directly
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing';
import { glossaryData } from '../../../data/glossaryData';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';


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


const FundamentalsView = ({ appData: pageSpecificAppData }) => {
  // Use pageSpecificAppData if passed, otherwise fallback to the imported databasesAppData
  const appData = pageSpecificAppData || databasesAppData;

  if (!appData) return <Typography className="p-4">Loading database fundamentals data...</Typography>;

  const { mermaidDiagrams, title, description, overview, terminology } = appData;

  const exampleDescription = description || "Databases are crucial for storing and managing data. This section covers various types like {{SQL}} and {{NoSQL}}, and concepts such as {{ACID Properties}} vs {{BASE Properties}}.";
  const exampleOverview = overview || "An overview of database technologies, including {{Sharding}}, {{Replication}}, and the {{CAP Theorem}}. Understanding these is essential for robust {{System Design}}.";

  return (
    <Box sx={{ p: 2, fontFamily: 'sans-serif' }}>
      <Typography variant="h4" gutterBottom component="h2">
        {title || 'Database Fundamentals'}
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
            <RenderProcessedText textParts={parseTextForGlossaryLinks(exampleDescription, glossaryData)} />
        </Typography>
      </Paper>

      <Accordion title="Overview of Database Concepts" defaultOpen>
        <Box sx={{p:2}}>
            <Typography variant="body1" paragraph>
                <RenderProcessedText textParts={parseTextForGlossaryLinks(exampleOverview, glossaryData)} />
            </Typography>
        </Box>
      </Accordion>

      <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom component="h3">Core Database Terminology</Typography>
        <List>
          {!terminology || terminology.length === 0 ? (
            <ListItem><ListItemText primary="No terminology data available." /></ListItem>
          ) : (
            terminology.map((termItem) => (
              <React.Fragment key={termItem.id || termItem.title}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{termItem.title}</Typography>}
                    secondary={
                      <Typography component="span" variant="body2" color="text.secondary">
                        <RenderProcessedText textParts={parseTextForGlossaryLinks(termItem.description || termItem.details, glossaryData)} />
                      </Typography>
                    }
                  />
                </ListItem>
                {termItem.id === 'sharding' && mermaidDiagrams && mermaidDiagrams.consistentHashing && (
                  <ListItem>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 2, p:1, border: '1px dashed grey', borderRadius: '4px' }}>
                      <Mermaid chart={mermaidDiagrams.consistentHashing} />
                    </Box>
                  </ListItem>
                )}
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default FundamentalsView;