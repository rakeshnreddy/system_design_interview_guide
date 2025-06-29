import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing';
import { parseAndRenderTextWithGlossary } from '../../../utils/textParsingUtils'; // Assuming a combined utility
import { glossaryData } from '../../../data/glossaryData';


// Helper component to render processed text (strings and links)
// This is duplicated in other files, consider moving to a common utility
const RenderProcessedTextWithMarkdownAndGlossary = ({ text, termsData }) => {
  if (typeof text !== 'string' || !text) {
    return <>{text || ''}</>;
  }

  // First, parse for {{Glossary Terms}}
  const glossaryParts = parseTextForGlossaryLinks(text, termsData);

  // Then, for each text part, parse for [Markdown Links](url)
  const finalParts = [];
  glossaryParts.forEach((gPart, gIndex) => {
    if (gPart.type === 'text') {
      // Regex to find markdown links: [link text](path)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let lastIndex = 0;
      let match;
      const content = gPart.content;

      while ((match = linkRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          finalParts.push(<React.Fragment key={`${gIndex}-text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</React.Fragment>);
        }
        const linkText = match[1];
        const linkPath = match[2];
        if (linkPath.startsWith('#') || linkPath.startsWith('/')) { // Internal links
          finalParts.push(
            <Link component={RouterLink} to={linkPath} key={`${gIndex}-mdlink-${lastIndex}`} sx={{color: 'primary.main', '&:hover': {textDecoration: 'underline'}}}>
              {linkText}
            </Link>
          );
        } else { // External links
          finalParts.push(
            <Link href={linkPath} target="_blank" rel="noopener noreferrer" key={`${gIndex}-mdlink-${lastIndex}`} sx={{color: 'primary.main', '&:hover': {textDecoration: 'underline'}}}>
              {linkText}
            </Link>
          );
        }
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        finalParts.push(<React.Fragment key={`${gIndex}-text-${lastIndex}-rem`}>{content.substring(lastIndex)}</React.Fragment>);
      }
    } else if (gPart.type === 'link') { // Glossary link
      finalParts.push(
        <RouterLink
          key={`${gIndex}-glossary-${gPart.displayText}`}
          to={`/glossary?search=${encodeURIComponent(gPart.term.term)}`}
          className="glossary-link text-blue-600 hover:text-blue-800 hover:underline"
          title={getDefinitionSnippet(gPart.term.definition)}
        >
          {gPart.displayText}
        </RouterLink>
      );
    }
  });

  return <>{finalParts}</>;
};


function FundamentalsView({ appData }) {
  if (!appData || !appData.metrics || !appData.terminology) {
    return <Typography>Loading fundamental scalability data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Scalability Fundamentals
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Key Metrics
        </Typography>
        <List>
          {appData.metrics.map((metric) => (
            <React.Fragment key={metric.id}>
              <ListItem>
                <ListItemText
                  primary={<RenderProcessedTextWithMarkdownAndGlossary text={metric.name} termsData={glossaryData} />}
                  secondary={<RenderProcessedTextWithMarkdownAndGlossary text={metric.description} termsData={glossaryData} />}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Core Terminology
        </Typography>
        <List>
          {appData.terminology.map((term, index) => (
            <React.Fragment key={`${term.term}-${index}`}>
              <ListItem>
                <ListItemText
                  primary={<RenderProcessedTextWithMarkdownAndGlossary text={term.term} termsData={glossaryData} />}
                  secondary={<RenderProcessedTextWithMarkdownAndGlossary text={term.definition} termsData={glossaryData} />}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
       <Typography sx={{mt: 2}} variant="body1">
        More content related to scalability fundamentals will be displayed here, using data from <code>scalabilityConceptsAppData.js</code>.
      </Typography>
    </Box>
  );
}

export default FundamentalsView;
