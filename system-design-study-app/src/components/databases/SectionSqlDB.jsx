// src/components/databases/SectionSqlDB.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing';
import { glossaryData } from '../../../data/glossaryData';
import { Typography } from '@mui/material'; // For fallback

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts, component = "span" }) => {
  if (typeof textParts === 'string') {
    return React.createElement(component, null, textParts);
  }
  if (!Array.isArray(textParts)) {
    return null;
  }
  const elements = textParts.map((part, index) => {
    if (part.type === 'link') {
      return (
        <RouterLink
          key={`${part.displayText}-${index}`}
          to={`/glossary?search=${encodeURIComponent(part.term.term)}`}
          className="glossary-link text-blue-600 hover:text-blue-800 hover:underline"
          title={getDefinitionSnippet(part.term.definition)}
        >
          {part.displayText}
        </RouterLink>
      );
    }
    return <React.Fragment key={`text-${index}`}>{part.content}</React.Fragment>;
  });
  return React.createElement(component, null, ...elements);
};

// Function to replace {{Term}} with HTML links for dangerouslySetInnerHTML
const replaceTermsWithHtmlLinks = (htmlString, termsData) => {
  if (!htmlString || typeof htmlString !== 'string') return '';
  return htmlString.replace(/\{\{([^}]+)\}\}/g, (match, termName) => {
    const termNameTrimmed = termName.trim();
    let matchedTerm = null;
    for (const term of termsData) {
      if (term.id === termNameTrimmed.toLowerCase() ||
          term.term.toLowerCase() === termNameTrimmed.toLowerCase() ||
          term.term.toLowerCase().startsWith(termNameTrimmed.toLowerCase() + " (")) {
        matchedTerm = term;
        break;
      }
      const mainPartOfTerm = term.term.split('(')[0].trim().toLowerCase();
      if (mainPartOfTerm === termNameTrimmed.toLowerCase()) {
        matchedTerm = term;
        break;
      }
    }
    if (matchedTerm) {
      const linkPath = `/glossary?search=${encodeURIComponent(matchedTerm.term)}`;
      const linkTitle = getDefinitionSnippet(matchedTerm.definition);
      return `<a href="${linkPath}" class="glossary-link text-blue-600 hover:text-blue-800 hover:underline" title="${linkTitle}">${termNameTrimmed}</a>`;
    }
    return match; // Return original {{TermName}} if no match
  });
};


