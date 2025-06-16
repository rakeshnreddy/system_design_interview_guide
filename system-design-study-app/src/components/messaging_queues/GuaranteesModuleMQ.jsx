import React from 'react';
import Card from '../common/Card';

const HighlightMQ = ({ children, className }) => (
  <span className={`bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light px-1 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

const GuaranteesModuleMQ = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Delivery Guarantees in Messaging Systems
        </h1>
      </div>

      <Card className="mt-0 mb-6" padding="p-6"> {/* mt-0 as h1 has mb-6 */}
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Understanding Delivery Semantics</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed">
            Delivery guarantees, or semantics, define the contract between the messaging system, producer, and consumer regarding how messages are handled under various conditions, including failures. Choosing the right semantic is crucial for data integrity, application correctness, and system performance.
          </p>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">1. At Most Once</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            With <HighlightMQ>At Most Once</HighlightMQ> delivery, messages are delivered zero or one time. This implies that messages may be lost under certain failure conditions (e.g., consumer crashes before acknowledging, broker fails before persisting the message acknowledgement if processing was done). It's often referred to as "fire and forget".
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Pros:</strong> Highest throughput and lowest latency as it involves minimal overhead (no complex state management for retries or deduplication).</li>
            <li><strong>Cons:</strong> Message loss is possible. This is unacceptable for many critical applications.</li>
            <li><strong>Use Cases:</strong> Suitable for applications where occasional data loss is acceptable, such as metrics collection for dashboards (where a missing point is not critical), logging non-critical events, or idempotent operations where reprocessing lost messages isn't harmful if they eventually arrive via another channel (though this leans towards at-least-once thinking).</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">2. At Least Once</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            <HighlightMQ>At Least Once</HighlightMQ> delivery guarantees that each message will be delivered one or more times. This ensures that messages will not be lost by the messaging system, but it means that duplicate messages are possible.
          </p>
          <p className="leading-relaxed mb-3">
            This is typically achieved by the consumer acknowledging messages only after successfully processing them. If an acknowledgment is lost, or if the consumer crashes before sending the acknowledgment, the message broker will resend the message to the same or another consumer.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Pros:</strong> Ensures no message loss from the messaging system's perspective.</li>
            <li><strong>Cons:</strong> Can lead to duplicate messages being processed by consumers. Consumers <HighlightMQ>must be designed to be idempotent</HighlightMQ> (i.e., processing the same message multiple times has the same effect as processing it only once).</li>
            <li><strong>Use Cases:</strong> Very common for many applications where data integrity is important, such as order processing, task queuing, event-driven updates, and notifications, provided consumers can handle or detect duplicates.</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">3. Exactly Once</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            <HighlightMQ>Exactly Once</HighlightMQ> delivery is the strongest and most complex guarantee, ensuring that each message is delivered and processed precisely one time by the logical consumer. No loss, no duplicates.
          </p>
          <p className="leading-relaxed mb-3">
            Achieving true exactly-once semantics often involves coordination between the message broker and the producer/consumer applications. This might involve transactional processing (e.g., two-phase commit across the broker and consumer's database), message deduplication windows based on unique message IDs, or idempotent receivers combined with transactional writes. Systems like Apache Kafka can achieve exactly-once semantics (EOS) with specific configurations and client-side transactional logic.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Pros:</strong> Highest level of data integrity. Simplifies consumer logic as idempotency for handling system-level duplicates is not strictly required (though idempotency is still a good design principle for business logic).</li>
            <li><strong>Cons:</strong> Can have higher latency and lower throughput due to the overhead of coordination, state management, and transactional commits. More complex to configure and implement correctly.</li>
            <li><strong>Use Cases:</strong> Critical applications where data accuracy and consistency are paramount, such as financial transactions (e.g., payment processing), billing systems, and critical stateful stream processing where each event must be processed exactly once to maintain correctness.</li>
          </ul>
        </div>
      </Card>

      <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Choosing the Right Guarantee</h2>
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

      <Card className="mt-6" padding="p-6"> {/* Added mt-6 for spacing */}
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Advanced Error Handling Patterns</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p className="leading-relaxed mb-3">
                Beyond basic Dead-Letter Queues (DLQs), sophisticated error handling in consumer applications often involves:
            </p>
            <ul className="list-disc space-y-3 pl-5">
                <li>
                    <strong>Retry with Exponential Backoff & Jitter:</strong> When transient errors occur (e.g., temporary network glitch, downstream service unavailable), consumers should retry processing the message. Implementing exponential backoff (increasing delay between retries) with jitter (randomness in delay) prevents thundering herd problems on downstream services.
                </li>
                <li>
                    <strong>Circuit Breaker Pattern for Consumers:</strong> If a consumer repeatedly fails to process messages due to issues with a downstream dependency (e.g., a database or external API), a circuit breaker can "open". This stops the consumer from attempting to process messages that are likely to fail, reducing load on the failing dependency and preventing wasted resources. The consumer can periodically attempt a "half-open" request to see if the dependency has recovered.
                </li>
                <li>
                    <strong>Idempotent Consumers (Revisited):</strong> Crucial for any retry mechanism. Ensuring that reprocessing a message (due to retry or redelivery from broker) doesn't cause unintended side effects (e.g., duplicate database entries, multiple charges).
                </li>
                <li>
                    <strong>Fine-grained DLQ Strategies:</strong> Instead of one generic DLQ, having multiple DLQs based on error types or message sources can help categorize and prioritize investigation of failed messages.
                </li>
            </ul>
             {/* TODO: Add diagram illustrating retry with backoff and circuit breaker */}
        </div>
      </Card>
    </div>
  );
};

export default GuaranteesModuleMQ;
