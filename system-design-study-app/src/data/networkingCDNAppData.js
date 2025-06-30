// Placeholder for Networking & CDN App Data
export const networkingCDNAppData = {
  title: "Networking & Content Delivery Networks (CDN)",
  overview: "This section covers fundamental networking concepts, protocols like TCP/IP and HTTP, and explores how Content Delivery Networks (CDNs) enhance website performance, reliability, and scalability by distributing content closer to users.",
  metrics: [
    {
      id: "latency",
      name: "{{Latency}}",
      description: "The delay experienced by users when accessing content. CDNs aim to reduce this.",
      formula: "Time to receive first byte - Time request sent"
    },
    {
      id: "throughput_cdn",
      name: "{{Throughput}} (CDN)",
      description: "The rate at which data is successfully transferred through the CDN.",
    },
    {
      id: "cache_hit_ratio",
      name: "{{Cache Hit Ratio}}",
      description: "The percentage of requests served directly from the CDN's cache versus those that had to be fetched from the origin server.",
      formula: "(Cache Hits / (Cache Hits + Cache Misses)) * 100%"
    },
    {
      id: "origin_offload",
      name: "Origin Offload",
      description: "The reduction in traffic that the origin server has to handle, thanks to the CDN.",
    }
  ],
  terminology: [
    {
      id: "tcp_ip",
      term: "{{TCP/IP Model}}",
      definition: "A suite of communication protocols used to interconnect network devices on the internet. TCP provides reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network."
    },
    {
      id: "http_https",
      term: "{{HTTP/HTTPS}}",
      definition: "Hypertext Transfer Protocol (HTTP) is an application protocol for distributed, collaborative, hypermedia information systems. HTTPS is the secure version of HTTP, where communications are encrypted using SSL/TLS."
    },
    {
      id: "dns_cdn",
      term: "{{DNS (Domain Name System)}} in CDNs",
      definition: "DNS plays a crucial role in directing users to the nearest or most optimal CDN edge server based on various factors like geographic location."
    },
    {
      id: "edge_server",
      term: "{{Edge Server}}",
      definition: "A CDN server placed at the 'edge' of a network, geographically close to end-users, to cache and serve content quickly."
    },
    {
      id: "origin_server",
      term: "Origin Server",
      definition: "The primary server where the original, definitive version of website content is stored. CDNs pull content from the origin server to cache at their edge locations."
    }
  ],
  cdnConcepts: {
    title: "CDN Deep Dive: Concepts and Workings",
    introduction: "A Content Delivery Network (CDN) is a geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance by distributing the service spatially relative to end-users.",
    howItWorks: {
      title: "How CDNs Deliver Your Content Faster",
      description: "CDNs primarily work by caching content in multiple locations around the world. When a user requests content, the CDN redirects the request to an edge server closest to the user, reducing latency.",
      steps: [
        "User requests content (e.g., an image or video) from a website.",
        "DNS routes the request to the most optimal CDN edge server (often the nearest one).",
        "If the edge server has the content cached, it serves it directly to the user (Cache Hit).",
        "If not (Cache Miss), the edge server requests the content from the origin server (or another CDN cache layer).",
        "The origin server sends the content to the edge server.",
        "The edge server caches the content for future requests and delivers it to the user."
      ],
      visualMetaphor: "Think of it like having mini-libraries (edge servers) all over the world, so you don't have to travel to the main national library (origin server) every time you need a common book."
    },
    popularProviders: [
      { name: "Cloudflare", features: "Widely known for security services (DDoS mitigation, WAF) in addition to CDN, large global network, generous free tier." },
      { name: "Amazon CloudFront (AWS)", features: "Integrates deeply with AWS services, pay-as-you-go pricing, highly configurable." },
      { name: "Akamai", features: "One of the oldest and largest CDN providers, extensive network, enterprise-focused features." },
      { name: "Fastly", features: "Focuses on real-time content delivery and edge compute capabilities, popular with high-traffic sites." }
    ],
    commonFeatures: [
      "Content Caching (Static & Dynamic)",
      "SSL/TLS Termination",
      "Load Balancing (at the edge)",
      "DDoS Protection & Mitigation",
      "Web Application Firewall (WAF)",
      "Image Optimization",
      "Video Streaming Optimization",
      "Analytics and Reporting"
    ]
  },
  networkingConcepts: {
    title: "Fundamental Networking Protocols",
    introduction: "Understanding core networking protocols is essential for designing and troubleshooting distributed systems.",
    protocols: [
      {
        name: "TCP (Transmission Control Protocol)",
        description: "Provides reliable, ordered, and error-checked delivery of a stream of octets. Establishes a connection before data transfer (connection-oriented).",
        features: ["Reliable delivery", "Connection-oriented", "Flow control", "Congestion control"],
        useCases: "Web browsing (HTTP/HTTPS), email (SMTP), file transfer (FTP)."
      },
      {
        name: "UDP (User Datagram Protocol)",
        description: "Provides a connectionless, unreliable datagram service. Faster than TCP but does not guarantee delivery, order, or error checking.",
        features: ["Connectionless", "Low overhead", "Fast (no handshake delay)"],
        useCases: "Streaming video/audio, DNS, online gaming, VoIP."
      },
      {
        name: "HTTP (Hypertext Transfer Protocol)",
        description: "The foundation of data communication for the World Wide Web. A client-server protocol where requests are initiated by the recipient (usually a web browser).",
        versions: ["HTTP/1.1 (persistent connections, pipelining)", "HTTP/2 (multiplexing, header compression, server push)", "HTTP/3 (uses QUIC, built on UDP)"],
        commonMethods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"]
      },
      {
        name: "IP (Internet Protocol)",
        description: "The principal communications protocol in the Internet protocol suite for relaying datagrams across network boundaries. Its main function is addressing hosts and routing datagrams from a source host to a destination host across one or more IP networks.",
        features: ["Addressing (IP Addresses)", "Routing", "Packet fragmentation and reassembly"]
      }
    ]
  },
  designPatterns: {
    title: "Networking & CDN Design Patterns",
    introduction: "Leveraging design patterns can optimize performance, reliability, and cost when using CDNs and designing network interactions.",
    patterns: [
      {
        name: "Cache-Aside (Lazy Loading)",
        description: "Application code first checks the cache. If data is found (cache hit), it's returned. If not (cache miss), the application fetches data from the origin, stores it in the cache, and then returns it. CDNs often implement this implicitly.",
        pros: ["Only requested data is cached", "Resilient to cache failures (app can still get data from origin)"],
        cons: ["Higher latency on initial cache miss", "Stale data possible if not invalidated properly"]
      },
      {
        name: "Multi-CDN Strategy",
        description: "Using multiple CDN providers to improve fault tolerance, performance reach, or negotiate better pricing.",
        pros: ["Increased uptime (failover to another CDN)", "Potentially better performance by selecting CDN based on user location/performance", "Avoids vendor lock-in"],
        cons: ["Increased complexity in management and configuration", "Potentially higher costs", "Consistency challenges across CDNs"]
      },
      {
        name: "Edge Computing / Serverless at the Edge",
        description: "Running application logic on CDN edge servers, closer to users. Reduces latency for dynamic content and computations.",
        pros: ["Significantly reduced latency for dynamic operations", "Reduced load on origin servers", "Personalized content delivery"],
        cons: ["Limited execution environment compared to origin servers", "State management can be complex", "Vendor-specific implementations"]
      }
    ]
  },
  useCases: {
    title: "Common Use Cases & Trade-offs",
    introduction: "CDNs are versatile and used in various scenarios, each with its own set of trade-offs.",
    cases: [
      {
        name: "Static Asset Delivery (Images, CSS, JS)",
        description: "The most common use case. Offloads delivery of static files from origin servers, speeding up page loads.",
        tradeOffs: "Cost of CDN vs. origin bandwidth; cache invalidation complexity for updated assets."
      },
      {
        name: "Video Streaming (Live and On-Demand)",
        description: "CDNs are crucial for delivering smooth video streams by caching video segments close to viewers and handling high concurrent traffic.",
        tradeOffs: "Cost for high-volume video traffic; latency for live streaming; DRM and content protection."
      },
      {
        name: "Dynamic Content Acceleration",
        description: "Some CDNs offer features to accelerate dynamic content, such as route optimization, TCP pre-pooling, and computations at the edge.",
        tradeOffs: "More complex to configure than static caching; effectiveness varies based on application architecture."
      },
      {
        name: "API Caching & Acceleration",
        description: "Caching API responses at the edge to reduce latency and load on backend API servers.",
        tradeOffs: "Cache invalidation strategies for frequently changing API data; security for sensitive API responses."
      }
    ]
  },
  keyTakeaways: {
    title: "Key Takeaways for Networking & CDN",
    takeaways: [
      "CDNs significantly improve user experience by reducing latency and increasing content availability.",
      "Understanding core networking protocols (TCP, UDP, HTTP) is vital for system design.",
      "Caching strategies are fundamental to CDN effectiveness; cache hit ratio is a key metric.",
      "Modern CDNs offer more than static caching, including security features and edge computing.",
      "Choosing the right CDN and configuration involves balancing performance, cost, and complexity."
    ]
  }
};
