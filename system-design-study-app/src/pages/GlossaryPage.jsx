// src/pages/GlossaryPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topicsData } from '../data/topicsData';
import { cachesAppData } from '../data/cachesAppData';
import { databasesAppData } from '../data/databasesAppData';
import { messagingQueuesAppData } from '../data/messagingQueuesAppData';
import { loadBalancingAppData } from '../data/loadBalancingAppData';
import { apiDesignAppData } from '../data/apiDesignAppData';
import { scalabilityConceptsAppData } from '../data/scalabilityConceptsAppData';
import { interviewApproachAppData } from '../data/interviewApproachAppData';
import SearchInput from '../components/common/SearchInput';
import { Card, CardContent, Typography } from '@mui/material';

const allData = {
  ...cachesAppData,
  ...databasesAppData,
  ...messagingQueuesAppData,
  ...loadBalancingAppData,
  ...apiDesignAppData,
  ...scalabilityConceptsAppData,
  ...interviewApproachAppData,
};

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);

  useEffect(() => {
    const terms = [];
    Object.values(allData).forEach((topic) => {
      if (topic.terminology) {
        terms.push(...topic.terminology);
      }
    });

    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = terms.filter((term) => {
      return (
        term.term.toLowerCase().includes(lowercasedFilter) ||
        term.definition.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredTerms(filtered);
  }, [searchTerm]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-white">Glossary</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-2">
          Search and explore all available terms.
        </p>
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by term or definition..."
        />
      </div>

      {filteredTerms.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term, index) => (
            <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <Typography variant="h6" component="div">
                  {term.term}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {term.definition}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-500 dark:text-neutral-400">No terms found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
