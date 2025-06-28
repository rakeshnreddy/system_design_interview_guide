// src/pages/CaseStudyDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const caseStudies = {
  'design-twitter': {
    title: 'Design Twitter',
    content: 'This is a deep dive into the architecture of Twitter...',
  },
  'design-uber': {
    title: 'Design Uber',
    content: 'This is a deep dive into the architecture of Uber...',
  },
};

const CaseStudyDetailPage = () => {
  const { caseStudyId } = useParams();
  const study = caseStudies[caseStudyId];

  if (!study) {
    return <div>Case study not found</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Typography variant="h4">{study.title}</Typography>
      <Typography variant="body1">{study.content}</Typography>
    </div>
  );
};

export default CaseStudyDetailPage;
