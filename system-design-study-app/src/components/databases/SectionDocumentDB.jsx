// src/components/databases/SectionDocumentDB.jsx
import React, { useState } from 'react';
import Card from '../common/Card';

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

const SectionDocumentDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Schema Flexibility & Evolution", content: "<p>Document DBs are schema-less or schema-on-read. Each document can have its own structure. This is great for evolving applications where data structures change frequently. You can add new fields without altering existing documents or performing costly schema migrations.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss benefits (fast iteration, handling diverse data) and drawbacks (potential for inconsistent data if not managed by application logic, more complex queries if structure varies wildly).</p>" },
    { title: "Querying JSON/BSON Structures", content: "<p>Querying involves matching fields within documents. Many document DBs support querying nested fields and arrays. Indexes can be created on any field, including those within nested documents or arrays, to speed up queries.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Compare querying in document DBs (e.g., MongoDB's query language) vs. SQL. Discuss when document model simplifies queries (related data in one doc) vs. when SQL might be better (complex joins across normalized tables).</p>" },
    { title: "Embedding vs. Referencing (Linking)", content: "<p><strong>Embedding (Denormalization):</strong> Storing related data directly within a parent document (e.g., product details and its reviews in one product document). Good for read performance if data is often accessed together.</p><p><strong>Referencing (Normalization):</strong> Storing related data in separate collections/documents and linking them using IDs (similar to foreign keys). Use when data is large, accessed independently, or updated frequently by different processes.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Discuss trade-offs: read performance vs. data redundancy/consistency, update complexity, document size limits.</p>" },
    { title: "Use Cases for Document Databases", content: "<p>Document DBs shine when data is naturally represented as a document or when schema flexibility is paramount.</p><ul class='list-disc list-inside ml-4 my-2'><li>Content Management Systems (CMS)</li><li>Product Catalogs (each product is a document)</li><li>User Profiles with varying attributes</li><li>Mobile application backends</li><li>Storing IoT sensor data (if each reading is a document)</li></ul>" }
  ];

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Document Databases</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">Flexible, JSON-like documents for intuitive data modeling and easy development.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Document databases store data in document-oriented structures, typically JSON, BSON (Binary JSON), or XML. Each document is self-contained and can have a complex, nested structure. This model aligns well with how developers think about objects in code, making development often more intuitive.
        </p>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Key Characteristics:</h2>
        <ul>
          <li><strong>Flexible Schema (Schema-on-Read):</strong> Each document can have its own unique structure. Fields can be easily added, modified, or removed without affecting other documents.</li>
          <li><strong>Rich Data Structures:</strong> Documents can contain nested objects, arrays, and various data types, making it easy to model complex, hierarchical entities.</li>
          <li><strong>Intuitive Data Model:</strong> Often maps directly to objects in application code (e.g., a user object becomes a user document), simplifying development and reducing impedance mismatch.</li>
          <li><strong>Querying:</strong> Supports querying based on document fields, including deeply nested structures and array elements. Many offer rich query languages and secondary indexing.</li>
          <li><strong>Scalability:</strong> Can be scaled horizontally through sharding, distributing documents across multiple servers. Typically AP in CAP.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Common Use Cases:</h2>
        <ul>
          <li>Content Management Systems (articles, blogs, pages with varied structures).</li>
          <li>E-commerce Product Catalogs (products with diverse and changing attributes).</li>
          <li>User Profiles & Personalization Data (each user document can have different fields).</li>
          <li>Mobile and Web Application Backends (rapid development, evolving requirements).</li>
          <li>Storing semi-structured data like logs, event data, or sensor readings if each reading forms a document.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Popular Examples:</h2>
        <p>MongoDB, Couchbase, Amazon DocumentDB, Elasticsearch (can also be used as a document store), Firebase Firestore.</p>

        <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mt-8 mb-3">Data Model Example (Conceptual JSON)</h3>
        {/* TODO: Implement a richer visual data model example, perhaps using styled divs or a JSON viewer component */}
        <div className="my-4 p-3 border rounded-md bg-neutral-100 dark:bg-neutral-800/60 shadow-sm">
          <pre className="font-mono text-xs text-neutral-600 dark:text-neutral-300 overflow-x-auto">
            {`// User Document
{
  "_id": "user123",
  "username": "jsmith",
  "email": "jsmith@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Smith",
    "avatarUrl": "..."
  },
  "orders": [
    { "orderId": "ord456", "total": 50.00, "items": [...] },
    { "orderId": "ord789", "total": 75.20, "items": [...] }
  ]
}`}
          </pre>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center">(Placeholder for a more visual representation of a JSON document structure)</p>
        </div>

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Document</h2>
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
export default SectionDocumentDB;
