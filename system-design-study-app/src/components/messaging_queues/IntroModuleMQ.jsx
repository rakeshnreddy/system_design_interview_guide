import React from 'react';
import Card from '../common/Card'; // Example: using global Card

const IntroModuleMQ = () => {
  // In a real scenario, this content would be much richer, possibly from the original HTML.
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Introduction to Messaging Queues
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Understand the fundamental role of messaging queues in building robust, scalable, and decoupled distributed systems. This section covers the what, why, and core terminology.
        </p>
      </div>

      <Card className="mt-8 mb-6" padding="p-6"> {/* Added mt-8 for spacing from intro text */}
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">What are Messaging Queues?</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed">
            Messaging Queues are a fundamental component in distributed systems that enable asynchronous communication
            between different parts of an application (services, processes, or components). Instead of services
            communicating directly and synchronously, they exchange messages through an intermediary buffer called a queue. This decouples the
            sender (producer) and receiver (consumer), improving reliability, scalability, and overall system resilience.
          </p>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Core Concepts</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5"> {/* Added pl-5 for better list indentation */}
            <li><strong>Producer:</strong> The application component that creates and sends messages to the queue.</li>
            <li><strong>Consumer:</strong> The application component that retrieves and processes messages from the queue.</li>
            <li><strong>Message:</strong> The data exchanged between producer and consumer. It can be simple text, JSON, XML, or binary data, often containing a payload and headers/metadata.</li>
            <li><strong>Queue:</strong> The intermediary buffer that stores messages, typically in a FIFO (First-In, First-Out) manner, until they are processed by a consumer.</li>
            <li><strong>Broker:</strong> The messaging system software that manages the queues, message routing, persistence, and delivery semantics (e.g., RabbitMQ, Kafka, AWS SQS).</li>
          </ul>
        </div>
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Why Use Them? Key Benefits</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="mb-3 leading-relaxed">
            Messaging queues offer several critical advantages in system design:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li><strong>Decoupling:</strong> Producers and consumers are independent. The producer doesn't need to know if the consumer is online or how it processes the message, and vice-versa. This allows services to evolve independently.</li>
            <li><strong>Asynchronous Operations:</strong> Producers can send messages and continue processing without waiting for an immediate response. This improves responsiveness and efficiency, especially for long-running tasks.</li>
            <li><strong>Load Balancing / Smoothing:</strong> Queues can act as buffers, smoothing out peaks in workload. Multiple consumers can process messages from a queue, distributing the load.</li>
            <li><strong>Increased Reliability & Resilience:</strong> If a consumer fails, messages remain in the queue and can be processed later or by another available consumer, preventing data loss.</li>
            <li><strong>Improved Scalability:</strong> Services can be scaled independently. If message volume increases, you can scale up consumers without affecting producers.</li>
            <li><strong>Rate Limiting & Throttling:</strong> Queues naturally help in managing the rate at which consumers process tasks, preventing downstream systems from being overwhelmed.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default IntroModuleMQ;
