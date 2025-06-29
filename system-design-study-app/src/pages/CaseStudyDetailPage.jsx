// src/pages/CaseStudyDetailPage.jsx
import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Link } from '@mui/material';
import Mermaid from '../components/common/MermaidDiagram'; // Corrected import path
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';

// Import all case studies
import { urlShortener } from '../data/caseStudies/urlShortener';
import { webCrawler } from '../data/caseStudies/webCrawler';
import { rateLimiter } from '../data/caseStudies/rateLimiter';
import { instagram } from '../data/caseStudies/instagram';
import { rideSharing } from '../data/caseStudies/rideSharing';
import { chatApp } from '../data/caseStudies/chatApp';
import { videoStreaming } from '../data/caseStudies/videoStreaming';
import { fileStorage } from '../data/caseStudies/fileStorage';

const caseStudiesData = {
  [urlShortener.id]: urlShortener,
  [webCrawler.id]: webCrawler,
  [rateLimiter.id]: rateLimiter,
  [instagram.id]: instagram,
  [rideSharing.id]: rideSharing,
  [chatApp.id]: chatApp,
  [videoStreaming.id]: videoStreaming,
  [fileStorage.id]: fileStorage,
  // Add other imported case studies here
  'design-twitter': { // Keep existing placeholders if needed, or replace them
    id: 'design-twitter',
    title: 'Design Twitter',
    description: 'This is a deep dive into the architecture of Twitter...',
    // mermaidDiagram: 'graph TD; A-->B;' // Example diagram
  },
  'design-uber': {
    id: 'design-uber',
    title: 'Design Uber',
    description: 'This is a deep dive into the architecture of Uber...',
    // mermaidDiagram: 'graph TD; C-->D;' // Example diagram
  },
};

const CaseStudyDetailPage = () => {
  const { caseStudyId } = useParams();
  const caseData = caseStudiesData[caseStudyId];

  useEffect(() => {
    if (caseData) {
      const pageTitle = `${caseData.title} | System Design Case Study`;
      // Use the start of the description for meta description, truncate if necessary
      const pageDescription = caseData.description ? caseData.description.substring(0, 160) + (caseData.description.length > 160 ? '...' : '') : `In-depth analysis of the ${caseData.title} system design.`;

      const originalDocTitle = document.title;
      document.title = pageTitle;

      const metaTags = [
        { name: 'description', content: pageDescription },
        { name: 'og:title', content: pageTitle, isProperty: true },
        { name: 'og:description', content: pageDescription, isProperty: true },
        { name: 'og:type', content: 'article', isProperty: true }, // Case studies are like articles
        // { name: 'og:url', content: window.location.href, isProperty: true },
      ];

      metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

      return () => {
        document.title = originalDocTitle;
        metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
      };
    }
  }, [caseData]);

  // Helper function to parse markdown-style links (similar to InterviewApproachPage)
  const parseAndRenderText = (text) => {
    if (!text) return '';
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const linkText = match[1];
      const linkPath = match[2];
      if (linkPath.startsWith('#') || linkPath.startsWith('/')) {
        parts.push(
          <Link component={RouterLink} to={linkPath} key={lastIndex} sx={{color: 'primary.main', '&:hover': {textDecoration: 'underline'}}}>
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <Link href={linkPath} target="_blank" rel="noopener noreferrer" key={lastIndex} sx={{color: 'primary.main', '&:hover': {textDecoration: 'underline'}}}>
            {linkText}
          </Link>
        );
      }
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>);
  };

  if (!caseData) {
    return <div className="p-4">Case study not found for ID: {caseStudyId}</div>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom>{caseData.title}</Typography>
      <Typography variant="body1" paragraph>{parseAndRenderText(caseData.description)}</Typography>

      {caseData.mermaidDiagram && (
        <Box sx={{ my: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px', overflowX: 'auto' }}>
          <Typography variant="h6" gutterBottom>System Architecture</Typography>
          <Mermaid chart={caseData.mermaidDiagram} />
        </Box>
      )}

      {/* Render other case study content here if available, e.g., caseData.content */}
      {caseData.content && <Typography variant="body1">{parseAndRenderText(caseData.content)}</Typography>}
    </Box>
  );
};

export default CaseStudyDetailPage;
