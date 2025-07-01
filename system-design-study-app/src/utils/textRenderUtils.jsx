import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from './textProcessing.js';
import { glossaryData as defaultGlossaryData } from '../data/glossaryData.js';

export const RenderGlossaryLink = ({ term, displayText, keyPrefix = 'glossary-link' }) => {
  if (!term || !term.term) return <>{displayText || ''}</>;
  return (
    <RouterLink
      key={`${keyPrefix}-${term.term}-${displayText}`}
      to={`/glossary?search=${encodeURIComponent(term.term)}#term-${encodeURIComponent(term.term)}`}
      className="glossary-link text-blue-600 hover:text-blue-800 hover:underline"
      title={getDefinitionSnippet(term.definition)}
    >
      {displayText || term.term.replace(/\{\{|\}\}/g, '')}
    </RouterLink>
  );
};

export const RenderMarkdownLink = ({ linkText, linkPath, keyPrefix = 'md-link' }) => {
  if (linkPath.startsWith('#') || linkPath.startsWith('/')) {
    return (
      <MuiLink component={RouterLink} to={linkPath} key={`${keyPrefix}-${linkText}`} sx={{color: 'primary.main', '&:hover': {textDecoration: 'underline'}}}>
        {linkText}
      </MuiLink>
    );
  }
  return (
    <MuiLink href={linkPath} target="_blank" rel="noopener noreferrer" key={`${keyPrefix}-${linkText}`} sx={{color: 'primary.main', '&:hover': {textDecoration: 'underline'}}}>
      {linkText}
    </MuiLink>
  );
};

export const RenderTextWithLinks = ({ text, glossaryData = defaultGlossaryData, keyPrefix = 'text-with-links' }) => {
  if (typeof text !== 'string' || !text) {
    return <>{text || ''}</>;
  }

  const parts = [];
  // Regex to find markdown links OR glossary terms
  // Order matters: glossary {{...}} might be part of markdown [{{Term}}](url)
  // So, we can split by a combined regex or do sequential processing.
  // Let's try splitting by both and then determining type.
  // A more robust way is to parse one, then parse the text segments of the other.

  // Step 1: Parse for Glossary Links
  const glossaryProcessedParts = parseTextForGlossaryLinks(text, glossaryData);

  const finalRenderedParts = [];

  glossaryProcessedParts.forEach((gPart, gIndex) => {
    if (gPart.type === 'link') {
      finalRenderedParts.push(
        <RenderGlossaryLink
          key={`${keyPrefix}-g-${gIndex}`}
          term={gPart.term}
          displayText={gPart.displayText}
        />
      );
    } else if (gPart.type === 'text' && gPart.content) {
      // Step 2: Parse remaining text parts for Markdown Links
      const textContent = gPart.content;
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(textContent)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          finalRenderedParts.push(<React.Fragment key={`${keyPrefix}-g-${gIndex}-t-${lastIndex}`}>{textContent.substring(lastIndex, match.index)}</React.Fragment>);
        }
        // Add the markdown link
        finalRenderedParts.push(
          <RenderMarkdownLink
            key={`${keyPrefix}-g-${gIndex}-m-${lastIndex}`}
            linkText={match[1]}
            linkPath={match[2]}
          />
        );
        lastIndex = linkRegex.lastIndex;
      }
      // Add any remaining text after the last markdown link
      if (lastIndex < textContent.length) {
        finalRenderedParts.push(<React.Fragment key={`${keyPrefix}-g-${gIndex}-t-${lastIndex}-rem`}>{textContent.substring(lastIndex)}</React.Fragment>);
      }
    }
  });

  return <>{finalRenderedParts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>)}</>;
};
