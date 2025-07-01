// Placeholder for Networking & CDN App Data
export const networkingCDNAppData = {
  title: "Networking & Content Delivery Networks (CDN)",
  overview: "This section covers fundamental networking concepts, protocols like TCP/IP and HTTP, and explores how Content Delivery Networks (CDNs) enhance website performance, reliability, and scalability by distributing content closer to users.\n\n_Q: What is the main purpose of a {{CDN (Content Delivery Network)}}?_\n_A: A {{CDN (Content Delivery Network)}} aims to reduce {{Latency}} and improve website/application performance by caching content (like images, videos, CSS, JavaScript) on servers geographically closer to end-users. This also reduces the load on origin servers._\n\n_Q: How does {{DNS (Domain Name System)}} resolution work at a high level?_\n_A: When you type a domain name (e.g., www.example.com) into your browser, your computer queries a series of {{DNS (Domain Name System)|DNS servers}} (recursive resolver, root servers, TLD servers, authoritative name servers) to translate that human-readable domain name into a machine-readable {{IP Address}} of the server hosting that website._",
  metrics: [
    { id: "latency", name: "{{Latency}}", description: "The delay experienced by users. CDNs aim to reduce this.", formula: "Time to receive first byte - Time request sent" },
    { id: "throughput_cdn", name: "{{Throughput}} (CDN)", description: "The rate of successful data transfer through the CDN." },
    { id: "cache_hit_ratio", name: "{{Cache Hit Ratio}}", description: "Percentage of requests served from CDN cache.", formula: "(Cache Hits / (Cache Hits + Cache Misses)) * 100%" },
    { id: "origin_offload", name: "Origin Offload", description: "Reduction in traffic the origin server handles due to CDN." }
  ],
  terminology: [
    { id: "tcp_ip", term: "{{TCP/IP Model}}", definition: "Suite of protocols for internet communication. TCP provides reliable, ordered, error-checked delivery." },
    { id: "http_https", term: "{{HTTP/HTTPS}}", definition: "Protocol for web data communication. HTTPS is the secure, encrypted version." },
    { id: "dns_cdn", term: "{{DNS (Domain Name System)}} in CDNs", definition: "Directs users to the optimal CDN edge server." },
    { id: "edge_server", term: "{{Edge Server}}", definition: "CDN server geographically close to users for fast content delivery." },
    { id: "origin_server", term: "Origin Server", definition: "The primary server storing the original content." }
  ],
  cdnConcepts: {
    title: "CDN Deep Dive: Concepts and Workings",
    introduction: "A CDN is a geographically distributed network of proxy servers aiming to provide high availability and performance by distributing services spatially relative to end-users.",
    howItWorks: {
      title: "How CDNs Deliver Your Content Faster",
      description: "CDNs cache content in multiple global locations. User requests are routed to the nearest edge server, reducing latency.",
      steps: [
        "User requests content (e.g., image, video).",
        "DNS routes request to optimal CDN edge server.",
        "If cached, edge server delivers (Cache Hit).",
        "Else (Cache Miss), edge server fetches from origin, caches it, then delivers to user."
      ],
      visualMetaphor: "Think of mini-libraries (edge servers) worldwide, so you don't always need the main national library (origin server)."
    },
    popularProviders: [
      { name: "Cloudflare", features: "Security (DDoS, WAF), large network, free tier." },
      { name: "Amazon CloudFront (AWS)", features: "Deep AWS integration, pay-as-you-go." },
      { name: "Akamai", features: "Oldest, largest, enterprise-focused." },
      { name: "Fastly", features: "Real-time delivery, edge compute, high-traffic sites." }
    ],
    commonFeatures: ["Content Caching", "SSL/TLS Termination", "Edge Load Balancing", "DDoS Protection", "WAF", "Image Optimization", "Video Streaming", "Analytics"]
  },
  networkingConcepts: {
    title: "Fundamental Networking Protocols",
    items: [
      {
        name: "TCP vs UDP Comparison",
        description: "Understanding the differences between TCP and UDP is crucial for choosing the right protocol for different application needs.",
        tcp: { type: "Connection-oriented", reliability: "High (guaranteed delivery, ordering, error checking)", overhead: "Higher (3-way handshake, acknowledgements)", useCases: "Web (HTTP/S), Email (SMTP), File Transfer (FTP)" },
        udp: { type: "Connectionless", reliability: "Low (no guarantees)", overhead: "Lower (no handshake, minimal header)", useCases: "Streaming (video/audio), DNS, Online Gaming, VoIP" },
        tradeoffSummary: "TCP prioritizes reliability over speed, while UDP prioritizes speed and low overhead over reliability."
      },
      {
        name: "HTTP Versions Evolution",
        description: "HTTP has evolved to improve performance and efficiency.",
        versions: [
          { version: "{{HTTP/1.1}}", description: "Introduced persistent connections, pipelining. Suffers from head-of-line blocking." },
          { version: "{{HTTP/2}}", description: "Introduced multiplexing over a single TCP connection, header compression (HPACK), server push. Addresses head-of-line blocking at the HTTP level." },
          { version: "{{HTTP/3}}", description: "Uses {{QUIC}} (built on UDP) instead of TCP. Solves TCP head-of-line blocking, faster connection establishment." }
        ]
      }
    ]
  },
  designPatterns: {
    title: "Networking & CDN Design Patterns",
    items: [
      {
        name: "Strategic CDN Usage for Caching",
        description: "Effectively using CDNs involves deciding what to cache, for how long (TTL), and how to handle cache invalidation.",
        whatToOffload: ["Static assets (images, JS, CSS)", "Publicly accessible, infrequently changing API responses", "Video segments"],
        whatNotToOffloadTypically: ["Highly dynamic, personalized user data", "Sensitive private information (unless edge security is robust)", "Frequently changing real-time data requiring absolute freshness"],
        importance: "Maximizes cache hit ratio, reduces origin load, improves performance."
      },
      {
        name: "Multi-CDN Strategy",
        description: "Employing multiple CDN providers for enhanced resilience, performance, or cost optimization.",
        benefits: "Improved uptime, better global performance reach, negotiation leverage, avoiding vendor lock-in.",
      }
    ]
  },
  useCasesAndTradeoffs: {
    title: "CDN Use Cases & Key Trade-offs",
    effectiveUseCases: [
      "Static Asset Delivery (images, CSS, JS)",
      "Video Streaming (Live & On-Demand)",
      "Software Distribution",
      "Basic API Response Caching"
    ],
    lessEffectiveOrChallenging: [
      "Highly personalized dynamic content (requires edge compute or advanced CDN features)",
      "Real-time interactive applications with very low latency bidirectional needs (WebSockets might bypass CDN for some paths)",
      "Content with extremely short TTLs or that changes unpredictably every few seconds"
    ],
    tradeoffs: [
      { aspect: "Cost", detail: "Pay-as-you-go vs. committed usage; data transfer out (DTO) fees; cost of advanced features." },
      { aspect: "Performance", detail: "Latency reduction vs. cache hit ratio; specific CDN's Point of Presence (PoP) coverage for your user base." },
      { aspect: "Complexity", detail: "Configuration effort; cache invalidation logic; managing multiple CDNs or advanced features." },
      { aspect: "Control", detail: "Managed service limitations vs. flexibility of self-hosted caching solutions." }
    ]
  },
  realWorldExamples: [
      { id: "netflix", company: "Netflix", example: "Uses a massive, deeply embedded CDN (Open Connect) to stream video content efficiently to its global user base, placing servers directly within ISP networks." },
      { id: "ecommerce", company: "Major E-commerce Sites", example: "Leverage CDNs for product images, static assets, and increasingly for accelerating dynamic parts of the site like search results or personalized recommendations using edge capabilities." }
  ],
  keyTakeaways: {
    title: "Key Takeaways: Networking & CDN",
    takeaways: [
      "CDNs are essential for modern web performance, reducing latency by caching content closer to users.",
      "Core networking protocols (TCP, UDP, HTTP) define how data is transmitted and form the basis of internet communication.",
      "Effective CDN usage involves strategic caching, understanding cache hit ratios, and appropriate cache invalidation.",
      "Beyond static content, CDNs offer security (DDoS, WAF) and edge compute capabilities.",
      "Choosing a CDN involves trade-offs between performance, cost, features, and complexity."
    ]
  }
};
