import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { setMetaTag, removeMetaTag } from '../utils/metaUtils';

// Placeholder for data loading, will be replaced with actual imports
import { cachesAppData } from '../data/cachesAppData';
import { databasesAppData } from '../data/databasesAppData';
import { messagingQueuesAppData } from '../data/messagingQueuesAppData';
import { loadBalancingAppData } from '../data/loadBalancingAppData';
import { apiDesignAppData } from '../data/apiDesignAppData';
import { scalabilityConceptsAppData } from '../data/scalabilityConceptsAppData';
import { interviewApproachAppData } from '../data/interviewApproachAppData';

// Guides data (as from HomePage.jsx or a central source)
const guides = [
  { path: '/caches', title: 'Caching Strategies', description: 'Master caching techniques, patterns, and trade-offs for high-performance systems.', dataKey: 'caches' },
  { path: '/databases', title: 'Database Selection', description: 'Learn to choose the right database by understanding SQL vs. NoSQL, CAP theorem, and various data models.', dataKey: 'databases' },
  { path: '/messaging-queues', title: 'Messaging Queues', description: 'Explore message brokers, delivery semantics, and patterns for resilient and scalable distributed systems.', dataKey: 'messaging-queues' },
  { path: '/load-balancing', title: 'Load Balancing', description: 'Understand various load balancing algorithms and their impact on system availability and performance.', dataKey: 'load-balancing' },
  { path: '/api-design', title: 'API Design', description: 'Principles of designing robust, scalable, and maintainable APIs, including REST and GraphQL.', dataKey: 'api-design' },
  { path: '/scalability-concepts', title: 'Scalability Concepts', description: 'Core concepts for scaling systems, including horizontal vs. vertical scaling, and statelessness.', dataKey: 'scalability-concepts' },
  { path: '/interview-approach', title: 'Interview Approach', description: 'Strategies and frameworks for effectively navigating the system design interview.', dataKey: 'interview-approach' },
];

const slugify = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

const subtopicConfig = {
  '/caches': {
    data: cachesAppData,
    sections: [
      { key: 'terminology', title: 'Key Terminology', pathId: 'terminology', subKeyName: 'term', subKeyId: 'term' },
      { key: 'cachepedia', title: 'Cache Types (Cachepedia)', pathId: 'cachepedia', subKeyIsObjectKey: true },
      { key: 'writePatterns', title: 'Write Patterns', pathId: 'write-patterns', subKeyName: 'name' },
      { key: 'evictionPolicies', title: 'Eviction Policies', pathId: 'eviction-policies', subKeyName: 'name' },
      { key: 'scenarios', title: 'Caching Scenarios', pathId: 'scenarios', subKeyIsObjectKey: true, subKeyNameFromObjectValue: 'title'},
    ]
  },
  '/databases': {
    data: databasesAppData,
    sections: [
      { key: 'terminology', title: 'Key Terminology', pathId: 'terminology', subKeyName: 'title', subKeyId: 'id' },
      { key: 'databasepedia', title: 'Database Types (Databasepedia)', pathId: 'databasepedia', subKeyName: 'title', subKeyId: 'id' },
      { key: 'patterns', title: 'Database Patterns', pathId: 'patterns', subKeyName: 'title', subKeyId: 'id' },
    ]
  },
  '/messaging-queues': {
    data: messagingQueuesAppData,
    sections: [
      { key: 'terminology', title: 'Key Terminology', pathId: 'terminology', subKeyName: 'title', subKeyId: 'id' },
      { key: 'deliverySemantics', title: 'Delivery Semantics', pathId: 'delivery-semantics', subKeyName: 'term' },
      { key: 'brokerpedia', title: 'Message Brokers (Brokerpedia)', pathId: 'brokerpedia', subKeyName: 'name', subKeyId: 'id' },
      { key: 'patterns', title: 'Messaging Patterns', pathId: 'patterns', subKeyName: 'title', subKeyId: 'id' },
    ]
  },
  '/load-balancing': {
    data: loadBalancingAppData,
    sections: [
      { key: 'terminology', title: 'Key Terminology', pathId: 'terminology', subKeyName: 'term' },
      { key: 'lbTypes', title: 'Load Balancer Types', pathId: 'types', subKeyName: 'name', subKeyId: 'id' },
      { key: 'algorithms', title: 'Load Balancing Algorithms', pathId: 'algorithms', subKeyName: 'name', subKeyId: 'id' },
    ]
  },
  '/api-design': {
    data: apiDesignAppData,
    sections: [
      { key: 'terminology', title: 'Key Terminology', pathId: 'terminology', subKeyName: 'term' },
      { key: 'protocols', title: 'API Protocols & Styles', pathId: 'protocols', subKeyName: 'name', subKeyId: 'id' },
      { key: 'patterns', title: 'API Design Patterns', pathId: 'patterns', subKeyName: 'name', subKeyId: 'id' },
      { key: 'security', title: 'API Security', pathId: 'security', subKeyName: 'name', subKeyId: 'id' },
    ]
  },
  '/scalability-concepts': {
    data: scalabilityConceptsAppData,
    sections: [
      { key: 'terminology', title: 'Key Terminology', pathId: 'terminology', subKeyName: 'term' },
      { key: 'coreConcepts', title: 'Core Scalability Concepts', pathId: 'core-concepts', subKeyName: 'name', subKeyId: 'id' },
      { key: 'scalingPatterns', title: 'Scaling Patterns', pathId: 'scaling-patterns', subKeyName: 'name', subKeyId: 'id' },
    ]
  },
  '/interview-approach': {
    data: interviewApproachAppData,
    sections: [
      { key: 'sections', title: 'Interview Framework Sections', pathId: 'framework', useDirectSections: true }
    ]
  }
};

const AllTopicsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pageTitle = "All System Design Topics | System Design Interview Prep";
  const pageDescription = "Browse all system design topics covered, including caching, databases, load balancing, API design, scalability concepts, and interview approaches. Find detailed guides and subtopics.";

  useEffect(() => {
    const originalDocTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
      { name: 'og:type', content: 'website', isProperty: true },
      // { name: 'og:url', content: window.location.href, isProperty: true },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalDocTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, []); // Empty dependency array as title and description are static for this page

  const processSubtopics = (mainTopicPath) => {
    const config = subtopicConfig[mainTopicPath];
    if (!config || !config.data) return [];

    let allSubtopics = [];
    config.sections.forEach(sectionConfig => {
      const sectionData = config.data[sectionConfig.key];
      if (!sectionData) return;

      if (sectionConfig.useDirectSections && Array.isArray(sectionData)) { // For interviewApproachAppData
        sectionData.forEach(item => {
          if (item.title && item.id) {
            allSubtopics.push({
              title: item.title,
              path: `${mainTopicPath}#${item.id}`,
              mainTopicTitle: guides.find(g => g.path === mainTopicPath)?.title || ''
            });
          }
        });
      } else if (sectionConfig.subKeyIsObjectKey && typeof sectionData === 'object') { // For object-based sections like cachepedia
        Object.keys(sectionData).forEach(key => {
          const item = sectionData[key];
          // Use item.title if subKeyNameFromObjectValue is set, otherwise use the key itself
          const title = sectionConfig.subKeyNameFromObjectValue && item[sectionConfig.subKeyNameFromObjectValue]
                        ? item[sectionConfig.subKeyNameFromObjectValue]
                        : key.replace(/\{\{|\}\}/g, ''); // Clean title from {{}}
          const id = slugify(key);
          allSubtopics.push({
            title: title,
            path: `${mainTopicPath}#${sectionConfig.pathId ? `${sectionConfig.pathId}-` : ''}${id}`,
            mainTopicTitle: guides.find(g => g.path === mainTopicPath)?.title || ''
          });
        });
      } else if (Array.isArray(sectionData) && sectionConfig.subKeyName) { // For array-based sections
        sectionData.forEach(item => {
          const title = item[sectionConfig.subKeyName];
          const id = item[sectionConfig.subKeyId] || slugify(title);
          if (title) {
            allSubtopics.push({
              title: title.replace(/\{\{|\}\}/g, ''), // Clean title
              path: `${mainTopicPath}#${sectionConfig.pathId ? `${sectionConfig.pathId}-` : ''}${id}`,
              mainTopicTitle: guides.find(g => g.path === mainTopicPath)?.title || ''
            });
          }
        });
      }
    });
    return allSubtopics;
  };

  const allDisplayableTopics = guides.map(guide => {
    const subtopics = processSubtopics(guide.path);
    return {
      ...guide,
      subtopics: subtopics.filter(st => st.title.toLowerCase().includes(searchTerm.toLowerCase())) // Filter subtopics by search term
    };
  }).filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.subtopics.length > 0 // Keep main topic if its subtopics match
  );


  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
          All Topics
        </Typography>
        <TextField
          fullWidth
          label="Search Topics & Descriptions"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Paper>

      <List>
        {allDisplayableTopics.map((topic) => (
          <ListItem key={topic.path} sx={{ display: 'block', mb: 1, py: 1.5, borderBottom: '1px solid var(--border-color, #eee)' }}>
            <RouterLink to={topic.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText
                primary={<Typography variant="h5" component="div" sx={{ color: 'text.primary', fontWeight: 500, mb: 0.5 }}>{topic.title}</Typography>}
                secondary={<Typography variant="body2" sx={{ color: 'text.secondary', mb: topic.subtopics.length > 0 ? 1 : 0 }}>{topic.description}</Typography>}
              />
            </RouterLink>
            {topic.subtopics.length > 0 && (
              <List disablePadding sx={{ pl: {xs: 2, sm: 4}, mt: 0.5 }}>
                {topic.subtopics.map((subTopic) => (
                  <ListItem key={subTopic.path} dense sx={{py: 0.25}}>
                     <RouterLink to={subTopic.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                       <ListItemText
                         primary={subTopic.title}
                         primaryTypographyProps={{variant: 'body2', sx: {'&:hover': {textDecoration: 'underline', color: 'primary.main'}}}}
                       />
                    </RouterLink>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
        <ListItem sx={{ display: 'block', mt: 2, py: 1.5, borderBottom: '1px solid var(--border-color, #eee)' }}>
          <RouterLink to="/glossary" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText
              primary={<Typography variant="h5" component="div" sx={{ color: 'text.primary', fontWeight: 500, mb: 0.5 }}>Glossary of Terms</Typography>}
              secondary={<Typography variant="body2" sx={{ color: 'text.secondary' }}>Find definitions for key system design terminology.</Typography>}
            />
          </RouterLink>
        </ListItem>
      </List>
    </Box>
  );
};

export default AllTopicsPage;