const AccordionItem = ({ title, children, idx, openIdx, setOpenIdx, lastItem }) => {
    const isOpen = idx === openIdx;
    return (
        <div className={`bg-neutral-50 dark:bg-neutral-700/50 ${lastItem ? 'rounded-b-lg' : ''} ${idx === 0 && !isOpen ? 'rounded-t-lg' : ''} ${isOpen && idx === 0 ? 'rounded-t-lg' : ''}`}>
            <Button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                variant="outline"
                className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-colors
                    ${isOpen ? 'bg-neutral-100 dark:bg-neutral-600/60' : 'hover:bg-neutral-100 dark:hover:bg-neutral-600/50'}
                    ${idx === 0 ? 'rounded-t-lg' : ''}
                    ${isOpen && !lastItem ? '' : (lastItem && isOpen ? 'rounded-b-lg' : '')}
                    ${!isOpen && !lastItem ? 'border-b border-neutral-300 dark:border-neutral-600' : ''}
                    ${lastItem && !isOpen ? 'rounded-b-lg' : ''}
                    border-transparent text-neutral-700 dark:text-neutral-200`}
                aria-expanded={isOpen}
            >
                <span className="text-lg">{title}</span>
                {isOpen ? <KeyboardArrowUpIcon className="h-5 w-5" /> : <KeyboardArrowDownIcon className="h-5 w-5" />}
            </Button>
            {isOpen && (
                <div className={`p-5 text-base text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-700/30 ${lastItem ? 'rounded-b-lg' : 'border-b border-neutral-300 dark:border-neutral-600'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

const SectionSqlDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Normalization vs. Denormalization", content: "<p><strong>Normalization:</strong> Process of organizing data to minimize redundancy (e.g., 1NF, 2NF, 3NF, BCNF). Leads to more tables, complex joins, but better data integrity and less update anomalies. See {{Sharding}} for related scaling. </p><p><strong>Denormalization:</strong> Intentionally introducing redundancy by adding copies of data or grouping data to optimize read performance. Reduces join complexity, faster reads, but can lead to update anomalies and data inconsistency if not managed.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss when to normalize (OLTP, data integrity critical) vs. denormalize (OLAP, read-heavy workloads, performance critical).</p>" },
    { title: "Indexing Strategies (B-Trees, B+Trees)", content: "<p><strong>Indexes:</strong> Data structures that improve query speed. Most {{SQL}} DBs use B-Trees or B+Trees.</p><p><strong>B-Tree:</strong> Balanced tree structure, data can be stored in internal nodes and leaf nodes. Good for point lookups and range queries.</p><p><strong>B+Tree:</strong> Variation where all data is stored in leaf nodes, linked sequentially. Internal nodes only store keys for routing. Optimized for range queries and full table scans due to leaf node linking.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Explain how indexes speed up queries, trade-offs (slower writes/updates), clustered vs. non-clustered indexes, covering indexes.</p>" },
    { title: "ACID Properties & Transactions", content: "<p><strong>ACID:</strong> {{Atomicity}}, {{Consistency}}, {{Isolation}}, {{Durability}}.</p><ul class='list-disc list-inside ml-4 my-2'><li><strong>Atomicity:</strong> All parts of a transaction complete, or none do (all-or-nothing).</li><li><strong>Consistency:</strong> Transaction brings DB from one valid state to another.</li><li><strong>Isolation:</strong> Concurrent transactions don't interfere (e.g., via locking, MVCC). Explain isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable).</li><li><strong>Durability:</strong> Once a transaction is committed, it persists even if system fails (e.g., via WAL).</li></ul><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Be ready to define each, explain their importance, and discuss how databases achieve them (e.g., write-ahead logging for Durability, two-phase locking for Isolation).</p>" },
    { title: "SQL Joins (Inner, Outer, Self, Cross)", content: "<p>Explain different types of SQL JOINs: INNER JOIN (matching rows), LEFT/RIGHT OUTER JOIN (all rows from one table, matching from other), FULL OUTER JOIN (all rows from both), CROSS JOIN (Cartesian product), SELF JOIN (joining a table to itself). This is fundamental to {{SQL (Structured Query Language)}}.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Provide use cases for each, and be able to write simple queries using them. Discuss performance implications.</p>"},
    { title: "Query Optimization & Execution Plans", content: "<p>Databases use a query optimizer to find the most efficient way to execute a {{SQL}} query. It generates an execution plan (or query plan).</p><p>Factors considered: available indexes, table statistics, join algorithms (hash join, merge join, nested loop join).</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Explain `EXPLAIN` or `EXPLAIN ANALYZE` commands. Discuss how to identify bottlenecks in a query plan (e.g., full table scans where an {{Database Index}} could be used).</p>"}
  ].map(item => ({ ...item, content: replaceTermsWithHtmlLinks(item.content, glossaryData) }));

  const textContent = {
    intro: "Relational databases, typically using {{SQL (Structured Query Language)}}, have been the dominant model for decades. They organize data into tables (relations) with predefined schemas (columns and data types). Relationships between tables are established using foreign keys, ensuring data integrity and enabling powerful relational queries.",
    characteristics: [
      "<strong>Schema-on-Write:</strong> Structure is defined before data is inserted. Enforces data integrity and consistency.",
      "<strong>{{ACID Properties}} Transactions:</strong> Guarantee reliability for operations (Atomicity, Consistency, Isolation, Durability). Essential for critical data.",
      "<strong>Strong Consistency (typically CP in {{CAP Theorem}}):</strong> Data is immediately consistent across the system after an update, ensuring all reads get the latest data.",
      "<strong>Normalization:</strong> Data is organized to reduce redundancy and improve data integrity through multiple related tables.",
      "<strong>Mature Technology:</strong> Well-understood, robust, with a vast ecosystem of tools, libraries, and expertise. Powerful {{SQL}} for complex queries and joins."
    ],
    useCases: [
      "Financial Systems (banks, trading platforms, accounting)",
      "E-commerce Order Management & Inventory. Often involves {{Database Transaction}} integrity.",
      "Enterprise Resource Planning (ERP) & Customer Relationship Management (CRM) Systems",
      "Applications requiring complex queries, joins, and strong guarantees for data integrity and consistency.",
      "Master Data Management."
    ],
    examples: "PostgreSQL, MySQL, Oracle Database, Microsoft SQL Server, MariaDB, SQLite (for embedded use). Many support {{Replication}}.",
    indexingStrategies: [
      "<strong>B-Tree/B+Tree Indexes:</strong> Most common general-purpose indexes, good for equality and range queries. Efficiently handles ordered data.",
      "<strong>Hash Indexes:</strong> Best for equality lookups (exact matches). Not suitable for range queries. Typically used for specific scenarios by some engines.",
      "<strong>LSM-Tree Based Indexes:</strong> (Log-Structured Merge-Tree) Used in some modern {{SQL}} databases influenced by {{NoSQL}} designs, optimized for high write throughput. Data is written sequentially and merged/compacted in the background.",
      "<strong>Full-Text Indexes:</strong> Specialized indexes for searching text content within columns, using techniques like tokenization and inverted indexes.",
      "<strong>Clustered Indexes:</strong> The physical order of data on disk matches the index order. A table can have only one clustered index.",
      "<strong>Non-Clustered Indexes:</strong> Index structure is separate from data rows; index entries point to data rows.",
      "<strong>Covering Indexes:</strong> An index that includes all the columns needed to satisfy a query, avoiding a table lookup."
    ]
  };


  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Relational Databases (SQL)</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
        <RenderProcessedText textParts={parseTextForGlossaryLinks("The bedrock of many applications, offering structure, {{Consistency}}, and powerful querying capabilities.", glossaryData)} />
      </p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          <RenderProcessedText textParts={parseTextForGlossaryLinks(textContent.intro, glossaryData)} />
        </p>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Key Characteristics:</h2>
        <ul>
          {textContent.characteristics.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: replaceTermsWithHtmlLinks(item, glossaryData) }}></li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Common Use Cases:</h2>
        <ul>
          {textContent.useCases.map((item, index) => (
             <li key={index}><RenderProcessedText textParts={parseTextForGlossaryLinks(item, glossaryData)} /></li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Popular Examples:</h2>
        <p><RenderProcessedText textParts={parseTextForGlossaryLinks(textContent.examples, glossaryData)} /></p>

        <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mt-8 mb-3">Common Indexing Strategies:</h3>
        <ul className="list-disc pl-5 space-y-1">
           {textContent.indexingStrategies.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: replaceTermsWithHtmlLinks(item, glossaryData) }}></li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mt-8 mb-3">Data Model Example (Conceptual)</h3>
        <div className="my-4 p-3 border rounded-md bg-neutral-100 dark:bg-neutral-800/60 shadow-sm text-center">
            <p className="font-mono text-sm text-neutral-600 dark:text-neutral-300">
                -- Users Table --<br/>
                UserID (PK), Username, Email, CreatedAt<br/>
                -- Posts Table --<br/>
                PostID (PK), UserID (FK), Title, Content, CreatedAt
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">(Placeholder for a more visual representation of relational tables and foreign key relationships)</p>
        </div>

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: SQL</h2>
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
            <div
              data-testid={`accordion-content-${idx}`}
              className="prose prose-sm sm:prose-base max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: item.content }} // content is already processed by replaceTermsWithHtmlLinks
            ></div>
          </AccordionItem>
        ))}
      </div>
    </Card>
  );
};
export default SectionSqlDB;
