// src/components/caches/PatternsView.jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button'; // For tab controls
import MermaidDiagram from '../common/MermaidDiagram'; // Import MermaidDiagram
import EvictionSimulator from './EvictionSimulator'; // Import the simulator

const PatternsView = ({ appData }) => {
  const [activeTab, setActiveTab] = useState('writePatterns'); // 'writePatterns' or 'evictionPolicies'

  if (!appData || (!appData.writePatterns && !appData.evictionPolicies)) {
    return <p className="p-4 text-neutral-600 dark:text-neutral-400">Loading patterns and policies data...</p>;
  }

  const renderContent = () => {
    if (activeTab === 'writePatterns') {
      if (!appData.writePatterns || appData.writePatterns.length === 0) {
        return <p className="text-neutral-500 dark:text-neutral-400 py-4">No write pattern data available.</p>;
      }
      return (
        <div className="space-y-6 pt-4">
          {appData.writePatterns.map(pattern => {
            const patternId = pattern.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return (
              <Card key={pattern.name} id={patternId} className="shadow-lg" padding="p-6">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{pattern.name}</h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">{pattern.description}</p>
                {pattern.pros && (
                <div className="mb-2">
                  <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">Pros:</h4>
                  <ul className="list-disc list-inside text-base text-neutral-600 dark:text-neutral-400 space-y-1 mt-1">
                    {pattern.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                  </ul>
                </div>
              )}
              {pattern.cons && (
                <div>
                  <h4 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">Cons:</h4>
                  <ul className="list-disc list-inside text-base text-neutral-600 dark:text-neutral-400 space-y-1 mt-1">
                    {pattern.cons.map((con, i) => <li key={i}>{con}</li>)}
                  </ul>
                </div>
              )}
              {pattern.diagram && (
                <MermaidDiagram
                  diagramDefinition={pattern.diagram}
                  diagramId={`${pattern.name.toLowerCase().replace(/\s+/g, '-')}-diagram`}
                />
              )}
            </Card>
            );
          })}

          {/* Section for Cache Strategy Diagrams */}
          {appData.mermaidDiagrams && (
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 space-y-6">
              <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                Common Caching Strategy Flows
              </h2>

              <Card className="shadow-lg" padding="p-6">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Cache-Aside Flow</h3>
                {appData.mermaidDiagrams.cacheAside && (
                  <MermaidDiagram
                    diagramDefinition={appData.mermaidDiagrams.cacheAside}
                    diagramId="cache-aside-flow-diagram"
                  />
                )}
              </Card>

              <Card className="shadow-lg" padding="p-6">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Write-Through Flow</h3>
                {appData.mermaidDiagrams.writeThrough && (
                  <MermaidDiagram
                    diagramDefinition={appData.mermaidDiagrams.writeThrough}
                    diagramId="write-through-flow-diagram"
                  />
                )}
              </Card>

              <Card className="shadow-lg" padding="p-6">
                <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Write-Back Flow</h3>
                {appData.mermaidDiagrams.writeBack && (
                  <MermaidDiagram
                    diagramDefinition={appData.mermaidDiagrams.writeBack}
                    diagramId="write-back-flow-diagram"
                  />
                )}
              </Card>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'evictionPolicies') {
      if (!appData.evictionPolicies || appData.evictionPolicies.length === 0) {
        return <p className="text-neutral-500 dark:text-neutral-400 py-4">No eviction policy data available.</p>;
      }
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {appData.evictionPolicies.map(policy => (
              <Card key={policy.name} className="shadow-md" padding="p-6">
                <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-2">{policy.name}</h3>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">{policy.description}</p>
                {policy.useWhen && <p className="text-sm italic text-neutral-500 dark:text-neutral-400 mt-3"><strong>Best for:</strong> {policy.useWhen}</p>}
              </Card>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              Try it: Eviction Policy Simulator
            </h2>
            <EvictionSimulator />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="p-1 md:p-4 space-y-6">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Cache Patterns &amp; Policies
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Explore various strategies for writing data to caches (Write Patterns) and different algorithms for removing data when the cache reaches its capacity (Eviction Policies). Understanding these is key to optimizing cache performance and behavior.
        </p>
      </div>

      <Card padding="p-0 sm:p-0"> {/* Remove Card padding if tabs handle it */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-4">
          <Button
            variant={activeTab === 'writePatterns' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('writePatterns')}
            className={`mr-2 rounded-b-none ${activeTab === 'writePatterns' ? '' : 'border-transparent'}`}
            size="md"
          >
            Write Patterns
          </Button>
          <Button
            variant={activeTab === 'evictionPolicies' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('evictionPolicies')}
            className={`rounded-b-none ${activeTab === 'evictionPolicies' ? '' : 'border-transparent'}`}
            size="md"
          >
            Eviction Policies
          </Button>
        </div>
        {renderContent()}
      </Card>
       {/* Reminder about typography plugin */}
      {/* <Card><p className="text-xs text-warning">Note: For optimal text rendering, the @tailwindcss/typography plugin should be installed and configured.</p></Card> */}

      <Card padding="p-6" className="mt-8"> {/* Added mt-8 for spacing */}
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Cache Invalidation Strategies</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Time-To-Live (TTL)</h3>
            <p>
              Each cache entry is assigned a specific duration after which it automatically expires and is removed from the cache.
              Simple to implement but can lead to stale data if the TTL is too long, or frequent origin fetches if too short.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Active Polling / Write-Through Invalidation</h3>
            <p>
              The application or cache service actively checks the origin data store for changes at regular intervals.
              Alternatively, with write-through, writes to the origin also update/invalidate the cache immediately. This ensures better consistency.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Event-Based Invalidation</h3>
            <p>
              The origin data store or a messaging system emits events when data changes. Cache services subscribe to these events
              and invalidate relevant entries. This can be complex to set up but offers near real-time consistency.
            </p>
          </div>
          {/* TODO: Add flowchart diagram for cache invalidation strategies */}
        </div>
      </Card>

      <Card padding="p-6" className="mt-8">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Error Handling & Resilience</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Circuit Breakers</h3>
            <p>
              When fetching data for the cache from an origin service, implement a circuit breaker pattern.
              If the origin service fails repeatedly, the circuit breaker "opens" and subsequent requests fail fast (or return stale data if configured),
              preventing the application from overwhelming a struggling origin service.
            </p>
            {/* TODO: Add diagram for circuit breaker pattern */}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Fallback Mechanisms</h3>
            <p>
              If the cache itself fails or a cache miss occurs and the origin is also unavailable, have fallback strategies.
              This could involve serving stale data (if acceptable), returning default values, or gracefully degrading functionality.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatternsView;
