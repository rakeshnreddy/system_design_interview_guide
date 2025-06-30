import React from 'react';
import Card from '../common/Card';

const HighlightMQ = ({ children, className }) => (
  <span className={`bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light px-1 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

const GuaranteesModuleMQ = ({ appData }) => {
  const semantics = appData?.deliverySemantics || [];

  if (semantics.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="prose max-w-none dark:prose-invert">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
            Delivery Guarantees in Messaging Systems
          </h1>
          <p>Delivery semantics data is not available.</p>
        </div>
      </div>
    );
  }

  const semanticTitles = {
    "{{At-Most-Once Delivery|At-Most-Once}}": "1. At Most Once",
    "{{At-Least-Once Delivery|At-Least-Once}}": "2. At Least Once",
    "{{Exactly-Once Semantics|Exactly-Once}}": "3. Exactly Once"
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Delivery Guarantees in Messaging Systems
        </h1>
      </div>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Understanding Delivery Semantics</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed">
            Delivery guarantees, or semantics, define the contract between the messaging system, producer, and consumer regarding how messages are handled under various conditions, including failures. Choosing the right semantic is crucial for data integrity, application correctness, and system performance.
          </p>
        </div>
      </Card>

      {semantics.map((semantic, index) => (
        <Card key={index} padding="p-6">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            <RenderTextWithLinks text={semanticTitles[semantic.term] || semantic.term} glossaryData={glossaryData} />
            </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p className="leading-relaxed mb-3">
              <RenderTextWithLinks text={semantic.definition} glossaryData={glossaryData} />
            </p>
            {semantic.pros && (
              <>
                <h4 className="font-semibold mt-2">Pros:</h4>
                <p><RenderTextWithLinks text={semantic.pros} glossaryData={glossaryData} /></p>
              </>
            )}
            {semantic.cons && (
              <>
                <h4 className="font-semibold mt-2">Cons:</h4>
                <p><RenderTextWithLinks text={semantic.cons} glossaryData={glossaryData} /></p>
              </>
            )}
            {semantic.implications && (
              <>
                <h4 className="font-semibold mt-2">Implications:</h4>
                <p><RenderTextWithLinks text={semantic.implications} glossaryData={glossaryData} /></p>
              </>
            )}
            {semantic.exampleScenario && (
              <>
                <h4 className="font-semibold mt-2">Example Scenario:</h4>
                <p><RenderTextWithLinks text={semantic.exampleScenario} glossaryData={glossaryData} /></p>
              </>
            )}
          </div>
        </Card>
      ))}

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Choosing the Right Guarantee</h2>
        {/* This part can remain somewhat static or also be driven by appData if needed */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            The choice of delivery guarantee depends heavily on your application's specific business requirements and tolerance for data loss versus duplicate processing:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>If some message loss is tolerable and performance/throughput are paramount, <HighlightMQ>At Most Once</HighlightMQ> might be considered (though rarely for critical data).</li>
            <li>If messages must not be lost, but duplicates can be handled (via idempotency), <HighlightMQ>At Least Once</HighlightMQ> is a very common and practical choice. It offers a good balance of reliability and performance.</li>
            <li>If absolutely no loss and no duplicates are permissible, and the performance/complexity trade-offs are acceptable, aim for <HighlightMQ>Exactly Once</HighlightMQ>. This requires careful design and often specific broker capabilities.</li>
          </ul>
        </div>
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Advanced Error Handling Patterns</h2>
         <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p className="leading-relaxed mb-3">
                <RenderTextWithLinks text="Beyond basic {{Dead Letter Queues (DLQ)|DLQs}}, sophisticated error handling in consumer applications often involves:" glossaryData={glossaryData} />
            </p>
            <ul className="list-disc space-y-3 pl-5">
                <li>
                    <strong>Retry with Exponential Backoff & Jitter:</strong> When transient errors occur (e.g., temporary network glitch, downstream service unavailable), consumers should retry processing the message. Implementing exponential backoff (increasing delay between retries) with jitter (randomness in delay) prevents thundering herd problems on downstream services.
                </li>
                <li>
                    <strong>Circuit Breaker Pattern for Consumers:</strong> If a consumer repeatedly fails to process messages due to issues with a downstream dependency (e.g., a [database](#/databases) or external API), a circuit breaker can "open". This stops the consumer from attempting to process messages that are likely to fail, reducing load on the failing dependency and preventing wasted resources. The consumer can periodically attempt a "half-open" request to see if the dependency has recovered.
                </li>
                <li>
                    <strong>{{Idempotency|Idempotent Consumers}} (Revisited):</strong> Crucial for any retry mechanism. Ensuring that reprocessing a message (due to retry or redelivery from broker) doesn't cause unintended side effects (e.g., duplicate [database](#/databases) entries, multiple charges).
                </li>
                <li>
                    <strong>Fine-grained DLQ Strategies:</strong> Instead of one generic {{DLQ (Dead Letter Queue)|DLQ}}, having multiple {{DLQ (Dead Letter Queue)|DLQs}} based on error types or message sources can help categorize and prioritize investigation of failed messages.
                </li>
            </ul>
        </div>
      </Card>
    </div>
  );
};

export default GuaranteesModuleMQ;
