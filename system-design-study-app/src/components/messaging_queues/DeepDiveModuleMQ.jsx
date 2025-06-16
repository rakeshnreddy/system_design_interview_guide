import React from 'react';
import Card from '../common/Card'; // Using global Card component
// import HighlightMQ from './common/HighlightMQ'; // If specific highlighting is needed
// import CodeBlockMQ from './common/CodeBlockMQ'; // If specific code blocks are needed

const HighlightMQ = ({ children, className }) => (
  <span className={`bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light px-1 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

const CodeBlockMQ = ({ code, language = 'javascript' }) => (
  <pre className="bg-neutral-800 dark:bg-neutral-900 text-neutral-100 p-4 rounded-md overflow-x-auto text-sm">
    <code>
      {code.trim()}
    </code>
  </pre>
);


const DeepDiveModuleMQ = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Deep Dive into Messaging Queues
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Explore the internal workings, advanced concepts, and specific features that differentiate various messaging queue technologies and patterns.
        </p>
      </div>

      <Card className="mt-8 mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Message Structure & Serialization</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            Messages are the lifeblood of your queueing system. Their structure and how they are serialized can significantly impact performance, interoperability, and debugging capabilities.
          </p>
          <ul className="list-disc space-y-2 pl-5 mb-4">
            <li><strong>Payload:</strong> The actual data being sent. Common formats include JSON (human-readable, widely supported), XML (legacy, verbose), Protobuf or Avro (binary, efficient, schema-enforced), or even plain text for simple use cases.</li>
            <li><strong>Headers/Attributes (Metadata):</strong> Information about the message itself, not part of the core payload. Examples include a unique Message ID, Timestamp, Content-Type, Priority, Routing Keys, Trace/Correlation IDs, or sender information.</li>
          </ul>
          <p className="leading-relaxed mb-3">
            Choosing a binary serialization format like <HighlightMQ>Protocol Buffers (Protobuf)</HighlightMQ> or <HighlightMQ>Apache Avro</HighlightMQ> can offer significant performance gains (smaller message size, faster serialization/deserialization) and robust schema evolution capabilities compared to text-based formats like JSON or XML, especially crucial for high-throughput, low-latency systems.
          </p>
        </div>
        <CodeBlockMQ code={`
// Example: Conceptual Message Structure (often language/library specific)
interface Message {
  id: string; // Unique message identifier
  timestamp: number; // Epoch milliseconds
  type: string; // e.g., 'OrderCreatedEvent'
  source?: string; // Originating service/application
  contentType: 'application/json' | 'application/protobuf';
  correlationId?: string; // For tracking related messages
  priority?: number;
  headers?: Record<string, any>; // Custom application-specific headers
  payload: any; // The actual data (e.g., Order object)
}
        `} />
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Queue Types & Characteristics</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            Different messaging systems offer various types of queues, each with specific characteristics tailored to different needs:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li><strong>Standard Queues:</strong> Typically offer high throughput and at-least-once delivery (e.g., AWS SQS Standard). Ordering is best-effort, meaning messages might not be processed in the exact order they were sent.</li>
            <li><strong>FIFO Queues (First-In, First-Out):</strong> Preserve the order of messages and often provide exactly-once processing guarantees (e.g., AWS SQS FIFO, Kafka partitions). These usually have lower throughput limits compared to standard queues due to the overhead of maintaining order and deduplication.</li>
            <li><strong>Dead-Letter Queues (DLQs) / Failure Queues:</strong> Used to store messages that couldn't be processed successfully by a consumer after several retries. This prevents "poison pill" messages (malformed or problematic messages) from blocking the main queue and allows for later inspection, debugging, and potential reprocessing.</li>
            <li><strong>Priority Queues:</strong> Process messages based on a priority level assigned in the message headers or attributes. Higher priority messages are processed before lower priority ones. Not all messaging systems support this natively, or may have limitations.</li>
            <li><strong>Temporary Queues / Reply Queues:</strong> Often exist only for the duration of a connection or a specific interaction, commonly used in request/reply patterns where a producer sends a request and expects a response on a dedicated, short-lived queue.</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Exchange Types & Routing (AMQP Example - RabbitMQ)</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            In AMQP-based brokers like RabbitMQ, exchanges are message routing agents. Producers send messages to an exchange, which then distributes copies of the message to bound queues based on routing rules (bindings) and routing keys provided by the producer.
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li><HighlightMQ>Direct Exchange:</HighlightMQ> Routes messages to queues whose binding key exactly matches the message's routing key. Ideal for unicast routing of tasks.</li>
            <li><HighlightMQ>Fanout Exchange:</HighlightMQ> Routes messages to all queues bound to it, irrespective of the routing key. Useful for broadcasting messages to multiple consumers.</li>
            <li><HighlightMQ>Topic Exchange:</HighlightMQ> Routes messages to queues based on wildcard matches between the routing key and the binding pattern (e.g., a routing key like `orders.emea.processed` could match a binding pattern `orders.emea.*` or `orders.#`). Powerful for multicast routing based on message categories.</li>
            <li><HighlightMQ>Headers Exchange:</HighlightMQ> Routes messages based on matching message header attributes instead of the routing key. Provides more complex, attribute-based routing.</li>
          </ul>
        </div>
      </Card>

      <Card className="mt-6" padding="p-6"> {/* Added mt-6 for spacing */}
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Streaming Platform Concepts (e.g., Kafka)</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p className="leading-relaxed mb-3">
                Distributed streaming platforms like Apache Kafka extend basic messaging with concepts suited for high-throughput, ordered, and persistent event streams:
            </p>
            <ul className="list-disc space-y-3 pl-5">
                <li><strong>Log-Structured Storage:</strong> Messages are written to an immutable, append-only log, often partitioned for scalability.</li>
                <li><strong>Offsets:</strong> Consumers track their position in a log partition using an offset, allowing them to replay messages.</li>
                <li><strong>Consumer Groups:</strong> Multiple consumers can form a group to process messages from a topic, with each partition typically assigned to one consumer in the group.</li>
                <li><strong>Windowing:</strong> Processing messages in time-based or count-based windows (e.g., calculating aggregates over 5-minute intervals).</li>
                <li><strong>Stream Joins:</strong> Combining multiple event streams based on common keys and time windows.</li>
                <li><strong>Stateful Processing:</strong> Maintaining and updating state based on incoming event streams (e.g., aggregating counts, detecting patterns).</li>
            </ul>
        </div>
      </Card>
    </div>
  );
};

export default DeepDiveModuleMQ;
