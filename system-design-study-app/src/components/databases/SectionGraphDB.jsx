// src/components/databases/SectionGraphDB.jsx
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

const SectionGraphDB = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const deepDiveData = [
    { title: "Property Graph Model vs. RDF Triples", content: "<p><strong>Property Graph Model:</strong> Nodes (vertices) and Relationships (edges) are the core elements. Both nodes and relationships can have properties (key-value pairs). Relationships are directed and have labels. (e.g., Neo4j, Amazon Neptune).</p><p><strong>RDF (Resource Description Framework) Triples:</strong> Data is represented as Subject-Predicate-Object triples. (e.g., <code>(Alice, knows, Bob)</code>). Used in Semantic Web technologies. (e.g., Apache Jena, Virtuoso).</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Understand the basics of property graphs as they are more common in many application development scenarios. RDF is more specialized.</p>" },
    { title: "Graph Traversal (Depth-First, Breadth-First)", content: "<p>Graph traversals are fundamental for querying. Common algorithms include:</p><ul class='list-disc list-inside ml-4 my-2'><li><strong>Depth-First Search (DFS):</strong> Explores as far as possible along each branch before backtracking.</li><li><strong>Breadth-First Search (BFS):</strong> Explores neighbors first before moving to the next level neighbors. Good for finding shortest paths.</li></ul><p>Graph query languages like Cypher (Neo4j) or Gremlin (Apache TinkerPop) provide high-level syntax for complex traversals.</p><p class='mt-2 italic text-sm'><strong>Interview Angle:</strong> Conceptual understanding of traversals and why they are important for graph queries (e.g., finding friends of friends, pathfinding).</p>" },
    { title: "Use Cases for Graph Databases", content: "<p>Graph DBs excel when relationships and connections between data are as important as the data itself.</p><ul class='list-disc list-inside ml-4 my-2'><li>Social Networks (friendship relationships, connections)</li><li>Recommendation Engines (user-item interactions, collaborative filtering)</li><li>Fraud Detection (identifying patterns and connections between seemingly unrelated entities)</li><li>Knowledge Graphs (organizing and querying complex, interconnected information)</li><li>Network and IT Operations (modeling dependencies in infrastructure)</li><li>Identity and Access Management</li></ul>" },
    { title: "Challenges with Graph Databases", content: "<p><strong>Scalability:</strong> Distributed graph processing can be complex, especially for traversals that span multiple nodes (supernode problem, sharding challenges). Some graph DBs are better at distributed operation than others.</p><p><strong>Query Language Learning Curve:</strong> Graph query languages (Cypher, Gremlin, SPARQL) are different from SQL and have their own learning curve.</p><p><strong>Data Modeling:</strong> Thinking in terms of graphs (nodes, relationships, properties) requires a different mindset than relational modeling.</p>" }
  ];

  return (
    <Card padding="p-6 md:p-8" shadow="shadow-xl">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">Graph Databases</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">Mastering relationships and connections in data, ideal for social networks and recommendation engines.</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Graph databases are designed to store, query, and manage data with complex relationships. They use graph structures (nodes, edges, and properties) to represent and store data. Unlike relational databases that use tables, graph databases make relationships first-class citizens, allowing for efficient traversal and analysis of connections.
        </p>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Key Characteristics:</h2>
        <ul>
          <li><strong>Nodes (Vertices):</strong> Represent entities (e.g., people, products, accounts, locations).</li>
          <li><strong>Relationships (Edges):</strong> Represent connections between nodes. Relationships are directed, have types (labels), and can have properties.</li>
          <li><strong>Properties:</strong> Key-value pairs that can be stored on both nodes and relationships, adding rich context.</li>
          <li><strong>Optimized for Traversals:</strong> Highly efficient for querying and traversing relationships between nodes (e.g., "find friends of friends," "shortest path between A and B," "detect circular dependencies").</li>
          <li><strong>Schema Flexibility:</strong> Properties on nodes and relationships can vary, allowing for evolving data models.</li>
          <li><strong>Often CP in CAP:</strong> Many graph databases prioritize consistency, especially for transactional graph operations ensuring data integrity within the graph.</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Common Use Cases:</h2>
        <ul>
          <li>Social Networks (modeling users and their connections, interactions, and groups).</li>
          <li>Recommendation Engines (finding related items, users, or content based on connections).</li>
          <li>Fraud Detection (identifying complex patterns and rings of fraudulent activity).</li>
          <li>Knowledge Graphs (representing interconnected information for Q&A, semantic search).</li>
          <li>Network and IT Infrastructure Monitoring (modeling dependencies and impact analysis).</li>
          <li>Supply Chain Management & Logistics (tracking relationships between entities).</li>
          <li>Identity and Access Management (modeling users, roles, permissions, and resources).</li>
        </ul>

        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-8 mb-4">Popular Examples:</h2>
        <p>Neo4j, Amazon Neptune, ArangoDB (multi-model), JanusGraph, TigerGraph, Memgraph.</p>

        <h2 className="text-3xl font-bold text-primary dark:text-primary-light mt-10 mb-4">E5 Interview Deep Dive: Graph</h2>
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
export default SectionGraphDB;
