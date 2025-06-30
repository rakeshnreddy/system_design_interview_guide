export const apiDesignAppData = {
  title: "API Design",
  overview: `An API (Application Programming Interface) is a set of rules, protocols, and tools that allows different software applications to communicate with each other. In system design, APIs are the fundamental building blocks for creating modular, scalable, and maintainable systems. They define how various components of a system, or different systems altogether, interact, exchange data, and invoke functionality without needing to know the intricacies of each other's internal implementations. This abstraction enables decoupling, promotes reusability, and facilitates integration between disparate services, whether they are internal microservices or external third-party services.

APIs are the backbone of modern software, enabling services like Google Maps, Twitter, and Stripe to expose their functionality and data for integration into other applications.

APIs can be broadly categorized as synchronous or asynchronous. {{Synchronous APIs}} require the client to send a request and wait for an immediate response from the server. This blocking nature is suitable for operations where the client needs a quick confirmation or data to proceed, like retrieving user details. In contrast, {{Asynchronous APIs}} allow the client to send a request and continue processing without waiting for an immediate response; the server processes the request in the background and notifies the client upon completion, often via {{Webhooks}} or [message queues](#/messaging-queues). The choice between synchronous and asynchronous design significantly impacts system responsiveness, resource utilization, and {{Fault Tolerance}}. For example, long-running tasks like video processing are better suited for asynchronous APIs to avoid tying up client resources, while quick data lookups benefit from synchronous interaction. Design choices here are crucial for user experience and system efficiency.`,
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
      term: "{{REST (Representational State Transfer)}}",
      definition: "An architectural style for designing networked applications, based on {{HTTP}} methods, URIs for resources, and {{Statelessness|Stateless}} communication."
    },
    {
      term: "{{GraphQL}}",
      definition: "A query language for APIs and a server-side runtime for executing those queries by using a type system you define for your data."
    },
    {
      term: "{{gRPC (Google Remote Procedure Call)}}",
      definition: "A high-performance, open-source universal {{RPC (Remote Procedure Call)}} framework. Uses {{HTTP/2}} for transport and {{Protocol Buffers}} as the interface description language."
    },
    {
      term: "{{Idempotency}}",
      definition: "An operation is idempotent if making the same request multiple times produces the same result as making it once (e.g., PUT, DELETE)."
    },
    {
      term: "{{Pagination}}",
      definition: "The process of dividing a large dataset into smaller, manageable chunks (pages) for API responses. Common methods: {{Offset Pagination (Page-Based)|Offset-based}}, {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|Cursor-based}}."
    },
    {
      term: "{{Rate Limiting}}",
      definition: "Restricting the number of API requests a client can make within a certain time window to prevent abuse and ensure fair usage."
    },
    {
      term: "{{API Versioning}}",
      definition: "Managing changes to an API over time by creating distinct versions (e.g., /v1/users, /v2/users) to avoid breaking existing client integrations."
    },
    {
      term: "{{Authentication (AuthN)}}",
      definition: "The process of verifying the identity of a client or user trying to access the API (e.g., {{API Keys}}, {{OAuth 2.0}} tokens)."
    },
    {
      term: "{{Authorization (AuthZ)}}",
      definition: "The process of determining whether an authenticated client or user has permission to perform a specific action or access a particular resource."
    },
    {
      term: "{{OpenAPI Specification (Swagger)}}",
      definition: "A standard, language-agnostic interface description for {{RESTful APIs}}, which allows both humans and computers to discover and understand the capabilities of the service without access to source code or documentation."
    },
    {
      term: "{{Webhook}}",
      definition: "An {{HTTP}} callback or {{HTTP POST}} that occurs when something happens; a simple event-notification via {{HTTP POST}}. Used for asynchronous communication from server to client."
    },
    {
      term: "{{Statelessness}}",
      definition: "A characteristic of {{REST APIs}} where each request from a client to a server must contain all the information needed to understand the request, and cannot take advantage of any stored context on the server."
    },
    {
      id: "hypermedia", // Added id for consistency
      term: "{{HATEOAS (Hypermedia As The Engine Of Application State)}}",
      definition: "{{Hypermedia As The Engine Of Application State}}: {{REST}} constraint where responses include hyperlinks for discoverability."
    },
    {
      id: "schemaFirst", // Added id for consistency
      term: "{{Schema-First Design}}",
      definition: "Design approach where the API/schema is defined before implementation (common in {{GraphQL}})."
    },
    {
      id: "http11",
      term: "{{HTTP/1.1}}",
      definition: "A version of the Hypertext Transfer Protocol. It introduced features like persistent connections, pipelining, and chunked encoding, but can suffer from head-of-line blocking for multiple requests over a single connection."
    },
    {
      id: "http2",
      term: "{{HTTP/2}}",
      definition: "A major revision of the HTTP network protocol. Key features include request multiplexing over a single TCP connection, header compression (HPACK), and server push, leading to improved performance and reduced latency compared to {{HTTP/1.1}}."
    },
    {
      id: "protocol_buffers",
      term: "{{Protocol Buffers (Protobuf)}}",
      definition: "A language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. Developed by Google, it's often used with {{gRPC (Google Remote Procedure Call)|gRPC}}."
    }
  ],
  protocols: [
    {
      id: "rest",
      name: "{{REST (Representational State Transfer)}}",
      structure: "Uses standard {{HTTP}} methods (GET, POST, PUT, DELETE, PATCH), URIs to identify resources (e.g., /users, /products/{id}), and typically {{JSON}} or {{XML}} for data exchange. Emphasizes {{Statelessness}}, {{Uniform Interface}}, and {{Cacheability}}.",
      pros: [
        "Simple and familiar due to its use of standard {{HTTP}} methods and status codes, making it easy to learn and use.",
        "Widely adopted with a vast ecosystem of tools, libraries, and gateways.",
        "{{Statelessness}} promotes {{Scalability}} as any server can handle any request.",
        "Leverages {{HTTP Caching}} mechanisms effectively for better performance with cacheable resources."
      ],
      cons: [
        "Can lead to {{Over-fetching}} (retrieving more data than needed) or {{Under-fetching}} (requiring multiple requests to get all necessary data) for complex data requirements.",
        "No strict contract enforcement out-of-the-box; relies on conventions and documentation (e.g., {{OpenAPI Specification (Swagger)|OpenAPI/Swagger}}) which can drift from implementation.",
        "Can be verbose with metadata ({{HTTP Headers}}) and data formats like {{JSON}}/{{XML}} compared to binary protocols.",
        "Managing multiple versions can be complex (URI, headers, etc.)."
      ],
      whenToUse: [
        "Public APIs where ease of adoption and broad compatibility are important.",
        "Standard web applications and mobile application backends performing {{CRUD}} operations on well-defined resources.",
        "Systems where {{Statelessness}} and {{Cacheability}} are key requirements.",
        "When simplicity and leveraging existing {{HTTP}} infrastructure are priorities."
      ],
      whenNotToUse: [
        "Applications with complex data fetching needs where clients need to specify the exact data to avoid over/under-fetching ({{GraphQL}} might be better).",
        "High-performance internal {{Microservice}} communication where the overhead of {{HTTP}}/{{JSON}} is significant ({{gRPC (Google Remote Procedure Call)|gRPC}} might be better).",
        "Real-time bi-directional communication ({{WebSockets}} are designed for this).",
        "When a very strict contract between client and server is required from the start ({{gRPC (Google Remote Procedure Call)|gRPC}}'s .proto files offer this)."
      ],
      interviewTalkingPoints: [
        "Discuss its reliance on {{HTTP}} verbs and status codes.",
        "Highlight {{Statelessness}} and {{Cacheability}} as key principles.",
        "Mention common issues like {{Over-fetching}}/{{Under-fetching}}.",
        "Contrast with {{GraphQL}} for data fetching flexibility and {{gRPC (Google Remote Procedure Call)|gRPC}} for performance."
      ],
      defendingYourDecision: "{{REST (Representational State Transfer)|REST}} was chosen for its ubiquity, simplicity, and alignment with {{HTTP}} standards, making it easily consumable by a wide range of clients. For our resource-oriented services, {{REST (Representational State Transfer)|REST}} provides a natural and well-understood interaction model. While we considered {{GraphQL}} for its flexible querying, the added complexity wasn't justified for our current {{CRUD}}-heavy workload and well-defined resources. {{OpenAPI Specification (Swagger)|OpenAPI}} helps us maintain a clear contract.",
      useCases: "Public APIs, web applications, mobile application backends, {{CRUD}} operations on resources, systems where simplicity and standard {{HTTP}} are preferred."
    },
    {
      id: "graphql",
      name: "{{GraphQL}}",
      // 'description' from prompt is mapped to 'structure' here for consistency
      structure: "GraphQL was developed by Facebook to optimize data fetching for their complex mobile application news feeds, addressing issues of over-fetching (requesting too much data) and under-fetching (needing multiple requests to get all necessary data) common with traditional REST APIs. It is a query language for APIs and a server-side runtime for executing those queries by using a type system you define for your data. Clients request exactly the data they need via a single endpoint, often `/graphql`.",
      pros: [
        "Solves {{Over-fetching}} and {{Under-fetching}}: Clients request only the specific fields they need, leading to more efficient data transfer.",
        "Strongly typed schema with introspection: The schema defines all possible data types and fields, and clients can query the schema itself (introspection) to understand the API's capabilities.",
        "Evolvable without versioning"
      ],
      cons: [
        "Increased server complexity",
        "{{Caching}} can be more difficult",
        "Query performance must be carefully managed"
      ],
      whenToUse: [ // Mapped from prompt's whenToUse (string) to array for consistency
        "Ideal when clients need flexible queries or multiple related resources in one request (e.g., mobile apps)."
      ],
      whenNotToUse: [ // Mapped from prompt's whenNotToUse (string) to array for consistency
        "Avoid for simple {{CRUD}} APIs where {{REST (Representational State Transfer)|REST}} suffices or when {{Caching|caching at HTTP layer}} is critical."
      ],
      interviewTalkingPoints: [
        "Explain schema design and resolver functions.",
        "Discuss how {{GraphQL}} enables client-driven requests.",
        "Mention potential performance pitfalls with deeply nested queries."
      ],
      defendingYourDecision: "We chose {{GraphQL}} to reduce round-trips for our mobile clients that need aggregated data in a single call.",
      useCases: [ // Mapped from prompt's useCases (array)
        "Mobile application backends",
        "APIs with evolving front-end requirements"
      ],
      realWorldExample: "Facebook's mobile app utilizes GraphQL extensively to efficiently fetch data for its dynamic news feed and complex UI. This allows the app to request only the necessary data fields from multiple resources (like users, posts, comments, images) in a single network call, significantly improving performance and reducing data usage on mobile devices."
    },
    {
      id: "grpc",
      name: "{{gRPC (Google Remote Procedure Call)}}",
      structure: "gRPC was developed by Google and is extensively used internally for high-performance, inter-service communication in their microservices architectures. It leverages {{HTTP/2}} for efficiency and {{Protocol Buffers}} for schema definition. It's a contract-first API development framework where services and message structures are defined in `.proto` files ({{Protocol Buffers}}). This enables features like {{Multiplexing}}, {{Server Push}}, and efficient binary serialization. gRPC supports unary {{RPC (Remote Procedure Call)|RPC}}, server streaming, client streaming, and bi-directional streaming.",
      pros: [
        "High performance and low {{Latency}} due to efficient binary serialization ({{Protocol Buffers}}) and {{HTTP/2}} transport.",
        "Strict contract enforcement through `.proto` files, with code generation for clients and servers in multiple languages.",
        "Excellent for internal {{Microservice}} communication where performance and strong contracts are critical.",
        "Natively supports various streaming modes (unary, server-side, client-side, bi-directional) efficiently.",
        "Features like deadlines, cancellation, and metadata are built-in."
      ],
      cons: [
        "Payloads are binary and not human-readable by default, making debugging more challenging without tools (e.g., {{grpcurl}}, {{gRPC UI}}).",
        "Limited direct browser support; typically requires a proxy like {{gRPC-Web}} for browser clients.",
        "Steeper learning curve compared to {{REST (Representational State Transfer)|REST}} due to {{Protocol Buffers}}, .proto definitions, and {{HTTP/2}} concepts.",
        "Tooling ecosystem, while growing, is still not as mature or universally adopted as for {{REST (Representational State Transfer)|REST}}/{{JSON}} APIs.",
        "Less suitable for public-facing APIs where broad, simple client accessibility is paramount."
      ],
      whenToUse: [
        "Internal {{Microservice}}-to-{{Microservice}} communication, especially in polyglot environments.",
        "Real-time applications requiring high performance, low {{Latency}}, and efficient streaming (e.g., financial data, IoT).",
        "Network-constrained environments (e.g., mobile devices) where binary serialization benefits bandwidth.",
        "When strong contract definition and code generation are desired to reduce integration errors."
      ],
      whenNotToUse: [
        "Public-facing APIs where clients need simple {{HTTP}}/{{JSON}} access without special libraries or proxies.",
        "Browser-based applications without a {{gRPC-Web}} proxy setup.",
        "Simple request/response APIs where the overhead of .proto definitions and code generation isn't justified.",
        "When human-readable data formats are essential for debugging or direct consumption."
      ],
      interviewTalkingPoints: [
        "Emphasize its performance benefits from {{Protocol Buffers}} and {{HTTP/2}}.",
        "Highlight the strong contract definition using .proto files and code generation.",
        "Discuss its suitability for internal {{Microservices}} and streaming.",
        "Mention limitations like binary format and browser support ({{gRPC-Web}})."
      ],
      defendingYourDecision: "{{gRPC (Google Remote Procedure Call)|gRPC}} was chosen for our internal {{Microservice}} communication due to its high performance, low {{Latency}}, and strong contract enforcement via {{Protocol Buffers}}. This is critical for maintaining reliability and efficiency in our distributed backend. The support for bi-directional streaming also benefits our [specific real-time feature].",
      useCases: "Internal {{Microservice}} communication, real-time applications requiring high performance and low {{Latency}}, streaming applications, polyglot environments needing strong contracts.",
      realWorldExample: "Google uses gRPC for a vast number of its internal microservices. Netflix also leverages gRPC for a significant portion of its inter-service communication to handle its massive scale and performance needs, particularly for backend services that require efficient, strongly-typed communication."
    },
    {
      id: "websockets",
      name: "{{WebSockets}}",
      structure: "Provides a persistent, full-duplex communication channel over a single {{TCP}} connection. It is initiated via an {{HTTP}} handshake (Upgrade header). Once established, messages (text or binary) can be sent between client and server independently.",
      pros: [
        "Enables real-time, bi-directional communication, allowing servers to push data to clients without explicit client requests.",
        "Low {{Latency}} for message delivery once the connection is established, as {{TCP}} handshake overhead is only at the start.",
        "Efficient for frequent, small messages due to minimal framing overhead per message compared to repeated {{HTTP}} requests."
      ],
      cons: [
        "Not suitable for traditional request/response, resource-oriented APIs where {{REST (Representational State Transfer)|REST}} or {{GraphQL}} would be a better fit.",
        "Managing stateful connections can be complex at scale (e.g., connection limits, failover, scaling connection-handling servers).",
        "Proxies, firewalls, and [load balancers](#/load-balancing) need to be configured to support {{WebSocket}} connections (e.g., handle Upgrade header, long-lived connections).",
        "No built-in support for features like request {{Multiplexing}} over a single connection (like {{HTTP/2}}) or automatic reconnection (must be handled by application logic)."
      ],
      whenToUse: [
        "Real-time applications like chat applications, live sports score updates, collaborative editing tools.",
        "Multiplayer online games requiring low-latency server-client communication.",
        "Streaming financial data or live dashboards where server push is essential.",
        "Any scenario requiring persistent, bi-directional, low-latency communication."
      ],
      whenNotToUse: [
        "Standard {{CRUD}} operations or document retrieval where a request-response model is more appropriate.",
        "Infrequent, unidirectional communication from client to server.",
        "When {{Statelessness|stateless interactions}} are preferred for {{Scalability}} and simplicity.",
        "If network intermediaries (proxies, old LBs) do not support {{WebSockets}}."
      ],
      interviewTalkingPoints: [
        "Explain its full-duplex, persistent connection nature.",
        "Highlight its use for real-time server-push scenarios like chat and live updates.",
        "Discuss challenges like managing stateful connections at scale and proxy compatibility.",
        "Differentiate it from {{HTTP Polling}} or {{Long Polling}}."
      ],
      defendingYourDecision: "{{WebSockets}} were selected for our [application type, e.g., live chat feature] because they provide the necessary low-latency, bi-directional communication channel. This allows the server to push messages to clients in real-time without the overhead of repeated {{HTTP}} requests, creating a more responsive user experience.",
      useCases: "Real-time applications like chat apps, live sports updates, collaborative editing tools, multiplayer games, financial data streaming."
    }
  ],
  patterns: [
    {
      id: "pagination_offset",
      name: "{{Offset Pagination (Page-Based)}}",
      description: "Client requests a specific page number and page size (e.g., `/items?page=2&limit=20` or `/items?offset=20&limit=20`). The server skips `offset` (or `(page-1)*limit`) items and returns the next `limit` items from the [database](#/databases).",
      pros: [
        "Easy to implement and understand for both client and server.",
        "Allows clients to directly jump to any specific page if they know the page number or can calculate the offset."
      ],
      cons: [
        "Can be inefficient for large datasets (the '{{Deep Pagination}}' problem); [databases](#/databases) may struggle to efficiently `SKIP` or `OFFSET` millions of rows.",
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
        "{{Infinite Scrolling}} interfaces where {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|cursor-based pagination}} is generally more robust."
      ],
      interviewTalkingPoints: [
        "Explain how it works using `limit` and `offset` (or page number).",
        "Mention its simplicity and ability to jump to pages.",
        "Critically, discuss the performance issues with large offsets and data consistency problems with frequently changing data."
      ],
      defendingYourDecision: "{{Offset Pagination (Page-Based)|Offset pagination}} was chosen for [specific resource, e.g., user transaction history] because users often need to jump to specific pages (e.g., 'page 5 of results'), and the dataset per user is generally manageable, mitigating {{Deep Pagination}} performance issues. For more dynamic feeds, we use {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|cursor pagination}}.",
      useCases: "Smaller datasets, applications where users frequently jump to specific pages."
    },
    {
      id: "pagination_cursor",
      name: "{{Cursor-Based Pagination (Seek Method / Keyset Pagination)}}",
      description: "Client receives a 'cursor' (an opaque pointer or a value from the last item of the current page, e.g., timestamp or ID) with a page of results. For the next page, the client sends this cursor back to the server. The server then returns items that come after (or before) the item indicated by the cursor, based on a stable sort order.",
      pros: [
        "More performant for large, frequently changing datasets as it avoids `OFFSET` [database](#/databases) operations; queries typically use `WHERE sort_key > cursor_value`.",
        "Provides more stable pagination results, avoiding issues with skipped or repeated items when data changes frequently.",
        "Can be more {{Statelessness|stateless}} on the server as the cursor contains the necessary information to fetch the next set."
      ],
      cons: [
        "Does not allow clients to directly jump to an arbitrary page number; navigation is strictly sequential (next/previous).",
        "Slightly more complex to implement than {{Offset Pagination (Page-Based)|offset pagination}}, requiring a stable and unique sort key (often a combination of fields).",
        "The cursor can sometimes become complex if it needs to encode multiple sort conditions."
      ],
      whenToUse: [
        "Large, dynamic datasets like feeds, timelines, or any list where data is frequently added or reordered.",
        "{{Infinite Scrolling}} interfaces where sequential loading is the natural user experience.",
        "When data consistency and performance at scale are more important than the ability to jump to specific pages."
      ],
      whenNotToUse: [
        "When users absolutely need to jump to arbitrary page numbers (e.g., 'Go to page 500').",
        "Very small, static datasets where the simplicity of {{Offset Pagination (Page-Based)|offset pagination}} is sufficient.",
        "If there isn't a reliable, unique, and sequential key to use for the cursor."
      ],
      interviewTalkingPoints: [
        "Explain that it uses a cursor (pointer to an item) to fetch the next set.",
        "Highlight its performance benefits for large datasets (avoids offset) and stability with changing data.",
        "Mention the limitation of not being able to jump to arbitrary pages.",
        "Discuss the need for a stable sort key."
      ],
      defendingYourDecision: "{{Cursor-Based Pagination (Seek Method / Keyset Pagination)|Cursor-based pagination}} was implemented for our [feed/timeline] because it provides stable and performant pagination over a large, constantly changing dataset. This avoids the common issues of skipped or duplicate items seen with {{Offset Pagination (Page-Based)|offset pagination}} and ensures efficient [database](#/databases) queries even for deep navigation, critical for a good user experience with {{Infinite Scrolling}}.",
      useCases: "Large, dynamic datasets (e.g., feeds, timelines), {{Infinite Scrolling}} interfaces."
    },
    {
      id: "rate_limiting_algorithms",
      name: "{{Rate Limiting Algorithms}}",
      description: "Strategies to control the number of requests a client can make. Common algorithms: {{Token Bucket}}, {{Leaky Bucket}}, {{Fixed Window Counter}}, {{Sliding Window Log}}, {{Sliding Window Counter}}.",
      pros: ["Protects API from abuse and overload.", "Ensures fair usage among clients."],
      cons: ["Requires careful tuning to avoid hampering legitimate users.", "Distributed {{Rate Limiting}} can be complex."],
      useCases: "Public APIs, shared internal APIs, protecting backend resources."
    },
    {
      id: "api_versioning_uri",
      name: "{{API Versioning (URI Path)}}",
      description: "Version is included in the URI path (e.g., /api/v1/resource, /api/v2/resource).",
      pros: ["Explicit and clear to users.", "Easy to route in [load balancers](#/load-balancing)/gateways."],
      cons: ["Violates {{REST (Representational State Transfer)|REST}} principle that URI should represent a unique resource (versioned URI means different URIs for same resource)."],
      useCases: "Common for public APIs where clarity is paramount."
    },
    {
      id: "api_versioning_header",
      name: "{{API Versioning (Custom Header)}}",
      description: "Version is specified in a custom {{HTTP Header}} (e.g., Api-Version: 1 or Accept: application/vnd.myapi.v1+json).",
      pros: ["Keeps URIs clean.", "Considered more {{RESTful APIs|RESTful}} by some."],
      cons: ["Less obvious to users browsing the API.", "Requires clients to handle headers correctly."],
      useCases: "APIs where clean URIs are a high priority, internal APIs."
    },
    {
      id: "gateway_aggregation",
      name: "{{API Gateway Aggregation}}",
      description: "An {{API Gateway}} acts as a single entry point, receives client requests, invokes multiple {{Microservices}}, aggregates their responses, and returns a consolidated response to the client.",
      pros: ["Simplifies client interaction with {{Microservices}}.", "Reduces chattiness between client and backend.", "Can handle cross-cutting concerns like {{Authentication (AuthN)|authentication}}, {{Logging}}."],
      cons: ["Gateway can become a {{Bottleneck}} or {{Single Point of Failure (SPOF)|single point of failure}} if not designed well.", "Adds another hop and potential {{Latency}}."],
      useCases: "{{Microservices}} architectures to provide a unified frontend API."
    },
    {
      id: "bff",
      name: "{{Backend for Frontend (BFF)}}",
      description: "An API layer tailored to the specific needs of a particular client application (e.g., a BFF for a mobile app, another for a web app). It aggregates calls to downstream services and formats data for the frontend.",
      pros: ["Optimizes API for specific client needs, reducing {{Over-fetching}}/{{Under-fetching}}.", "Allows frontends to evolve independently.", "Can simplify frontend logic."],
      cons: ["Can lead to code duplication if multiple BFFs share common logic.", "Increases the number of services to manage."],
      useCases: "Applications with multiple distinct frontend clients (e.g., web, mobile, desktop) that have different data and interaction requirements."
    },
    {
      id: "api_versioning_strategies", // Changed id for clarity
      name: "{{API Versioning Strategies}}",
      description: "As APIs evolve, changes are inevitable. API versioning is crucial for introducing these changes without breaking existing client integrations. The primary goal is to allow clients to continue using an older version of the API while new clients can adopt newer versions. Maintaining backward compatibility for as long as feasible is a key principle, but when breaking changes are necessary, a versioning strategy must be in place.",
      strategies: [
        {
          name: "{{URI Path Versioning}}",
          detail: "The API version is included directly in the URL path. Example: `/api/v1/users`, `/api/v2/users`.",
          pros: ["Very explicit and clear to clients browsing the API.", "Easy to route requests to different backend implementations based on the path.", "Simple for developers to understand and test specific versions via browser or cURL."],
          cons: ["Can lead to 'URI clutter' if many versions exist.", "Some argue it violates REST principles that a URI should represent a unique resource, not a versioned view of it."]
        },
        {
          name: "{{Header Versioning}} (Content Negotiation)",
          detail: "The API version is specified using custom HTTP headers (e.g., `X-API-Version: 2`) or through content negotiation using the `Accept` header (e.g., `Accept: application/vnd.myapi.v2+json`).",
          pros: ["Keeps URIs clean and version-agnostic, adhering more strictly to REST principles.", "Allows for more granular versioning if needed (e.g., versioning specific representations)."],
          cons: ["Less obvious to clients; requires them to correctly set headers.", "Cannot easily test different versions directly in a browser address bar.", "Can be slightly more complex to implement routing on the server side compared to path versioning."]
        },
        {
          name: "{{Query Parameter Versioning}}",
          detail: "The API version is specified as a query parameter in the URL. Example: `/api/users?version=1`, `/api/users?version=2`.",
          pros: ["Relatively simple to implement.", "Easy to test different versions by changing the query parameter."],
          cons: ["Can make URLs look messy.", "Query parameters are often used for filtering or pagination, so adding versioning here might overload their purpose.", "Less common for major versioning than path or header versioning."]
        }
      ],
      generalConsiderations: [
        "**Backward Compatibility:** Strive to make changes backward compatible whenever possible to avoid the need for new versions (e.g., adding new optional fields to responses).",
        "**Deprecation Policy:** Have a clear policy for deprecating old API versions, including timelines and communication with clients.",
        "**Documentation:** Clearly document all available versions, changes between them, and deprecation schedules.",
        "**{{Semantic Versioning (SemVer)|Semantic Versioning}} (MAJOR.MINOR.PATCH):** Often used to indicate the nature of changes (MAJOR for breaking, MINOR for additive non-breaking, PATCH for bug fixes). While SemVer is common, how it maps to API endpoint versions (e.g. /v1, /v2 for MAJOR) needs to be defined."
      ],
      pros: ["Allows API evolution without breaking existing clients.", "Provides a clear path for clients to migrate to newer features.", "Manages complexity of supporting multiple API contracts."], // General pros of versioning
      cons: ["Increases maintenance overhead as multiple versions might need to be supported concurrently.", "Can lead to code duplication or complex conditional logic in the backend if not managed well.", "Requires clear communication and documentation for clients."] // General cons of versioning
    },
    {
      id: "idempotency_key_pattern",
      name: "{{Idempotency Key}}", // Changed from patternName to name for consistency
      description: "A unique key provided by the client to ensure repeated requests do not create duplicates (useful for payment or create operations).",
      pros: ["Prevents duplicate side-effects", "Simplifies retry logic"],
      cons: ["Requires key management on server", "Potential for resource leaks if keys not expired"],
      example: "Clients send X-Idempotency-Key header with POST /orders to prevent double ordering."
    }
  ],
  security: [
    {
      id: "oauth2",
      name: "{{OAuth 2.0}}",
      description: "An authorization framework that enables third-party applications to access web resources on behalf of a user, without exposing user credentials. Defines roles like {{Resource Owner}}, {{Client}}, {{Authorization Server}}, {{Resource Server}}, and grant types (e.g., {{Authorization Code Grant}}, {{Client Credentials Grant}}).",
      importance: "Standard for delegated authorization for third-party clients."
    },
    {
      id: "jwt",
      name: "{{JSON Web Tokens (JWT)}}",
      description: "A compact, URL-safe means of representing claims to be transferred between two parties. Often used for {{Statelessness|stateless}} {{Authentication (AuthN)|authentication}} tokens. Contains a header, payload (claims), and signature.",
      importance: "Popular for transmitting {{Authentication (AuthN)|authentication}} and {{Authorization (AuthZ)|authorization}} information in a {{Statelessness|stateless}} manner."
    },
    {
      id: "api_keys",
      name: "{{API Keys}}",
      description: "Simple tokens assigned to applications or users to grant access to an API. Typically sent in a request header (e.g., X-API-Key).",
      importance: "Easy to implement for basic {{Authentication (AuthN)|authentication}}, often used for server-to-server communication or identifying projects."
    },
    {
      id: "input_validation",
      name: "{{Input Validation}}",
      description: "Validating all data received by the API (e.g., path parameters, query parameters, request body) for type, format, length, range, and allowed characters to prevent injection attacks and other security vulnerabilities.",
      importance: "Critical for preventing common vulnerabilities like {{SQL Injection}}, {{XSS (Cross-Site Scripting)}}, command injection."
    },
    {
      id: "tls_ssl",
      name: "{{TLS/SSL (HTTPS)}}",
      description: "Using {{Transport Layer Security (TLS)}} or its predecessor {{Secure Sockets Layer (SSL)}} to encrypt data in transit between the client and the API server ({{HTTPS}}).",
      importance: "Essential for protecting data confidentiality and integrity from eavesdropping and {{Man-in-the-Middle (MITM) Attacks}}."
    },
    {
      id: "owasp_api_top10",
      name: "{{OWASP API Security Top 10}}",
      description: "A list of the most critical security risks to APIs identified by the Open Web Application Security Project (OWASP). Includes issues like {{Broken Object Level Authorization}}, {{Broken User Authentication}}, {{Excessive Data Exposure}}, etc.",
      importance: "Provides a checklist of common vulnerabilities to address during API design and development."
    },
    {
      id: "cors",
      name: "{{Cross-Origin Resource Sharing (CORS)}}",
      description: "A mechanism that uses additional {{HTTP Headers}} to tell browsers to give a web application running at one origin, access to selected resources from a different origin. Important for web-accessible APIs.",
      importance: "Enables secure cross-domain API requests from web browsers."
    }
  ],
  scenarios: [
    {
      id: "social_media_api",
      title: "Designing an API for a Social Media Platform",
      description: "Needs to support feeds, user profiles, posts, comments, likes, real-time updates.",
      considerations: [
        "{{GraphQL}} for flexible data fetching for feeds and complex client views.",
        "{{REST (Representational State Transfer)|REST}} for simpler resource management (e.g., user profiles, settings).",
        "{{WebSockets}} for real-time notifications and chat.",
        "{{Cursor-Based Pagination (Seek Method / Keyset Pagination)|Cursor-based pagination}} for feeds.",
        "{{OAuth 2.0}} for third-party app integrations.",
        "{{Rate Limiting}} to prevent abuse."
      ]
    },
    {
      id: "ecommerce_api",
      title: "Designing an API for an E-commerce Service",
      description: "Needs to handle product catalogs, orders, inventory, payments, user accounts.",
      considerations: [
        "{{REST (Representational State Transfer)|REST API}} for clear resource management (products, orders, customers).",
        "{{Idempotency}} for payment and order submission endpoints.",
        "Strong {{Authentication (AuthN)|authentication}} and {{Authorization (AuthZ)|authorization}} ({{OAuth 2.0}}, {{JSON Web Tokens (JWT)|JWTs}}).",
        "{{Webhook}} notifications for order status updates.",
        "{{API Versioning}} for evolving product and order features."
      ]
    },
    {
      id: "public_data_api",
      title: "Designing an API for a Public Data Provider (e.g., Weather Data)",
      description: "Provides access to large datasets, needs to be robust and easy to use for many developers.",
      considerations: [
        "{{REST (Representational State Transfer)|REST}} for broad accessibility and standard tooling.",
        "Clear documentation ({{OpenAPI Specification (Swagger)|OpenAPI/Swagger}}).",
        "{{API Keys}} for {{Authentication (AuthN)|authentication}} and usage tracking.",
        "Robust {{Rate Limiting}} and quotas.",
        "{{Offset Pagination (Page-Based)|Offset}} or {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|cursor pagination}} depending on data characteristics.",
        "Consider {{GraphQL}} for advanced querying capabilities if users have diverse data needs."
      ]
    },
    {
      id: "tweetApi", // Changed from key to id for consistency
      title: "Designing the Tweet API",
      description: "Define endpoints for creating, reading, and deleting tweets. Consider {{Rate Limiting}} and {{Idempotency}}.",
      problem: "High read/write ratio and need to support millions of tweets per day.",
      solution: "{{RESTful APIs|RESTful}} endpoints: POST /tweets (idempotent with X-Idempotency-Key), GET /tweets/{id}, GET /users/{id}/tweets?limit=50. Use [caching](#/caches) on GET endpoints and paginate with cursors.",
      challenges: "Handling {{Pagination}}, {{Rate Limiting|rate-limiting}} abusive clients, securing write endpoints.",
      learnings: "{{Idempotency Keys}} simplify retries; {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|cursor-based pagination}} scales better than {{Offset Pagination (Page-Based)|offset pagination}}.",
      considerations: [ // Added considerations field
        "Utilize {{RESTful APIs|RESTful}} endpoints for tweet operations.",
        "Implement {{Idempotency}} for POST /tweets using X-Idempotency-Key.",
        "Employ [caching](#/caches) on GET endpoints to improve read performance.",
        "Use {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|cursor-based pagination}} for fetching tweet lists (e.g., GET /users/{id}/tweets?limit=50).",
        "Address challenges like {{Pagination}} at scale, {{Rate Limiting|rate-limiting}}, and securing write operations.",
        "Recognize that {{Idempotency Keys}} simplify client retry logic.",
        "Understand that {{Cursor-Based Pagination (Seek Method / Keyset Pagination)|cursor-based pagination}} is generally more scalable than {{Offset Pagination (Page-Based)|offset-based}}."
      ]
    },
    {
      id: "ecommerceGraphQL", // Changed from key to id for consistency
      title: "GraphQL API for E-Commerce",
      description: "Expose product, category, and cart data via a single {{GraphQL}} endpoint with nested queries.",
      problem: "Clients need to display products with reviews and seller info in one screen.",
      solution: "Define types Product, Review, Seller and nested query fields; use {{DataLoader}} to batch and cache [database](#/databases) calls.",
      challenges: "Prevent n+1 query problem, secure field-level access.",
      learnings: "{{DataLoader}} is essential for performance; {{Schema Stitching}} helps modularize services.",
      considerations: [ // Added considerations field
        "Define {{GraphQL}} types for Product, Review, Seller.",
        "Implement nested query fields to allow clients to fetch related data in a single request.",
        "Use {{DataLoader}} to optimize [database](#/databases) access by batching and [caching](#/caches) calls.",
        "Focus on preventing n+1 query problems in resolvers.",
        "Implement robust field-level security/authorization.",
        "Acknowledge {{DataLoader}}'s importance for {{GraphQL}} performance.",
        "Consider {{Schema Stitching}} for modularizing different data domains or {{Microservices}}."
      ]
    }
  ],
  flashcards: [
    {
      front: "What are the main {{HTTP}} methods used in {{REST APIs}}?",
      back: "GET (retrieve), POST (create), PUT (update/replace), DELETE (remove), PATCH (partial update)."
    },
    {
      front: "What problem does {{GraphQL}} aim to solve regarding data fetching?",
      back: "{{Over-fetching}} (getting more data than needed) and {{Under-fetching}} (needing multiple requests to get all required data)."
    },
    {
      front: "What is the role of {{Protocol Buffers}} in {{gRPC (Google Remote Procedure Call)|gRPC}}?",
      back: "They are used as the {{Interface Definition Language (IDL)}} to define the structure of messages and service interfaces, enabling efficient binary serialization."
    },
    {
      front: "Why is {{Idempotency}} important in API design?",
      back: "It allows clients to safely retry requests without unintended side effects, which is crucial in unreliable networks."
    },
    {
      front: "Name two common {{API Versioning}} strategies.",
      back: "{{API Versioning (URI Path)|URI path versioning}} (e.g., /v1/users) and {{API Versioning (Custom Header)|Header versioning}} (e.g., Api-Version: 1)."
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
  ],
  mermaidDiagrams: {
    restFlow: `
    sequenceDiagram
      participant Client
      participant Server
      Client->>Server: GET /users/123
      Server-->>Client: 200 OK {userData}
  `,
    graphQLFlow: `
    sequenceDiagram
      participant Client
      participant GraphQLServer
      Client->>GraphQLServer: query { user(id:123){ name } }
      GraphQLServer-->>Client: { "data":{ "user":{ "name":"Alice" } } }
  `
  },
  protocolComparison: {
    title: "Comparison: REST vs. GraphQL vs. gRPC",
    introduction: "Choosing the right API protocol/style is a critical design decision. Here's a comparison of REST, GraphQL, and gRPC across key characteristics:",
    headers: ["Characteristic", "REST", "GraphQL", "gRPC"],
    rows: [
      {
        characteristic: "Data Fetching Model",
        rest: "Multiple endpoints; often leads to over-fetching or under-fetching. Client gets what server defines for the resource.",
        graphql: "Single endpoint; client requests exactly the data it needs, preventing over/under-fetching.",
        grpc: "Service methods defined by contract ({{Protocol Buffers}}); client calls specific methods. Efficient for defined operations."
      },
      {
        characteristic: "Performance",
        rest: "Can be less performant due to multiple requests or large payloads ({{JSON}}/{{XML}}). {{HTTP/1.1}} overhead.",
        graphql: "Can improve performance by reducing number of requests and payload size. Server-side complexity can impact.",
        grpc: "High performance due to {{HTTP/2}} and binary serialization ({{Protocol Buffers}}). Low {{Latency}}."
      },
      {
        characteristic: "Payload Format",
        rest: "Typically {{JSON}} or {{XML}} (text-based, human-readable).",
        graphql: "{{JSON}} (text-based).",
        grpc: "{{Protocol Buffers}} (binary, not human-readable directly)."
      },
      {
        characteristic: "Schema/Contract",
        rest: "No built-in schema enforcement; relies on conventions and external definitions like {{OpenAPI Specification (Swagger)|OpenAPI}}.",
        graphql: "Strongly typed schema defined on the server; client queries validated against schema. Introspection support.",
        grpc: "Strict contract defined in `.proto` files; strong typing and code generation for client/server."
      },
      {
        characteristic: "Caching",
        rest: "Leverages standard {{HTTP Caching}} mechanisms effectively (e.g., `Cache-Control`, ETags).",
        graphql: "More complex to cache at {{HTTP}} level due to single endpoint and POST requests. Application-level or client-side caching often used.",
        grpc: "Less straightforward for {{HTTP Caching}}; typically relies on client-side or intermediary application-level caching."
      },
      {
        characteristic: "Streaming",
        rest: "Not inherently designed for streaming; requires techniques like {{Long Polling}} or chunked responses.",
        graphql: "Supports subscriptions for real-time updates (streaming).",
        grpc: "Excellent support for various streaming modes (unary, server-streaming, client-streaming, bi-directional)."
      },
      {
        characteristic: "Browser Support",
        rest: "Native browser support (standard {{HTTP}}).",
        graphql: "Requires client libraries; typically uses {{HTTP POST}}.",
        grpc: "Requires {{gRPC-Web}} proxy for direct browser communication."
      },
      {
        characteristic: "Use Case Fit",
        rest: "Public APIs, simple resource-oriented services, {{CRUD}} operations.",
        graphql: "Mobile apps, complex UIs needing flexible data, applications where clients have diverse data needs.",
        grpc: "Internal {{Microservice}} communication, high-performance real-time services, streaming applications."
      }
    ],
    summary: "**When to use which (general guidance):**\n*   **{{REST (Representational State Transfer)|REST}}:** Best for standard public APIs, resource-oriented services, and when leveraging {{HTTP Caching}} and simplicity is key.\n*   **{{GraphQL}}:** Ideal for applications with complex data requirements, mobile clients needing optimized data fetching, or when frontend teams need flexibility in data requests without backend changes.\n*   **{{gRPC (Google Remote Procedure Call)|gRPC}}:** Suited for high-performance internal {{Microservice}} communication, streaming scenarios, and when strong contracts and efficiency are paramount."
  }
};
