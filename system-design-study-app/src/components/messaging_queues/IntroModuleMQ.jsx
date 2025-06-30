import React from 'react';
import Card from '../common/Card';
import { glossaryData } from '../../data/glossaryData.js';
import { RenderTextWithLinks } from '../../utils/textRenderUtils.jsx';

const IntroModuleMQ = ({ appData }) => {
  const overviewText = appData?.overview || "Overview data is not available.";
  const eventNote = appData?.eventStreamingVsMqNote;
  const terminology = appData?.terminology || [];

  // Basic core concepts - could be moved to appData if more dynamic content is needed
  const coreConcepts = [
    { term: "{{Producer (Publisher)}}", definition: "The application component that creates and sends messages to the queue." },
    { term: "{{Consumer (Subscriber)}}", definition: "The application component that retrieves and processes messages from the queue." },
    { term: "Message", definition: "The data exchanged between producer and consumer. It can be simple text, JSON, XML, or binary data, often containing a payload and headers/metadata." },
    { term: "{{Queue}}", definition: "The intermediary buffer that stores messages, typically in a FIFO (First-In, First-Out) manner, until they are processed by a consumer." },
    { term: "{{Broker}}", definition: "The messaging system software that manages the queues, message routing, persistence, and delivery semantics (e.g., {{RabbitMQ}}, {{Apache Kafka}}, {{Amazon SQS|AWS SQS}})." }
  ];

  const keyBenefits = [
      "<strong>{{Decoupling|Decoupling}}:</strong> Producers and consumers are independent. The producer doesn't need to know if the consumer is online or how it processes the message, and vice-versa. This allows services to evolve independently.",
      "<strong>Asynchronous Operations:</strong> Producers can send messages and continue processing without waiting for an immediate response. This improves responsiveness and efficiency, especially for long-running tasks.",
      "<strong>Load Balancing / Smoothing:</strong> Queues can act as buffers, smoothing out peaks in workload. Multiple consumers can process messages from a queue, distributing the load.",
      "<strong>Increased {{Reliability}} & {{Resilient Systems|Resilience}}:</strong> If a consumer fails, messages remain in the queue and can be processed later or by another available consumer, preventing data loss.",
      "<strong>Improved {{Scalability}}:</strong> Services can be scaled independently. If message volume increases, you can scale up consumers without affecting producers.",
      "<strong>Rate Limiting & Throttling:</strong> Queues naturally help in managing the rate at which consumers process tasks, preventing downstream systems from being overwhelmed."
  ];


  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8">
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Introduction to Messaging Queues
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <RenderTextWithLinks text={overviewText} glossaryData={glossaryData} />
        </p>
      </div>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Core Concepts</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5">
            {coreConcepts.map((concept, index) => (
              <li key={index}>
                <strong><RenderTextWithLinks text={concept.term} glossaryData={glossaryData} />:</strong> <RenderTextWithLinks text={concept.definition} glossaryData={glossaryData} />
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Why Use Them? Key Benefits</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5">
            {keyBenefits.map((benefit, index) => (
              <li key={index}><RenderTextWithLinks text={benefit} glossaryData={glossaryData} /></li>
            ))}
          </ul>
        </div>
      </Card>

      {eventNote && (
        <Card padding="p-6">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            <RenderTextWithLinks text={eventNote.title} glossaryData={glossaryData} />
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 space-y-4">
            <p><RenderTextWithLinks text={eventNote.introduction} glossaryData={glossaryData} /></p>
            {eventNote.points.map((point, index) => (
              <div key={index} className="p-3 border-l-4 border-secondary-light dark:border-secondary-dark bg-neutral-50 dark:bg-neutral-800/30 rounded-r-md">
                <h4 className="font-semibold text-xl text-neutral-700 dark:text-neutral-200">
                  <RenderTextWithLinks text={point.aspect} glossaryData={glossaryData} />
                </h4>
                <p className="mt-1"><strong>Streaming:</strong> <RenderTextWithLinks text={point.streaming} glossaryData={glossaryData} /></p>
                <p className="mt-1"><strong>Traditional MQ:</strong> <RenderTextWithLinks text={point.traditionalMq} glossaryData={glossaryData} /></p>
              </div>
            ))}
            {eventNote.conclusion && <p className="mt-3 italic"><RenderTextWithLinks text={eventNote.conclusion} glossaryData={glossaryData} /></p>}
          </div>
        </Card>
      )}

      {terminology.length > 0 && (
         <Card padding="p-6">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Key Terminology</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
                <ul className="list-disc space-y-3 pl-5">
                    {terminology.filter(t => ['producer', 'consumer', 'broker', 'queue', 'topic'].includes(t.id)).map(term => ( // Example filter
                        <li key={term.id}><strong><RenderTextWithLinks text={term.title} glossaryData={glossaryData} />:</strong> <RenderTextWithLinks text={term.description} glossaryData={glossaryData} /></li>
                    ))}
                </ul>
            </div>
        </Card>
      )}
    </div>
  );
};

export default IntroModuleMQ;
