// src/pages/GlossaryPage.jsx
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Link is not used
// import { topicsData } from '../data/topicsData'; // Not used directly for glossary terms
// import { cachesAppData } from '../data/cachesAppData'; // Individual appData not needed if glossaryData is separate
// import { databasesAppData } from '../data/databasesAppData';
// import { messagingQueuesAppData } from '../data/messagingQueuesAppData';
// import { loadBalancingAppData } from '../data/loadBalancingAppData';
// import { apiDesignAppData } from '../data/apiDesignAppData';
// import { scalabilityConceptsAppData } from '../data/scalabilityConceptsAppData';
// import { interviewApproachAppData } from '../data/interviewApproachAppData';
import { glossaryData as initialGlossaryTerms } from '../data/glossaryData'; // Import the new glossary data
import SearchInput from '../components/common/SearchInput';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from 'lucide-react'; // Import all lucide-react icons

// const allData = { // This can be removed if glossaryData.js is the sole source
//   ...cachesAppData,
//   ...databasesAppData,
//   ...messagingQueuesAppData,
//   ...loadBalancingAppData,
//   ...apiDesignAppData,
//   ...scalabilityConceptsAppData,
//   ...interviewApproachAppData,
// };

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);

  useEffect(() => {
    // Use initialGlossaryTerms directly
    // const terms = [];
    // Object.values(allData).forEach((topic) => { // This logic can be simplified
    //   if (topic.terminology) {
    //     terms.push(...topic.terminology);
    //   }
    // });
    // Instead, directly use initialGlossaryTerms if it's an array
    const terms = Array.isArray(initialGlossaryTerms) ? initialGlossaryTerms : [];


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
          {filteredTerms.map((term) => {
            const IconComponent = term.icon && Icons[term.icon] ? Icons[term.icon] : Icons['HelpCircle']; // Default icon
            return (
              <Card key={term.id || term.term} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <IconComponent className="inline-block w-5 h-5 mr-2 text-primary dark:text-primary-light" />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {term.term}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {term.definition}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-500 dark:text-neutral-400">
            {searchTerm ? "No terms found matching your search criteria." : "Loading terms..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
