import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { glossaryData } from '../data/glossaryData.js';
import GlossaryTermDetail from '../components/glossary/GlossaryTermDetail';
import Modal from '../components/common/Modal';
import { setMetaTag, removeMetaTag } from '../utils/metaUtils.js';

const GlossaryPage = () => {
  const location = useLocation(); // Get location object
  const pageTitle = "System Design Glossary | System Design Interview Prep";
  const pageDescription = "Find definitions for key system design terminology. Search and filter terms related to scalability, databases, caching, and more.";
  const [filterText, setFilterText] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate processedTerms first as it's a dependency for the hash scrolling useEffect
  const processedTerms = useMemo(() => {
    const lowerCaseFilter = filterText.toLowerCase();

    const filteredTerms = filterText
      ? glossaryData.filter(term =>
          term.term.toLowerCase().includes(lowerCaseFilter) ||
          (term.definition && term.definition.toLowerCase().includes(lowerCaseFilter))
        )
      : glossaryData;

    const sortedTerms = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));

    return sortedTerms.reduce((acc, term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {});
  }, [glossaryData, filterText]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('search');
    if (searchTerm) {
      setFilterText(searchTerm);
    }

    // Meta tags effect
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
  }, [location.search, pageTitle, pageDescription]); // pageTitle and pageDescription are stable but included for completeness

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove #
      setTimeout(() => { // setTimeout to allow DOM to render/update
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optional: Add some visual indication like a temporary highlight
          element.classList.add('highlight-term');
          setTimeout(() => element.classList.remove('highlight-term'), 2000);
        }
      }, 100); // Adjust delay if necessary
    }
  }, [location.hash, processedTerms]); // Rerun if hash changes or processedTerms finishes loading

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleTermClick = (term) => {
    setSelectedTerm(term);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTerm(null); // Clear selected term on close
  };

  const getDefinitionSnippet = (definition) => {
    if (!definition) return '';
    const firstSentence = definition.split('.')[0];
    return `${firstSentence}.`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Glossary</h1>

      <div className="mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search terms..."
          value={filterText}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {Object.keys(processedTerms).length === 0 && filterText && (
         <p className="text-center text-gray-500">No terms match your search for "{filterText}".</p>
      )}

      {Object.keys(processedTerms).length === 0 && !filterText && glossaryData.length > 0 && (
         <p className="text-center text-gray-500">No terms found.</p>
      )}

      {Object.keys(processedTerms).length === 0 && !filterText && glossaryData.length === 0 && (
         <p className="text-center text-gray-500">Loading terms or glossary is empty...</p>
      )}

      {Object.keys(processedTerms).length > 0 && (
        Object.entries(processedTerms).map(([letter, terms]) => (
          <div key={letter} className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600 border-b pb-2">{letter}</h2>
            <dl>
              {terms.map((term) => (
                <div id={`term-${encodeURIComponent(term.term)}`} key={term.term} className="mb-3 p-3 hover:bg-gray-50 rounded-md">
                  <dt
                    className="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-700"
                    onClick={() => handleTermClick(term)}
                  >
                    {term.term}
                  </dt>
                  <dd className="text-gray-600 ml-4">
                    {getDefinitionSnippet(term.definition)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))
      )}

      {selectedTerm && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedTerm.term}
          size="xl" // Using a larger size for glossary details
        >
          <GlossaryTermDetail term={selectedTerm} />
        </Modal>
      )}
    </div>
  );
};

export default GlossaryPage;
