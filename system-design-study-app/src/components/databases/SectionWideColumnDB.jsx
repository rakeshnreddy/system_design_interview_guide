// src/components/databases/SectionWideColumnDB.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button'; // Import Button
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { databasesAppData } from '../../data/databasesAppData.js';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

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


const SectionWideColumnDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Understanding Column Families", content: "<p>Column families are the core concept. They are containers for rows. Each row can have a different set of columns within a column family, and columns can be added on the fly. Think of it as a map of maps: <code>RowKey -> ColumnFamily -> {ColumnName: Value, Timestamp: Timestamp}</code>.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Explain how column families help manage sparse data and allow for schema flexibility within a row.</p>" },
    { title: "Data Modeling: Keys and Timestamps", content: "<p><strong>Row Key:</strong> The primary identifier for a row, used for partitioning and sorting. Designing good row keys is crucial for performance and data distribution.</p><p><strong>Column Key/Name:</strong> Identifies a column within a column family.</p><p><strong>Timestamp:</strong> Wide-column stores version data by timestamp. This allows for retrieving historical versions of a cell's value and is fundamental for handling conflicts and time-series data.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss strategies for row key design (e.g., for time-series data, event data) and the importance of timestamps for versioning.</p>" },
    { title: "Read/Write Paths & LSM Trees", content: "<p>Many wide-column stores (like HBase, Cassandra) use Log-Structured Merge-trees (LSM Trees) for storage.</p><p><strong>Writes:</strong> Fast, as data is written to an in-memory table (memtable) and appended to a commit log. Memtables are flushed to disk as SSTables (Sorted String Tables).</p><p><strong>Reads:</strong> May need to check memtable and multiple SSTables. Bloom filters and compaction help optimize reads.</p><p><strong>Compaction:</strong> Background process that merges SSTables to remove deleted/old data and improve read performance.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Briefly explain LSM trees and how they contribute to high write throughput.</p>" },
    { title: "Consistency: Tunable (Eventual to Stronger)", content: "<p>Cassandra, for example, offers tunable consistency per operation (<code>ALL</code>, <code>QUORUM</code>, <code>ONE</code>, etc.). This allows balancing consistency needs with availability and latency.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Explain how tunable consistency works and when you might choose different consistency levels for reads vs. writes.</p>" }
  ];

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Wide-Column Stores</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">Scaling to massive datasets with flexible, versioned column structures, optimized for high write throughput.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Wide-column stores (also known as column-family databases) organize data into tables, rows, and columns, but with a key difference: column families. Rows are identified by a unique row key. Within each row, data is grouped into column families, and each column family can have multiple columns. Columns can be added to any row dynamically without affecting other rows, and data is typically timestamped for versioning.
        </p>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Key Characteristics:</h2>
        <ul>
          <li><strong>Schema Flexibility:</strong> Rows within the same table can have different columns. New columns can be added on the fly. Excellent for sparse data where many columns might be empty for certain rows.</li>
          <li><strong>Extreme Scalability:</strong> Designed for massive horizontal scalability across many servers, capable of handling petabytes of data and very high traffic.</li>
          <li><strong>High Write Throughput:</strong> Optimized for high write loads, often utilizing Log-Structured Merge-tree (LSM-tree) based storage engines.</li>
          <li><strong>Distributed & Decentralized:</strong> Often feature masterless or peer-to-peer architectures, enhancing fault tolerance and availability.</li>
          <li><strong>Tunable Consistency:</strong> Many (like Cassandra) offer adjustable consistency levels for read and write operations, allowing a balance between AP and CP aspects of the CAP theorem.</li>
          <li><strong>Versioning:</strong> Data is often timestamped, allowing for retrieval of historical versions of cell values.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Common Use Cases:</h2>
        <ul>
          <li>Time-series data (e.g., metrics, sensor data, event logs, user activity tracking).</li>
          <li>Big Data applications (e.g., storing results of MapReduce jobs, large-scale data processing).</li>
          <li>Real-time analytics on large datasets.</li>
          <li>Storing historical data or audit logs.</li>
          <li>Applications requiring extremely high write throughput and massive horizontal scale.</li>
          <li>Recommendation engines, personalization systems.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Popular Examples:</h2>
        <p>Apache Cassandra, Google Bigtable, Apache HBase, ScyllaDB.</p>

        {/* Case Studies Section */}
        {databasesAppData.databasepedia.find(db => db.id === 'cassandra')?.caseStudies && (
          <>
            <h2 className="text-3xl font-bold text-secondary dark:text-secondary-light mt-10 mb-4">Real-World Case Studies: Cassandra</h2>
            {databasesAppData.databasepedia.find(db => db.id === 'cassandra').caseStudies.map((study, index) => (
              <div key={index} className="mb-6 p-4 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-800/40">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2"><RenderTextWithLinks text={study.name} glossaryData={glossaryData} /></h3>
                <p className="mb-2"><RenderTextWithLinks text={study.description} glossaryData={glossaryData} /></p>
                {study.keyChoices && (
                  <>
                    <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mt-3 mb-1">Key Decision Factors:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {study.keyChoices.map((choice, cIndex) => (
                        <li key={cIndex}><RenderTextWithLinks text={choice} glossaryData={glossaryData} /></li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="mt-3 italic text-sm text-neutral-600 dark:text-neutral-400"><strong>Takeaway:</strong> <RenderTextWithLinks text={study.takeaway} glossaryData={glossaryData} /></p>
              </div>
            ))}
          </>
        )}

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Wide-Column</h2>
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
export default SectionWideColumnDB;
