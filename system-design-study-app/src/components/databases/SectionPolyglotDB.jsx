// src/components/databases/SectionPolyglotDB.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button'; // Import Button
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AccordionItem = ({ title, children, idx, openIdx, setOpenIdx, lastItem }) => {
    const isOpen = idx === openIdx;
    return (
        <div className={`bg-neutral-50 dark:bg-neutral-700/50 ${lastItem ? 'rounded-b-lg' : ''} ${idx === 0 && !isOpen ? 'rounded-t-lg' : ''} ${isOpen && idx === 0 ? 'rounded-t-lg' : ''}`}>
            <Button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                variant="outline"
                className={`w-full flex justify-between items-center p-4 font-semibold transition-colors
                    ${isOpen ? 'bg-neutral-100 dark:bg-neutral-600/60' : 'hover:bg-neutral-100 dark:hover:bg-neutral-600/50'}
                    ${idx === 0 ? 'rounded-t-lg' : ''}
                    ${isOpen && !lastItem ? '' : (lastItem && isOpen ? 'rounded-b-lg' : '')}
                    ${!isOpen && !lastItem ? 'border-b border-neutral-200 dark:border-neutral-600/70' : ''}
                    ${lastItem && !isOpen ? 'rounded-b-lg' : ''}
                    border-transparent text-neutral-700 dark:text-neutral-200`}
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                {isOpen ? <KeyboardArrowUpIcon className="h-5 w-5" /> : <KeyboardArrowDownIcon className="h-5 w-5" />}
            </Button>
            {isOpen && (
                <div className={`p-4 pt-2 text-sm text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-700/30 ${lastItem ? 'rounded-b-lg' : 'border-b border-neutral-200 dark:border-neutral-600/70'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

import { databasesAppData } from '../../data/databasesAppData.js';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

const SectionPolyglotDB = ({ appData }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const polyglotData = appData?.polyglotPersistence;

  if (!polyglotData) {
    return (
      <Card padding="p-6 md:p-8" shadow="shadow-xl">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Polyglot Persistence</h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">Data for this section is not available.</p>
      </Card>
    );
  }

  // Prepare deep dive data from challenges and benefits for the accordion
  const deepDiveData = [];
  if (polyglotData.benefits && polyglotData.benefits.length > 0) {
    deepDiveData.push({
      title: "Benefits of Polyglot Persistence",
      contentItems: polyglotData.benefits
    });
  }
  if (polyglotData.challenges && polyglotData.challenges.length > 0) {
    deepDiveData.push({
      title: "Challenges of Polyglot Persistence",
      contentItems: polyglotData.challenges
    });
  }
   // Adding a placeholder for Data Synchronization Strategies if needed, or it can be a direct section
   deepDiveData.push({
    title: "Data Synchronization Strategies (Conceptual)",
    contentItems: [
        "<strong>Event-Driven Architecture (EDA):</strong> Services publish events on data changes (e.g., via {{Kafka}} or {{RabbitMQ}}), promoting loose coupling and {{Eventual Consistency}}.",
        "<strong>Batch ETL/ELT Processes:</strong> Periodically extract, transform, and load data. Suitable for less time-sensitive data.",
        "<strong>Change Data Capture (CDC):</strong> Stream row-level changes from a source database to target systems.",
        "<strong>Application-Level Synchronization:</strong> Application code manages writes to multiple databases. Can be complex."
    ]
  });


  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">
        <RenderTextWithLinks text={polyglotData.title || "Polyglot Persistence"} glossaryData={glossaryData} />
      </h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
        <RenderTextWithLinks text={polyglotData.introduction || "Using multiple database technologies strategically."} glossaryData={glossaryData} />
      </p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {polyglotData.whyItMatters && (
          <>
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Why Polyglot Persistence?</h2>
            <p><RenderTextWithLinks text={polyglotData.whyItMatters} glossaryData={glossaryData} /></p>
          </>
        )}

        {polyglotData.example && (
          <div className="my-6">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">
                <RenderTextWithLinks text={polyglotData.example.title || "Example Scenario"} glossaryData={glossaryData} />
            </h2>
            <p className="mb-3"><RenderTextWithLinks text={polyglotData.example.description} glossaryData={glossaryData} /></p>
            <div className="space-y-3">
              {polyglotData.example.components.map((component, index) => (
                <div key={index} className="p-3 border rounded-md bg-neutral-50 dark:bg-neutral-800/50">
                  <h4 className="font-semibold text-neutral-700 dark:text-neutral-200">
                    <RenderTextWithLinks text={component.service} glossaryData={glossaryData} />
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    <strong>Database:</strong> <RenderTextWithLinks text={component.database} glossaryData={glossaryData} />
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <em>Reason: <RenderTextWithLinks text={component.reason} glossaryData={glossaryData} /></em>
                  </p>
                </div>
              ))}
            </div>
            {polyglotData.example.conclusion && <p className="mt-4 italic"><RenderTextWithLinks text={polyglotData.example.conclusion} glossaryData={glossaryData} /></p>}
          </div>
        )}

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Polyglot Systems</h2>
      </div>

      <div className="mt-2 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-md">
        {deepDiveData.map((item, idx) => (
          <AccordionItem
            key={idx}
            idx={idx}
            title={item.title} // This title is plain text
            openIdx={openAccordion}
            setOpenIdx={setOpenAccordion}
            lastItem={idx === deepDiveData.length - 1}
          >
            <ul className="list-disc list-inside ml-4 my-2 prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                {item.contentItems.map((content, cIdx) => (
                    <li key={cIdx}><RenderTextWithLinks text={content} glossaryData={glossaryData} /></li>
                ))}
            </ul>
          </AccordionItem>
        ))}
      </div>
    </Card>
  );
};

// This component now expects appData to be passed as a prop by DatabasesPage.jsx
export default SectionPolyglotDB;
