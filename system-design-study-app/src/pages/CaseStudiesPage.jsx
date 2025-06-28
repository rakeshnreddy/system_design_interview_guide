// src/pages/CaseStudiesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const caseStudies = [
  {
    id: 'design-twitter',
    title: 'Design Twitter',
    description: 'A deep dive into the architecture of a social media giant.',
  },
  {
    id: 'design-uber',
    title: 'Design Uber',
    description: 'Understanding the backend of a real-time ride-sharing service.',
  },
];

const CaseStudiesPage = () => {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">Case Studies</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-2">
          Explore our in-depth system design case studies.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <Card key={study.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <Typography variant="h6" component="div">
                {study.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {study.description}
              </Typography>
              <Link to={`/case-studies/${study.id}`}>Read More</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
