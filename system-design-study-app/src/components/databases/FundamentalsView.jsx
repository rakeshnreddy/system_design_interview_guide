// src/components/databases/FundamentalsView.jsx
import React from 'react';
import Accordion from '../common/Accordion';
import Glossary from '../common/Glossary';

const FundamentalsView = ({ appData }) => {
  if (!appData) return null;

  return (
    <div>
      <h2>{appData.title}</h2>
      <p>{appData.description}</p>
      <Accordion title="Overview">
        <p>{appData.overview}</p>
      </Accordion>
      <h3>Terminology</h3>
      {appData.terminology.map((term, index) => (
        <Glossary key={index} term={term.term} definition={term.definition} />
      ))}
    </div>
  );
};

export default FundamentalsView;