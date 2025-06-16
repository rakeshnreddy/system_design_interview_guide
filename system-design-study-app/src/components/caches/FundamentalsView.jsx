// src/components/caches/FundamentalsView.jsx
import React, { useState } from 'react';
import Card from '../../common/Card';
import Modal from '../../common/Modal';
import Button from '../../common/Button'; // If needed for modal actions

const FundamentalsView = ({ appData }) => {
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  if (!appData || !appData.metrics || !appData.terminology) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">Loading fundamentals data...</p>
        {/* Optionally, add a spinner or more elaborate loading state here */}
      </div>
    );
  }

  const openMetricModal = (metric) => {
    setSelectedMetric(metric);
    setIsMetricModalOpen(true);
  };

  return (
    <div className="space-y-8 p-1">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert"> {/* This div provides base prose styling if plugin is active */}
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Caching Fundamentals
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          An introduction to core caching concepts, terminology, and key performance metrics. Use this as a foundation for understanding more advanced caching strategies and patterns.
        </p>
      </div>

      <div id="metrics-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {appData.metrics.map(metric => (
          <Card
            key={metric.id}
            className="hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-200 ease-in-out flex flex-col"
            onClick={() => openMetricModal(metric)}
            padding="p-4"
          >
            <h4 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-1">{metric.name}</h4> {/* Changed to h4 for better hierarchy if main view title is h1 */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 flex-grow">{metric.description}</p>
            {metric.talk && (
              <p className="text-xs text-accent-dark bg-accent-light/30 dark:text-accent-light dark:bg-accent-dark/40 rounded-full px-2 py-1 mt-3 inline-block italic">
                "{metric.talk}"
              </p>
            )}
          </Card>
        ))}
      </div>

      <Card>
        {/* Apply 'prose' styling if plugin is available, otherwise Tailwind classes provide base styling */}
        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Core Terminology</h2>
          <dl id="terminology-list" className="space-y-4">
            {appData.terminology.map(item => (
              <div key={item.term}>
                <dt className="font-semibold text-xl text-neutral-700 dark:text-neutral-200">{item.term}</dt>
                <dd className="text-base text-neutral-600 dark:text-neutral-300 mt-1 ml-2" dangerouslySetInnerHTML={{ __html: item.definition }}></dd>
              </div>
            ))}
          </dl>
        </div>
      </Card>

      <Card padding="p-6">
        <div>
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Additional Metrics to Monitor</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Eviction Rate:</strong> The rate at which items are being removed from the cache due to space limitations or TTL expiry. High eviction rates might indicate an undersized cache or overly aggressive TTLs.</li>
                <li><strong>Cache CPU/Memory Usage:</strong> Monitoring the resource consumption of cache nodes/processes helps identify performance bottlenecks or resource exhaustion.</li>
                <li><strong>Network Throughput:</strong> For distributed caches, network bandwidth can become a limiting factor for cache performance.</li>
                <li><strong>Number of Cache Items:</strong> Tracking the total number of items in the cache can help understand if the cache is being fully utilized or growing unexpectedly, which might affect memory.</li>
                <li><strong>Error Rates:</strong> Errors connecting to the cache, or errors during cache operations (e.g., serialization issues, timeouts). High error rates point to instability.</li>
            </ul>
          </div>
        </div>
      </Card>

      {selectedMetric && selectedMetric.deepDive && (
        <Modal
            isOpen={isMetricModalOpen}
            onClose={() => setIsMetricModalOpen(false)}
            title="" // Title will be part of the content now for h1 consistency
            size="xl" // Keep size prop for modal width
        >
          {/* Modal content now responsible for its own h1 title */}
          <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1 prose max-w-none dark:prose-invert">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">{`Deep Dive: ${selectedMetric.name}`}</h1>
            <p className="mb-3 text-base leading-relaxed">{selectedMetric.deepDive.intro || selectedMetric.description}</p>
            {selectedMetric.deepDive.questions && selectedMetric.deepDive.questions.map((q, i) => (
              <div key={i} className="mt-3">
                <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">{q}</h3> {/* Was h4, now h3 */}
                <div className="text-base mt-1" dangerouslySetInnerHTML={{ __html: selectedMetric.deepDive.answers[i] || "Answer not provided." }}></div>
              </div>
            ))}
            {selectedMetric.deepDive.summary && <p className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">{selectedMetric.deepDive.summary}</p>}
            <div className="text-right mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <Button onClick={() => setIsMetricModalOpen(false)} variant="outline">Close</Button>
            </div>
          </div>
        </Modal>
      )}
      {/* Typography plugin reminder can be kept if desired, or removed if it's globally noted */}
    </div>
  );
};
export default FundamentalsView;
