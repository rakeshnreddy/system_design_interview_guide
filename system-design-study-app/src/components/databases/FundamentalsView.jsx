// src/components/databases/FundamentalsView.jsx
import React from 'react';
import Accordion from '../common/Accordion';
import Glossary from '../common/Glossary';
import Mermaid from '../common/Mermaid'; // Import Mermaid
import { databasesAppData } from '../../data/databasesAppData'; // Import appData

const FundamentalsView = ({ appData }) => {
  if (!appData) return null;
  const { mermaidDiagrams } = databasesAppData; // Destructure mermaidDiagrams for convenience

  return (
    <div>
      <h2>{appData.title}</h2>
      <p>{appData.description}</p>
      <Accordion title="Overview">
        <p>{appData.overview}</p>
      </Accordion>
      <h3>Terminology</h3>
      {appData.terminology.map((term, index) => (
        <div key={index}>
          <Glossary term={term.title} definition={term.description} />
          {term.id === 'sharding' && mermaidDiagrams && mermaidDiagrams.consistentHashing && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <Mermaid chart={mermaidDiagrams.consistentHashing} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FundamentalsView;