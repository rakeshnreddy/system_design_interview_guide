export const apiDesignAppData = {
  title: "API Design",
  overview: `An API (Application Programming Interface) is a set of rules, protocols, and tools that allows different software applications to communicate with each other. In system design, APIs are the fundamental building blocks for creating modular, scalable, and maintainable systems. They define how various components of a system, or different systems altogether, interact, exchange data, and invoke functionality without needing to know the intricacies of each other's internal implementations. This abstraction enables decoupling, promotes reusability, and facilitates integration between disparate services, whether they are internal microservices or external third-party services.

APIs can be broadly categorized as synchronous or asynchronous. Synchronous APIs require the client to send a request and wait for an immediate response from the server. This blocking nature is suitable for operations where the client needs a quick confirmation or data to proceed, like retrieving user details. In contrast, asynchronous APIs allow the client to send a request and continue processing without waiting for an immediate response; the server processes the request in the background and notifies the client upon completion, often via webhooks or message queues. The choice between synchronous and asynchronous design significantly impacts system responsiveness, resource utilization, and fault tolerance. For example, long-running tasks like video processing are better suited for asynchronous APIs to avoid tying up client resources, while quick data lookups benefit from synchronous interaction. Design choices here are crucial for user experience and system efficiency.`,
  metrics: [
    {
      id: "rps_api",
      name: "Requests Per Second (RPS)",
      description: "Number of API requests received per second. Indicates current load and capacity requirements."
    },
    {
      id: "latency_api",
      name: "Latency (End-to-End)",
      description: "Total time taken from client request to client receiving response. Includes network, processing, and integration latency."
    },
    {
      id: "error_rate_api",
      name: "Error Rate (%)",
      description: "Percentage of API requests that result in errors (e.g., 4xx client errors, 5xx server errors)."
    },
    {
      id: "uptime_api",
      name: "Uptime (%)",
      description: "Percentage of time the API is operational and available for requests. Typically measured in 'nines' (e.g., 99.9%)."
    },
    {
      id: "avg_payload_size",
      name: "Average Payload Size",
      description: "Average size of request and response payloads (e.g., in KB). Impacts bandwidth and serialization/deserialization time."
    },
    {
      id: "adoption_rate",
      name: "Adoption Rate / Usage Growth",
      description: "Rate at which the API is being adopted by new clients or existing clients increase usage. Relevant for public or widely used internal APIs."
    }
  ],
  terminology: [
    {
      term: "API (Application Programming Interface)",
      definition: "A contract or set of rules allowing different software applications to communicate and exchange data with each other."
    },
    {
      term: "REST (Representational State Transfer)",
      definition: "An architectural style for designing networked applications, based on HTTP methods, URIs for resources, and stateless communication."
    },
    {
      term: "GraphQL",
      definition: "A query language for APIs and a server-side runtime for executing those queries by using a type system you define for your data."
    },
    {
      term: "gRPC (Google Remote Procedure Call)",
      definition: "A high-performance, open-source universal RPC framework. Uses HTTP/2 for transport and Protocol Buffers as the interface description language."
    },
    {
      term: "Idempotency",
      definition: "An operation is idempotent if making the same request multiple times produces the same result as making it once (e.g., PUT, DELETE)."
    },
    {
      term: "Pagination",
      definition: "The process of dividing a large dataset into smaller, manageable chunks (pages) for API responses. Common methods: offset-based, cursor-based."
    },
    {
      term: "Rate Limiting",
      definition: "Restricting the number of API requests a client can make within a certain time window to prevent abuse and ensure fair usage."
    },
    {
      term: "API Versioning",
      definition: "Managing changes to an API over time by creating distinct versions (e.g., /v1/users, /v2/users) to avoid breaking existing client integrations."
    },
    {
      term: "Authentication (AuthN)",
      definition: "The process of verifying the identity of a client or user trying to access the API (e.g., API keys, OAuth 2.0 tokens)."
    },
    {
      term: "Authorization (AuthZ)",
      definition: "The process of determining whether an authenticated client or user has permission to perform a specific action or access a particular resource."
    },
    {
      term: "OpenAPI Specification (Swagger)",
      definition: "A standard, language-agnostic interface description for RESTful APIs, which allows both humans and computers to discover and understand the capabilities of the service without access to source code or documentation."
    },
    {
      term: "Webhook",
      definition: "An HTTP callback or HTTP POST that occurs when something happens; a simple event-notification via HTTP POST. Used for asynchronous communication from server to client."
    },
    {
      term: "Statelessness",
      definition: "A characteristic of REST APIs where each request from a client to a server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server."
    },
    {
      id: "hypermedia", // Added id for consistency
      term: "HATEOAS",
      definition: "Hypermedia As The Engine Of Application State: REST constraint where responses include hyperlinks for discoverability."
    },
    {
      id: "schemaFirst", // Added id for consistency
      term: "Schema-First",
      definition: "Design approach where the API/schema is defined before implementation (common in GraphQL)."
    }
  ],
  protocols: [
    {
      id: "rest",
      name: "REST (Representational State Transfer)",
      structure: "Uses standard HTTP methods (GET, POST, PUT, DELETE, PATCH), URIs to identify resources (e.g., /users, /products/{id}), and typically JSON or XML for data exchange. Emphasizes statelessness, uniform interface, and cacheability.",
      pros: [
        "Simple and familiar due to its use of standard HTTP methods and status codes, making it easy to learn and use.",
        "Widely adopted with a vast ecosystem of tools, libraries, and gateways.",
        "Statelessness promotes scalability as any server can handle any request.",
        "Leverages HTTP caching mechanisms effectively for better performance with cacheable resources."
      ],
      cons: [
        "Can lead to over-fetching (retrieving more data than needed) or under-fetching (requiring multiple requests to get all necessary data) for complex data requirements.",
        "No strict contract enforcement out-of-the-box; relies on conventions and documentation (e.g., OpenAPI/Swagger) which can drift from implementation.",
        "Can be verbose with metadata (HTTP headers) and data formats like JSON/XML compared to binary protocols.",
        "Managing multiple versions can be complex (URI, headers, etc.)."
      ],
      whenToUse: [
        "Public APIs where ease of adoption and broad compatibility are important.",
        "Standard web applications and mobile application backends performing CRUD operations on well-defined resources.",
        "Systems where statelessness and cacheability are key requirements.",
        "When simplicity and leveraging existing HTTP infrastructure are priorities."
      ],
      whenNotToUse: [
        "Applications with complex data fetching needs where clients need to specify the exact data to avoid over/under-fetching (GraphQL might be better).",
        "High-performance internal microservice communication where the overhead of HTTP/JSON is significant (gRPC might be better).",
        "Real-time bi-directional communication (WebSockets are designed for this).",
        "When a very strict contract between client and server is required from the start (gRPC's .proto files offer this)."
      ],
      interviewTalkingPoints: [
        "Discuss its reliance on HTTP verbs and status codes.",
        "Highlight statelessness and cacheability as key principles.",
        "Mention common issues like over/under-fetching.",
        "Contrast with GraphQL for data fetching flexibility and gRPC for performance."
      ],
      defendingYourDecision: "REST was chosen for its ubiquity, simplicity, and alignment with HTTP standards, making it easily consumable by a wide range of clients. For our resource-oriented services, REST provides a natural and well-understood interaction model. While we considered GraphQL for its flexible querying, the added complexity wasn't justified for our current CRUD-heavy workload and well-defined resources. OpenAPI helps us maintain a clear contract.",
      useCases: "Public APIs, web applications, mobile application backends, CRUD operations on resources, systems where simplicity and standard HTTP are preferred."
    },
    {
      id: "graphql",
      name: "GraphQL",
      // 'description' from prompt is mapped to 'structure' here for consistency
      structure: "A query language and runtime allowing clients to request exactly the data they need, with a single endpoint.",
      pros: [
        "Reduces over-fetching and under-fetching",
        "Strongly typed schema with introspection",
        "Evolvable without versioning"
      ],
      cons: [
        "Increased server complexity",
        "Caching can be more difficult",
        "Query performance must be carefully managed"
      ],
      whenToUse: [ // Mapped from prompt's whenToUse (string) to array for consistency
        "Ideal when clients need flexible queries or multiple related resources in one request (e.g., mobile apps)."
      ],
      whenNotToUse: [ // Mapped from prompt's whenNotToUse (string) to array for consistency
        "Avoid for simple CRUD APIs where REST suffices or when caching at HTTP layer is critical."
      ],
      interviewTalkingPoints: [
        "Explain schema design and resolver functions.",
        "Discuss how GraphQL enables client-driven requests.",
        "Mention potential performance pitfalls with deeply nested queries."
      ],
      defendingYourDecision: "We chose GraphQL to reduce round-trips for our mobile clients that need aggregated data in a single call.",
      useCases: [ // Mapped from prompt's useCases (array)
        "Mobile application backends",
        "APIs with evolving front-end requirements"
      ]
    },
    {
      id: "grpc",
      name: "gRPC (Google Remote Procedure Call)",
      structure: "A contract-first API development framework. Services and message structures are defined in .proto files (Protocol Buffers). Uses HTTP/2 for transport, enabling features like multiplexing, server push, and efficient binary serialization. Supports unary RPC, server streaming, client streaming, and bi-directional streaming.",
      pros: [
        "High performance and low latency due to efficient binary serialization (Protocol Buffers) and HTTP/2 transport.",
        "Strict contract enforcement through .proto files, with code generation for clients and servers in multiple languages.",
        "Excellent for internal microservice communication where performance and strong contracts are critical.",
        "Natively supports various streaming modes (unary, server-side, client-side, bi-directional) efficiently.",
        "Features like deadlines, cancellation, and metadata are built-in."
      ],
      cons: [
        "Payloads are binary and not human-readable by default, making debugging more challenging without tools (e.g., grpcurl, gRPC UI).",
        "Limited direct browser support; typically requires a proxy like gRPC-Web for browser clients.",
        "Steeper learning curve compared to REST due to Protocol Buffers, .proto definitions, and HTTP/2 concepts.",
        "Tooling ecosystem, while growing, is still not as mature or universally adopted as for REST/JSON APIs.",
        "Less suitable for public-facing APIs where broad, simple client accessibility is paramount."
      ],
      whenToUse: [
        "Internal microservice-to-microservice communication, especially in polyglot environments.",
        "Real-time applications requiring high performance, low latency, and efficient streaming (e.g., financial data, IoT).",
        "Network-constrained environments (e.g., mobile devices) where binary serialization benefits bandwidth.",
        "When strong contract definition and code generation are desired to reduce integration errors."
      ],
      whenNotToUse: [
        "Public-facing APIs where clients need simple HTTP/JSON access without special libraries or proxies.",
        "Browser-based applications without a gRPC-Web proxy setup.",
        "Simple request/response APIs where the overhead of .proto definitions and code generation isn't justified.",
        "When human-readable data formats are essential for debugging or direct consumption."
      ],
      interviewTalkingPoints: [
        "Emphasize its performance benefits from Protocol Buffers and HTTP/2.",
        "Highlight the strong contract definition using .proto files and code generation.",
        "Discuss its suitability for internal microservices and streaming.",
        "Mention limitations like binary format and browser support (gRPC-Web)."
      ],
      defendingYourDecision: "gRPC was chosen for our internal microservice communication due to its high performance, low latency, and strong contract enforcement via Protocol Buffers. This is critical for maintaining reliability and efficiency in our distributed backend. The support for bi-directional streaming also benefits our [specific real-time feature].",
      useCases: "Internal microservice communication, real-time applications requiring high performance and low latency, streaming applications, polyglot environments needing strong contracts."
    },
    {
      id: "websockets",
      name: "WebSockets",
      structure: "Provides a persistent, full-duplex communication channel over a single TCP connection. It is initiated via an HTTP handshake (Upgrade header). Once established, messages (text or binary) can be sent between client and server independently.",
      pros: [
        "Enables real-time, bi-directional communication, allowing servers to push data to clients without explicit client requests.",
        "Low latency for message delivery once the connection is established, as TCP handshake overhead is only at the start.",
        "Efficient for frequent, small messages due to minimal framing overhead per message compared to repeated HTTP requests."
      ],
      cons: [
        "Not suitable for traditional request/response, resource-oriented APIs where REST or GraphQL would be a better fit.",
        "Managing stateful connections can be complex at scale (e.g., connection limits, failover, scaling connection-handling servers).",
        "Proxies, firewalls, and load balancers need to be configured to support WebSocket connections (e.g., handle Upgrade header, long-lived connections).",
        "No built-in support for features like request multiplexing over a single connection (like HTTP/2) or automatic reconnection (must be handled by application logic)."
      ],
      whenToUse: [
        "Real-time applications like chat applications, live sports score updates, collaborative editing tools.",
        "Multiplayer online games requiring low-latency server-client communication.",
        "Streaming financial data or live dashboards where server push is essential.",
        "Any scenario requiring persistent, bi-directional, low-latency communication."
      ],
      whenNotToUse: [
        "Standard CRUD operations or document retrieval where a request-response model is more appropriate.",
        "Infrequent, unidirectional communication from client to server.",
        "When stateless interactions are preferred for scalability and simplicity.",
        "If network intermediaries (proxies, old LBs) do not support WebSockets."
      ],
      interviewTalkingPoints: [
        "Explain its full-duplex, persistent connection nature.",
        "Highlight its use for real-time server-push scenarios like chat and live updates.",
        "Discuss challenges like managing stateful connections at scale and proxy compatibility.",
        "Differentiate it from HTTP polling or long-polling."
      ],
      defendingYourDecision: "WebSockets were selected for our [application type, e.g., live chat feature] because they provide the necessary low-latency, bi-directional communication channel. This allows the server to push messages to clients in real-time without the overhead of repeated HTTP requests, creating a more responsive user experience.",
      useCases: "Real-time applications like chat apps, live sports updates, collaborative editing tools, multiplayer games, financial data streaming."
    }
  ],
  patterns: [
    {
      id: "pagination_offset",
      name: "Offset Pagination (Page-Based)",
      description: "Client requests a specific page number and page size (e.g., `/items?page=2&limit=20` or `/items?offset=20&limit=20`). The server skips `offset` (or `(page-1)*limit`) items and returns the next `limit` items from the dataset.",
      pros: [
        "Easy to implement and understand for both client and server.",
        "Allows clients to directly jump to any specific page if they know the page number or can calculate the offset."
      ],
      cons: [
        "Can be inefficient for large datasets (the 'deep pagination' problem); databases may struggle to efficiently `SKIP` or `OFFSET` millions of rows.",
        "Prone to issues with data consistency if items are frequently added or removed from the dataset while paginating, leading to skipped or repeated items across pages."
      ],
      whenToUse: [
        "Smaller datasets where performance for deep pages is not a concern.",
        "Applications where users frequently need to jump to specific, non-sequential pages.",
        "When simplicity of implementation is a higher priority than perfect consistency on rapidly changing datasets."
      ],
      whenNotToUse: [
        "Very large datasets where `OFFSET` queries become slow.",
        "Real-time feeds or frequently updated lists where items shifting pages would lead to a poor user experience (skipped or duplicate entries).",
        "Infinite scrolling interfaces where cursor-based pagination is generally more robust."
      ],
      interviewTalkingPoints: [
        "Explain how it works using `limit` and `offset` (or page number).",
        "Mention its simplicity and ability to jump to pages.",
        "Critically, discuss the performance issues with large offsets and data consistency problems with frequently changing data."
      ],
      defendingYourDecision: "Offset pagination was chosen for [specific resource, e.g., user transaction history] because users often need to jump to specific pages (e.g., 'page 5 of results'), and the dataset per user is generally manageable, mitigating deep pagination performance issues. For more dynamic feeds, we use cursor pagination.",
      useCases: "Smaller datasets, applications where users frequently jump to specific pages."
    },
    {
      id: "pagination_cursor",
      name: "Cursor-Based Pagination (Seek Method / Keyset Pagination)",
      description: "Client receives a 'cursor' (an opaque pointer or a value from the last item of the current page, e.g., timestamp or ID) with a page of results. For the next page, the client sends this cursor back to the server. The server then returns items that come after (or before) the item indicated by the cursor, based on a stable sort order.",
      pros: [
        "More performant for large, frequently changing datasets as it avoids `OFFSET` database operations; queries typically use `WHERE sort_key > cursor_value`.",
        "Provides more stable pagination results, avoiding issues with skipped or repeated items when data changes frequently.",
        "Can be more stateless on the server as the cursor contains the necessary information to fetch the next set."
      ],
      cons: [
        "Does not allow clients to directly jump to an arbitrary page number; navigation is strictly sequential (next/previous).",
        "Slightly more complex to implement than offset pagination, requiring a stable and unique sort key (often a combination of fields).",
        "The cursor can sometimes become complex if it needs to encode multiple sort conditions."
      ],
      whenToUse: [
        "Large, dynamic datasets like feeds, timelines, or any list where data is frequently added or reordered.",
        "Infinite scrolling interfaces where sequential loading is the natural user experience.",
        "When data consistency and performance at scale are more important than the ability to jump to specific pages."
      ],
      whenNotToUse: [
        "When users absolutely need to jump to arbitrary page numbers (e.g., 'Go to page 500').",
        "Very small, static datasets where the simplicity of offset pagination is sufficient.",
        "If there isn't a reliable, unique, and sequential key to use for the cursor."
      ],
      interviewTalkingPoints: [
        "Explain that it uses a cursor (pointer to an item) to fetch the next set.",
        "Highlight its performance benefits for large datasets (avoids offset) and stability with changing data.",
        "Mention the limitation of not being able to jump to arbitrary pages.",
        "Discuss the need for a stable sort key."
      ],
      defendingYourDecision: "Cursor-based pagination was implemented for our [feed/timeline] because it provides stable and performant pagination over a large, constantly changing dataset. This avoids the common issues of skipped or duplicate items seen with offset pagination and ensures efficient database queries even for deep navigation, critical for a good user experience with infinite scrolling.",
      useCases: "Large, dynamic datasets (e.g., feeds, timelines), infinite scrolling interfaces."
    },
    {
      id: "rate_limiting_algorithms",
      name: "Rate Limiting Algorithms",
      description: "Strategies to control the number of requests a client can make. Common algorithms: Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log, Sliding Window Counter.",
      pros: ["Protects API from abuse and overload.", "Ensures fair usage among clients."],
      cons: ["Requires careful tuning to avoid hampering legitimate users.", "Distributed rate limiting can be complex."],
      useCases: "Public APIs, shared internal APIs, protecting backend resources."
    },
    {
      id: "api_versioning_uri",
      name: "API Versioning (URI Path)",
      description: "Version is included in the URI path (e.g., /api/v1/resource, /api/v2/resource).",
      pros: ["Explicit and clear to users.", "Easy to route in load balancers/gateways."],
      cons: ["Violates REST principle that URI should represent a unique resource (versioned URI means different URIs for same resource)."],
      useCases: "Common for public APIs where clarity is paramount."
    },
    {
      id: "api_versioning_header",
      name: "API Versioning (Custom Header)",
      description: "Version is specified in a custom HTTP header (e.g., Api-Version: 1 or Accept: application/vnd.myapi.v1+json).",
      pros: ["Keeps URIs clean.", "Considered more RESTful by some."],
      cons: ["Less obvious to users browsing the API.", "Requires clients to handle headers correctly."],
      useCases: "APIs where clean URIs are a high priority, internal APIs."
    },
    {
      id: "gateway_aggregation",
      name: "API Gateway Aggregation",
      description: "An API Gateway acts as a single entry point, receives client requests, invokes multiple microservices, aggregates their responses, and returns a consolidated response to the client.",
      pros: ["Simplifies client interaction with microservices.", "Reduces chattiness between client and backend.", "Can handle cross-cutting concerns like authentication, logging."],
      cons: ["Gateway can become a bottleneck or single point of failure if not designed well.", "Adds another hop and potential latency."],
      useCases: "Microservices architectures to provide a unified frontend API."
    },
    {
      id: "bff",
      name: "Backend for Frontend (BFF)",
      description: "An API layer tailored to the specific needs of a particular client application (e.g., a BFF for a mobile app, another for a web app). It aggregates calls to downstream services and formats data for the frontend.",
      pros: ["Optimizes API for specific client needs, reducing over/under-fetching.", "Allows frontends to evolve independently.", "Can simplify frontend logic."],
      cons: ["Can lead to code duplication if multiple BFFs share common logic.", "Increases the number of services to manage."],
      useCases: "Applications with multiple distinct frontend clients (e.g., web, mobile, desktop) that have different data and interaction requirements."
    },
    {
      id: "api_versioning_general",
      name: "API Versioning", // Changed from patternName to name for consistency
      description: "Techniques for evolving APIs without breaking existing clients (URL versioning, header versioning, semantic versioning).",
      strategies: [
        { name: "Path Versioning", detail: "Include version in URL (e.g., /v1/users)." },
        { name: "Header Versioning", detail: "Use custom headers to indicate version." }
      ],
      pros: ["Clear separation of versions", "Easy to deprecate old versions"],
      cons: ["URL clutter (for path versioning)", "Clients must update headers (for header versioning)"] // Clarified cons
    },
    {
      id: "idempotency_key_pattern",
      name: "Idempotency Key", // Changed from patternName to name for consistency
      description: "A unique key provided by the client to ensure repeated requests do not create duplicates (useful for payment or create operations).",
      pros: ["Prevents duplicate side-effects", "Simplifies retry logic"],
      cons: ["Requires key management on server", "Potential for resource leaks if keys not expired"],
      example: "Clients send X-Idempotency-Key header with POST /orders to prevent double ordering."
    }
  ],
  security: [
    {
      id: "oauth2",
      name: "OAuth 2.0",
      description: "An authorization framework that enables third-party applications to access web resources on behalf of a user, without exposing user credentials. Defines roles like Resource Owner, Client, Authorization Server, Resource Server, and grant types (e.g., Authorization Code, Client Credentials).",
      importance: "Standard for delegated authorization for third-party clients."
    },
    {
      id: "jwt",
      name: "JSON Web Tokens (JWT)",
      description: "A compact, URL-safe means of representing claims to be transferred between two parties. Often used for stateless authentication tokens. Contains a header, payload (claims), and signature.",
      importance: "Popular for transmitting authentication and authorization information in a stateless manner."
    },
    {
      id: "api_keys",
      name: "API Keys",
      description: "Simple tokens assigned to applications or users to grant access to an API. Typically sent in a request header (e.g., X-API-Key).",
      importance: "Easy to implement for basic authentication, often used for server-to-server communication or identifying projects."
    },
    {
      id: "input_validation",
      name: "Input Validation",
      description: "Validating all data received by the API (e.g., path parameters, query parameters, request body) for type, format, length, range, and allowed characters to prevent injection attacks and other security vulnerabilities.",
      importance: "Critical for preventing common vulnerabilities like SQL injection, XSS, command injection."
    },
    {
      id: "tls_ssl",
      name: "TLS/SSL (HTTPS)",
      description: "Using Transport Layer Security (TLS) or its predecessor Secure Sockets Layer (SSL) to encrypt data in transit between the client and the API server (HTTPS).",
      importance: "Essential for protecting data confidentiality and integrity from eavesdropping and man-in-the-middle attacks."
    },
    {
      id: "owasp_api_top10",
      name: "OWASP API Security Top 10",
      description: "A list of the most critical security risks to APIs identified by the Open Web Application Security Project (OWASP). Includes issues like Broken Object Level Authorization, Broken User Authentication, Excessive Data Exposure, etc.",
      importance: "Provides a checklist of common vulnerabilities to address during API design and development."
    },
    {
      id: "cors",
      name: "Cross-Origin Resource Sharing (CORS)",
      description: "A mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. Important for web-accessible APIs.",
      importance: "Enables secure cross-domain API requests from web browsers."
    }
  ],
  scenarios: [
    {
      id: "social_media_api",
      title: "Designing an API for a Social Media Platform",
      description: "Needs to support feeds, user profiles, posts, comments, likes, real-time updates.",
      considerations: [
        "GraphQL for flexible data fetching for feeds and complex client views.",
        "REST for simpler resource management (e.g., user profiles, settings).",
        "WebSockets for real-time notifications and chat.",
        "Cursor-based pagination for feeds.",
        "OAuth 2.0 for third-party app integrations.",
        "Rate limiting to prevent abuse."
      ]
    },
    {
      id: "ecommerce_api",
      title: "Designing an API for an E-commerce Service",
      description: "Needs to handle product catalogs, orders, inventory, payments, user accounts.",
      considerations: [
        "REST API for clear resource management (products, orders, customers).",
        "Idempotency for payment and order submission endpoints.",
        "Strong authentication and authorization (OAuth 2.0, JWTs).",
        "Webhook notifications for order status updates.",
        "API versioning for evolving product and order features."
      ]
    },
    {
      id: "public_data_api",
      title: "Designing an API for a Public Data Provider (e.g., Weather Data)",
      description: "Provides access to large datasets, needs to be robust and easy to use for many developers.",
      considerations: [
        "REST for broad accessibility and standard tooling.",
        "Clear documentation (OpenAPI/Swagger).",
        "API keys for authentication and usage tracking.",
        "Robust rate limiting and quotas.",
        "Offset or cursor pagination depending on data characteristics.",
        "Consider GraphQL for advanced querying capabilities if users have diverse data needs."
      ]
    },
    {
      id: "tweetApi", // Changed from key to id for consistency
      title: "Designing the Tweet API",
      description: "Define endpoints for creating, reading, and deleting tweets. Consider rate limiting and idempotency.",
      problem: "High read/write ratio and need to support millions of tweets per day.",
      solution: "RESTful endpoints: POST /tweets (idempotent with X-Idempotency-Key), GET /tweets/{id}, GET /users/{id}/tweets?limit=50. Use caching on GET endpoints and paginate with cursors.",
      challenges: "Handling pagination, rate-limiting abusive clients, securing write endpoints.",
      learnings: "Idempotency keys simplify retries; cursor-based pagination scales better than offset pagination."
    },
    {
      id: "ecommerceGraphQL", // Changed from key to id for consistency
      title: "GraphQL API for E-Commerce",
      description: "Expose product, category, and cart data via a single GraphQL endpoint with nested queries.",
      problem: "Clients need to display products with reviews and seller info in one screen.",
      solution: "Define types Product, Review, Seller and nested query fields; use DataLoader to batch and cache database calls.",
      challenges: "Prevent n+1 query problem, secure field-level access.",
      learnings: "DataLoader is essential for performance; schema stitching helps modularize services."
    }
  ],
  flashcards: [
    {
      front: "What are the main HTTP methods used in REST APIs?",
      back: "GET (retrieve), POST (create), PUT (update/replace), DELETE (remove), PATCH (partial update)."
    },
    {
      front: "What problem does GraphQL aim to solve regarding data fetching?",
      back: "Over-fetching (getting more data than needed) and under-fetching (needing multiple requests to get all required data)."
    },
    {
      front: "What is the role of Protocol Buffers in gRPC?",
      back: "They are used as the Interface Definition Language (IDL) to define the structure of messages and service interfaces, enabling efficient binary serialization."
    },
    {
      front: "Why is idempotency important in API design?",
      back: "It allows clients to safely retry requests without unintended side effects, which is crucial in unreliable networks."
    },
    {
      front: "Name two common API versioning strategies.",
      back: "URI path versioning (e.g., /v1/users) and Header versioning (e.g., Api-Version: 1)."
    }
  ],
  decisionTree: {
    title: "API Protocol/Style Chooser (Placeholder)",
    description: "This guide will help you select an appropriate API protocol or style based on your requirements. (Coming Soon)"
  },
  externalResources: [
    {
      id: "rest_msdn",
      title: "Microsoft REST API Guidelines",
      url: "https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md",
      description: "A comprehensive set of guidelines for designing REST APIs."
    },
    {
      id: "graphql_org",
      title: "GraphQL Official Website",
      url: "https://graphql.org/",
      description: "Official documentation and resources for GraphQL."
    },
    {
      id: "grpc_io",
      title: "gRPC Official Website",
      url: "https://grpc.io/",
      description: "Official documentation and resources for gRPC."
    },
    {
      id: "openapi_spec",
      title: "OpenAPI Specification",
      url: "https://swagger.io/specification/",
      description: "The official OpenAPI Specification documentation."
    },
    {
      id: "owasp_api_security",
      title: "OWASP API Security Project",
      url: "https://owasp.org/www-project-api-security/",
      description: "Resources and best practices for API security from OWASP."
    }
  ]
};
