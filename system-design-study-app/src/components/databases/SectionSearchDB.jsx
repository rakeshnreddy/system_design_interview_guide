// src/components/databases/SectionSearchDB.jsx
import React, { useState } from 'react';
import Card from '../../common/Card';

const AccordionItem = ({ title, children, idx, openIdx, setOpenIdx, lastItem }) => {
    const isOpen = idx === openIdx;
    return (
        <div className={`bg-neutral-50 dark:bg-neutral-700/50 ${lastItem ? 'rounded-b-lg' : ''} ${idx === 0 && !isOpen ? 'rounded-t-lg' : ''} ${isOpen && idx === 0 ? 'rounded-t-lg' : ''}`}>
            <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className={`w-full flex justify-between items-center p-4 font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600/50 transition-colors
                    ${isOpen ? 'bg-neutral-100 dark:bg-neutral-600/60' : ''}
                    ${idx === 0 ? 'rounded-t-lg' : ''}
                    ${isOpen && !lastItem ? '' : (lastItem && isOpen ? 'rounded-b-lg' : '')}
                    ${!isOpen && !lastItem ? 'border-b border-neutral-200 dark:border-neutral-600/70' : ''}
                    ${lastItem && !isOpen ? 'rounded-b-lg' : ''}
                `}
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className={`p-4 pt-2 text-sm text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-700/30 ${lastItem ? 'rounded-b-lg' : 'border-b border-neutral-200 dark:border-neutral-600/70'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

const SectionSearchDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Inverted Indexes Explained", content: "<p>The core of a search engine. An inverted index maps terms (words) to the documents that contain them. Example: <code>'apple' -> [doc1, doc5, doc10]</code>, <code>'banana' -> [doc2, doc5]</code>. This allows for very fast lookups of documents containing specific terms.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Be able to explain how an inverted index works at a high level and why it's efficient for text search.</p>" },
    { title: "Tokenization, Stemming, and Analysis", content: "<p><strong>Tokenization:</strong> Breaking text into individual terms (tokens).</p><p><strong>Stemming/Lemmatization:</strong> Reducing words to their root form (e.g., 'running' -> 'run'). Helps match queries with different word forms.</p><p><strong>Analysis:</strong> The overall process of converting text into indexed terms, including tokenization, stemming, stop word removal, lowercasing, etc.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Understand that raw text isn't just dumped into the index; it's processed through an analysis pipeline.</p>" },
    { title: "Relevance Scoring (TF-IDF, BM25)", content: "<p>Search engines rank results by relevance. Common algorithms include:</p><ul class='list-disc list-inside ml-4 my-2'><li><strong>TF-IDF (Term Frequency-Inverse Document Frequency):</strong> Scores documents based on how often a term appears in it (TF) and how rare that term is across all documents (IDF).</li><li><strong>Okapi BM25:</strong> A more modern probabilistic ranking function, often providing better results than TF-IDF.</li></ul><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> You don't need to know the formulas, but understand the concept of relevance scoring and factors that influence it (term frequency, document frequency, field length).</p>" },
    { title: "Faceted Search and Aggregations", content: "<p><strong>Faceted Search:</strong> Allows users to narrow down search results by filtering on specific attributes (facets), e.g., filtering e-commerce products by brand, price range, color.</p><p><strong>Aggregations:</strong> Summarizing data from search results, e.g., counting number of products in each category, average price.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss how search engines can provide these features efficiently, often using data structures built alongside the inverted index.</p>" }
  ];

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Search Engine Databases</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">Optimized for fast text search, relevance ranking, and complex analytical queries on textual data.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Search engine databases (or search indexes) are specialized databases optimized for full-text search and information retrieval. They use data structures like inverted indexes to quickly locate documents containing specific terms and rank them by relevance according to sophisticated algorithms.
        </p>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Key Characteristics:</h2>
        <ul>
          <li><strong>Inverted Indexes:</strong> Core data structure for extremely fast term lookups across vast amounts of text.</li>
          <li><strong>Full-Text Search:</strong> Advanced capabilities to search for terms within unstructured or semi-structured text, including phrase matching, wildcard searches, and proximity searches.</li>
          <li><strong>Relevance Ranking:</strong> Sophisticated algorithms (e.g., TF-IDF, Okapi BM25) to score and order search results by relevance to the query.</li>
          <li><strong>Analysis Pipeline:</strong> Robust text processing (tokenization, stemming, lemmatization, stop word removal, synonym handling) to prepare data for indexing and querying.</li>
          <li><strong>Scalability:</strong> Designed to scale horizontally to handle large volumes of data and high query loads.</li>
          <li><strong>Near Real-Time Indexing:</strong> Many can index new data very quickly, making it searchable shortly after ingestion.</li>
          <li><strong>Aggregations & Faceting:</strong> Powerful tools for summarizing data and enabling faceted navigation.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Common Use Cases:</h2>
        <ul>
          <li>Website Search (e.g., e-commerce product search, documentation search, blog search).</li>
          <li>Log Analytics and Monitoring (searching, analyzing, and visualizing large volumes of log data).</li>
          <li>Application Search (e.g., searching emails, documents, or any text-heavy content within an application).</li>
          <li>Data Exploration and Discovery, Business Intelligence.</li>
          <li>Geospatial search.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Popular Examples:</h2>
        <p>Elasticsearch, Apache Solr, OpenSearch, Meilisearch, Typesense, Algolia (SaaS).</p>
        <p><em>Note: While some document databases offer text search capabilities, dedicated search engines provide more advanced features, better performance, and superior relevance ranking for complex search workloads.</em></p>

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Search</h2>
      </div>

      <div className="mt-2 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-md">
        {deepDiveData.map((item, idx) => (
          <AccordionItem
            key={idx}
            idx={idx}
            title={item.title}
            openIdx={openAccordion}
            setOpenIdx={setOpenAccordion}
            lastItem={idx === deepDiveData.length - 1}
          >
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: item.content }}></div>
          </AccordionItem>
        ))}
      </div>
    </Card>
  );
};
export default SectionSearchDB;
