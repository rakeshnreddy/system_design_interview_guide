import React from 'react';
import Card from '../common/Card'; // Using global Card component

const HighlightMQ = ({ children, className }) => (
  <span className={`bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light px-1 py-0.5 rounded ${className}`}>
    {children}
  </span>
);

const ScalabilityModuleMQ = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
          Scalability in Messaging Systems
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Designing messaging systems that can handle growing loads is crucial. This section explores various dimensions and techniques for scaling producers, consumers, and the message broker itself.
        </p>
      </div>

      <Card className="mt-8 mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Key Dimensions of Scalability</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <p className="leading-relaxed mb-3">
            Scalability for a messaging system refers to its ability to handle an increasing load (more messages, more producers, more consumers, larger messages) without a significant drop in performance or reliability. Key dimensions include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><HighlightMQ>Throughput:</HighlightMQ> The number of messages processed per unit of time (e.g., messages/second).</li>
            <li><HighlightMQ>Number of Connections:</HighlightMQ> The ability to support a large number of concurrent producers and consumers.</li>
            <li><HighlightMQ>Queue Depth/Backlog:</HighlightMQ> The number of messages a queue can hold before it fills up or performance degrades.</li>
            <li><HighlightMQ>Message Size:</HighlightMQ> Efficiently handling messages of varying sizes, from small events to larger data payloads.</li>
            <li><HighlightMQ>Storage Capacity:</HighlightMQ> For systems that persist messages, the ability to store large volumes of data.</li>
            <li><HighlightMQ>Latency:</HighlightMQ> Maintaining low end-to-end message delivery times even under high load.</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Techniques for Scaling Producers</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5">
            <li><strong>Batching:</strong> Producers can group multiple small messages into a single larger batch before sending to the broker. This reduces network overhead, I/O operations on the broker, and can significantly improve throughput. Many client libraries provide this feature automatically or with simple configuration.</li>
            <li><strong>Asynchronous Sending:</strong> Producers send messages without waiting for an acknowledgment from the broker (fire-and-forget or handling async callbacks/futures). This improves producer throughput by preventing blocking but requires careful error handling for potential send failures.</li>
            <li><strong>Connection Pooling:</strong> Maintaining a pool of persistent connections to the broker can reduce the latency associated with establishing new connections for each send operation, especially in high-frequency sending scenarios.</li>
            <li><strong>Horizontal Scaling:</strong> Running multiple instances of producer applications, potentially distributed across different machines or containers, to increase the overall message production rate.</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Techniques for Scaling Consumers</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5">
            <li><strong>Multiple Consumer Instances (Competing Consumers):</strong> This is the most common way to scale message processing. Multiple consumer instances read from the same queue, effectively distributing the load. The messaging system ensures each message is delivered to only one consumer within the consumer group (for a given queue or partition).</li>
            <li><strong>Concurrent Processing within a Consumer:</strong> A single consumer instance can process multiple messages concurrently using threads, asynchronous programming models (e.g., async/await), or internal worker pools. This requires careful management of resources and message acknowledgments to avoid issues.</li>
            <li><strong>Batch Message Retrieval (Prefetching):</strong> Consumers can fetch multiple messages from the queue in a single request (e.g., SQS long polling, Kafka consumer poll). This reduces network calls and can improve consumer efficiency. The number of messages fetched (prefetch count) can often be tuned.</li>
            <li><strong>Auto-scaling Groups:</strong> Cloud platforms allow setting up auto-scaling for consumer instances based on metrics like queue length, processing time, or CPU utilization, automatically adjusting capacity to demand.</li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Techniques for Scaling the Broker/Queue Itself</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5">
            <li><strong>Clustering:</strong> Most modern message brokers (e.g., RabbitMQ, Kafka, ActiveMQ Artemis) support clustering, where multiple broker instances work together to provide high availability, fault tolerance, and distribute load across the cluster.</li>
            <li><strong>Partitioning/Sharding (e.g., Kafka Topics, RabbitMQ Sharded Queues):</strong> Data within a logical queue or topic is split across multiple physical partitions (or shards). Each partition can be thought of as an independent queue, allowing for parallel processing by consumers and significantly higher aggregate throughput.</li>
            <li><strong>Federation/Linking:</strong> Connecting brokers or clusters, often across different data centers or geographic regions, allowing messages to flow between them for distributed architectures or disaster recovery.</li>
            <li><strong>Optimized Storage & Persistence:</strong> Using fast SSDs, efficient message persistence formats, and strategies like log compaction (Kafka) can significantly improve broker performance and storage scalability.</li>
            <li><strong>Resource Allocation (Vertical Scaling):</strong> Ensuring brokers have sufficient CPU, memory, and network bandwidth. While horizontal scaling is preferred for elasticity, appropriate vertical resources are also key.</li>
          </ul>
        </div>
      </Card>

       <Card padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Key Considerations for Scalability</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
          <ul className="list-disc space-y-3 pl-5">
            <li><strong>Message Ordering:</strong> Scaling out consumers (multiple instances or concurrent processing) can affect strict message ordering if it's required across all messages. Partitioning (e.g., by a specific key like `user_id`) helps maintain order within that partition.</li>
            <li><strong>Idempotency:</strong> Critical when scaling consumers, especially with "at-least-once" delivery semantics, as it might lead to duplicate message processing during retries or consumer group rebalances.</li>
            <li><strong>Monitoring & Alerting:</strong> Essential to track key metrics like queue lengths, message processing times, error rates, and resource utilization (CPU, memory, network of brokers and consumers) to make informed scaling decisions and detect bottlenecks.</li>
            <li><strong>Broker-Specific Configurations:</strong> Each messaging system has its own set of configurations and best practices for achieving scalability. Understanding these is vital.</li>
          </ul>
        </div>
      </Card>

      <Card className="mt-6" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Push vs. Pull Models</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p className="leading-relaxed mb-3">
                This refers to how consumers receive messages:
            </p>
            <ul className="list-disc space-y-2 pl-5 mb-4">
                <li><strong>Pull Model:</strong> Consumers explicitly request (pull) messages from the broker (e.g., Kafka `consumer.poll()`, SQS `ReceiveMessage`). This allows consumers to manage their own processing rate and fetch messages only when they have capacity. It's generally better for high throughput and allows for more granular flow control by the consumer.</li>
                <li><strong>Push Model:</strong> The broker actively pushes messages to registered consumers (e.g., RabbitMQ consumers with an active subscription, WebSocket pushes). This can simplify consumer logic as they just need a handler for incoming messages, but it can overwhelm consumers if they can't keep up with the push rate. Flow control mechanisms (like prefetch limits in RabbitMQ) are important here.</li>
            </ul>
            {/* TODO: Add diagram illustrating Push vs. Pull message consumption models */}
            <div className="my-4 p-3 border rounded-md bg-neutral-100 dark:bg-neutral-800/60 shadow-sm text-center">
                <p className="font-semibold text-neutral-700 dark:text-neutral-200">Diagram Placeholder: Push vs. Pull</p>
                <div className="flex justify-around mt-2 text-sm">
                    <div className="w-2/5 p-2 border border-dashed dark:border-neutral-600 rounded">Broker --(pushes)--&gt; Consumer</div>
                    <div className="w-2/5 p-2 border border-dashed dark:border-neutral-600 rounded">Consumer --(pulls from)--&gt; Broker</div>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default ScalabilityModuleMQ;
