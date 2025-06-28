// src/components/caches/FundamentalsView.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing'; // Adjusted path
import { glossaryData } from '../../../data/glossaryData'; // Adjusted path

const RenderProcessedText = ({ textParts }) => {
  return (
    <>
      {textParts.map((part, index) => {
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
      })}
    </>
  );
};


const FundamentalsView = ({ appData }) => {
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  if (!appData) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">Loading fundamentals data...</p>
      </div>
    );
  }

  const openMetricModal = (metric) => {
    setSelectedMetric(metric);
    setIsMetricModalOpen(true);
  };

  const introText = "An introduction to core caching concepts, terminology, and key performance metrics. Use this as a foundation for understanding more advanced caching strategies and patterns. For example, learn about {{Cache Hit}} and {{Cache Miss}} rates, or delve into {{CDN}} usage.";
  const additionalMetricsIntro = "Beyond common metrics like {{Hit Rate}} and {{Latency}}, also consider these for a full picture of cache health:";
  const additionalMetricsList = [
    "<strong>Eviction Rate:</strong> The rate at which items are being removed from the cache due to space limitations or {{TTL}} expiry. High eviction rates might indicate an undersized cache or overly aggressive TTLs.",
    "<strong>Cache CPU/Memory Usage:</strong> Monitoring the resource consumption of cache nodes/processes helps identify performance bottlenecks or resource exhaustion.",
    "<strong>Network Throughput:</strong> For {{Distributed Caches}}, network bandwidth can become a limiting factor for cache performance.",
    "<strong>Number of Cache Items:</strong> Tracking the total number of items in the cache can help understand if the cache is being fully utilized or growing unexpectedly, which might affect memory.",
    "<strong>Error Rates:</strong> Errors connecting to the cache, or errors during cache operations (e.g., serialization issues, timeouts). High error rates point to instability."
  ];


  return (
    <div className="space-y-8 p-1">
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Caching Fundamentals
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <RenderProcessedText textParts={parseTextForGlossaryLinks(introText, glossaryData)} />
        </p>
      </div>

      <div id="metrics-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {!appData.metrics || appData.metrics.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 col-span-full text-center py-4">No metrics data available.</p>
        ) : (
          appData.metrics.map(metric => (
            <Card
              key={metric.id}
              className="hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-200 ease-in-out flex flex-col"
              onClick={() => openMetricModal(metric)}
              padding="p-4"
            >
              <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">{metric.name}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 flex-grow">
                <RenderProcessedText textParts={parseTextForGlossaryLinks(metric.description, glossaryData)} />
              </p>
              {metric.talk && (
                <p className="text-xs text-accent-dark bg-accent-light/30 dark:text-accent-light dark:bg-accent-dark/40 rounded-full px-2 py-1 mt-3 inline-block italic">
                  "<RenderProcessedText textParts={parseTextForGlossaryLinks(metric.talk, glossaryData)} />"
                </p>
              )}
            </Card>
          ))
        )}
      </div>

      <Card>
        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Core Terminology</h2>
          <dl id="terminology-list" className="space-y-4">
            {!appData.terminology || appData.terminology.length === 0 ? (
              <p className="text-neutral-500 dark:text-neutral-400">No terminology data available.</p>
            ) : (
              appData.terminology.map(item => (
                <div key={item.term}>
                  <dt className="font-semibold text-xl text-neutral-700 dark:text-neutral-200">{item.term}</dt>
                  <dd className="text-base text-neutral-600 dark:text-neutral-300 mt-1 ml-2">
                    <RenderProcessedText textParts={parseTextForGlossaryLinks(item.definition, glossaryData)} />
                  </dd>
                </div>
              ))
            )}
          </dl>
        </div>
      </Card>

      <Card padding="p-6">
        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
             <RenderProcessedText textParts={parseTextForGlossaryLinks(additionalMetricsIntro, glossaryData)} />
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <ul className="list-disc space-y-2 pl-5">
              {additionalMetricsList.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item.replace(/\{\{([^}]+)\}\}/g, (match, termName) => {
                  const parsed = parseTextForGlossaryLinks(match, glossaryData);
                  if (parsed.length === 1 && parsed[0].type === 'link') {
                    // This is a simplified way for dangerouslySetInnerHTML, not ideal as it bypasses React for the link itself.
                    // A proper solution would be to parse each li content with RenderProcessedText.
                    // For now, let's make the link manually for HTML context.
                    const linkPath = `/glossary?search=${encodeURIComponent(parsed[0].term.term)}`;
                    const linkTitle = getDefinitionSnippet(parsed[0].term.definition);
                    return `<a href="${linkPath}" class="glossary-link text-blue-600 hover:text-blue-800 hover:underline" title="${linkTitle}">${parsed[0].displayText}</a>`;
                  }
                  return match; // Return original match if not found or not a simple link part
                })}}></li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {selectedMetric && selectedMetric.deepDive && (
        <Modal
            isOpen={isMetricModalOpen}
            onClose={() => setIsMetricModalOpen(false)}
            title=""
            size="xl"
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1 prose max-w-none dark:prose-invert">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">{`Deep Dive: ${selectedMetric.name}`}</h1>
            <p className="mb-3 text-base leading-relaxed">
              <RenderProcessedText textParts={parseTextForGlossaryLinks(selectedMetric.deepDive.intro || selectedMetric.description, glossaryData)} />
            </p>
            {selectedMetric.deepDive.questions && selectedMetric.deepDive.questions.map((q, i) => (
              <div key={i} className="mt-3">
                <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">{q}</h3>
                 <div className="text-base mt-1">
                   <RenderProcessedText textParts={parseTextForGlossaryLinks(selectedMetric.deepDive.answers[i] || "Answer not provided.", glossaryData)} />
                 </div>
              </div>
            ))}
            {selectedMetric.deepDive.summary &&
              <p className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <RenderProcessedText textParts={parseTextForGlossaryLinks(selectedMetric.deepDive.summary, glossaryData)} />
              </p>
            }
            <div className="text-right mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Button onClick={() => setIsMetricModalOpen(false)} variant="outline">Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default FundamentalsView;
