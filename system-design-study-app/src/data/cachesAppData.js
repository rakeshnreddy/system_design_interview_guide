// src/data/cachesAppData.js
export const cachesAppData = {
  metrics: [
    { id: "hit-rate", name: "Hit Rate / Hit Ratio", description: "Percentage of requests served from the cache vs. going to origin.", talk: "High hit rates are key to cache efficiency.",
      deepDive: { title: "Understanding Cache Hit Rate", questions: ["Q1?"], answers: ["A1."] } },
    { id: "miss-rate", name: "Miss Rate / Miss Ratio", description: "Percentage of requests not found in cache, requiring origin fetch.", talk: "Analyze misses to improve cache content.",
      deepDive: { title: "Understanding Cache Miss Rate", questions: ["Q1?"], answers: ["A1."] } },
    { id: "latency", name: "Latency", description: "Time taken to retrieve data. Cache aims to reduce this.", talk: "Cache latency should be significantly lower than origin.",
      deepDive: { title: "Cache Latency", questions: ["Q1?"], answers: ["A1."] } },
    { id: "eviction-rate", name: "Eviction Rate", description: "Rate at which items are removed from cache due to space or TTL.", talk: "Monitor evictions to tune cache size/policies.",
      deepDive: { title: "Cache Eviction Rate", questions: ["Q1?"], answers: ["A1."] } },
  ],
  terminology: [
    { term: "Cache Hit", definition: "A request for data that is successfully found in the cache." },
    { term: "Cache Miss", definition: "A request for data that is not found in the cache, requiring a fetch from the origin data store." },
    { term: "Cache Entry", definition: "A piece of data stored in the cache, typically a key-value pair." },
    { term: "Time To Live (TTL)", definition: "A duration for which a cache entry is considered valid. After TTL expires, the entry may be removed or refreshed." },
    { term: "Stale Data", definition: "Cached data that no longer matches the origin data because the origin data has changed and the cache hasn't been updated." },
    { term: "Cache Invalidation", definition: "The process of removing or marking a cache entry as invalid, forcing a refresh from the origin on the next request." },
  ],
  cachepedia: {
    "Client-Side Caching": { type: "Client-Side", description: "Caching data directly in the client application (e.g., browser cache, mobile app cache).", pros: ["Fastest access", "Reduces network traffic"], cons: ["Limited storage", "Data consistency issues", "Private to one user"], characteristics: { consistency: 2, latency: 1, scalability: 1, complexity: 2, cost: 1 }, useWhen: "Static assets, user-specific data, offline support." },
    "CDN (Content Delivery Network)": { type: "Distributed", description: "Geographically distributed network of proxy servers caching content closer to users.", pros: ["Lower latency for global users", "Reduced load on origin", "DDoS protection"], cons: ["Cost", "TTL management", "Dynamic content challenges"], characteristics: { consistency: 3, latency: 2, scalability: 5, complexity: 3, cost: 4 }, useWhen: "Static assets (images, videos, JS, CSS), public dynamic content (with careful TTLs)." },
    "In-Memory Caches (Local)": { type: "Server-Side", description: "Caching data within the memory of a single application instance (e.g., Ehcache, Guava Cache).", pros: ["Very fast (main memory access)", "Simple to implement"], cons: ["Limited by server RAM", "Not shared across instances", "Data lost on restart if not persisted"], characteristics: { consistency: 2, latency: 1, scalability: 2, complexity: 1, cost: 2 }, useWhen: "Frequently accessed data for a single app instance, session data." },
    "Distributed Caches": { type: "Distributed", description: "External cache service shared by multiple application instances (e.g., Redis, Memcached).", pros: ["Scalable", "Shared data across services", "Resilient"], cons: ["Network latency vs. local in-memory", "More complex to manage"], characteristics: { consistency: 4, latency: 2, scalability: 5, complexity: 4, cost: 3 }, useWhen: "Shared application data, session state, microservices communication." },
  },
  writePatterns: [
    { name: "Write-Through", description: "Data is written to cache and origin simultaneously. Ensures consistency.", pros: ["High consistency", "Reads are fast"], cons: ["Higher write latency"] },
    { name: "Write-Around", description: "Data is written directly to origin, bypassing cache. Cache is populated on read miss.", pros: ["Lower write latency", "Cache isn't filled with write-once data"], cons: ["Higher read latency for new data"] },
    { name: "Write-Back (Write-Behind)", description: "Data is written to cache, then asynchronously to origin. Fastest writes.", pros: ["Lowest write latency", "High write throughput"], cons: ["Risk of data loss if cache fails before write to origin", "Consistency challenges"] },
  ],
  evictionPolicies: [
    { name: "LRU (Least Recently Used)", description: "Discards the least recently accessed items first." },
    { name: "LFU (Least Frequently Used)", description: "Discards the least frequently accessed items first." },
    { name: "FIFO (First-In, First-Out)", description: "Discards items in the order they were added." },
    { name: "Random Replacement (RR)", description: "Randomly selects an item to discard." },
  ],
  scenarios: {
    "E-commerce Product Page": {
      title: "E-commerce Product Page Caching",
      description: "Users browse product pages frequently. Pricing and stock levels change, but less often than views.",
      solution: { strategy: "Multi-level cache: CDN for static assets (images, CSS), distributed cache for product details (read-through), local in-memory for hot products. TTLs for pricing/stock.", components: ["CDN", "Redis/Memcached", "Local In-Memory Cache"] }
    },
  },
  flashcards: [
    { front: "What is Cache Coherency?", back: "Ensuring that any client reading from a cache has a consistent view of the data, especially in distributed systems." },
    { front: "Define 'Thundering Herd'.", back: "When many clients request the same resource simultaneously, causing a surge of requests to the origin if the cache entry expires or is missing." },
  ],
  codeSnippets: [
    { language: 'python', title: 'Basic Python Dictionary Cache', code: "cache = {}\n\ndef get_data(key):\n  if key in cache:\n    return cache[key] # Cache hit\n  else:\n    data = fetch_from_db(key) # Cache miss\n    cache[key] = data\n    return data" },
  ],
  decisionTree: {
    question: "What is your primary caching goal?",
    options: [
      { answer: "Reduce Latency", next: { question: "Is data shared across services?", options: [ {answer: "Yes", recommendation: "Distributed Cache (e.g., Redis)"}, {answer: "No", recommendation: "Local In-Memory Cache"} ] } },
      { answer: "Reduce Origin Load", next: { question: "Is content static or dynamic?", options: [ {answer: "Static", recommendation: "CDN"}, {answer: "Dynamic", recommendation: "Distributed Cache + Application-Level Caching"} ] } }
    ]
  }
};
