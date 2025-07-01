export const interviewApproachAppData = {
  title: "System Design Interview Approach",
  sections: [
    {
      id: "introduction",
      title: "Understanding the System Design Interview",
      content: [
        { type: "paragraph", text: "The system design interview (SDI) is a conversation where you demonstrate your ability to design a complex system that meets specific requirements. Interviewers are looking for your thought process, your ability to consider trade-offs, your understanding of core architectural principles, and your communication skills. It's not about finding a single 'correct' answer, but about how you navigate the problem space." },
        { type: "paragraph", text: "The general flow is interactive. You'll be given an open-ended problem (e.g., 'Design Instagram,' 'Design a URL shortener'). You're expected to lead the discussion, ask clarifying questions, propose solutions, and justify your decisions. The interviewer will guide you, probe your assumptions, and challenge your design." }
      ]
    },
    {
      id: "framework",
      title: "A Step-by-Step Framework (Example: R.E.S.D.A.L.O.T.S.)",
      content: [
        { type: "paragraph", text: "While there are many frameworks, here's one example to structure your approach. Adapt it as needed:" },
        { type: "heading", level: 3, text: "1. Requirements Clarification (R)" },
        { type: "list", items: [
            "Ask clarifying questions to understand the scope: Who are the users? What are the main features ({{Functional Requirements}})? What are the {{Non-Functional Requirements}} ({{Performance}}, {{Availability}}, {{Scalability}}, etc.)?",
            "Identify constraints: Technical (e.g., specific tech stack if mentioned), business (e.g., time to market, cost).",
            "Define success metrics: How will we know if the design is successful (e.g., X {{QPS (Queries Per Second)}}, Y {{Latency}}, Z {{Availability}})?",
            "Don't make assumptions silently; state them clearly and get interviewer buy-in. E.g., 'Assuming we are designing for read-heavy workloads...'"
          ]
        },
        { type: "heading", level: 3, text: "2. Estimation of Scale & Constraints (E)" },
        { type: "list", items: [
            "Estimate traffic: {{Queries Per Second (QPS)}}, {{Daily Active Users (DAU)}}, {{Monthly Active Users (MAU)}}. Consider peak vs. average load.",
            "Estimate storage needs: How much data per user/item? Total data over time? Growth rate?",
            "Estimate bandwidth requirements: Ingress and egress traffic based on data types (text, image, video).",
            "Discuss data characteristics: {{Durability}} needs (can we lose some data?), {{Consistency}} requirements ({{Strong Consistency}} vs {{Eventual Consistency}})."
          ]
        },
        { type: "paragraph", text: "Example: For a Twitter-like service with 100M DAU, users posting 1 tweet/day, reading 20. Calculate QPS for reads/writes, storage for tweets/users." },
        { type: "heading", level: 3, text: "3. System Interface Definition (S)" },
        { type: "list", items: [
            "Define the APIs for the system. What are the main endpoints, request/response formats?",
            "Consider different types of clients (mobile, web).",
            "Example: `POST /v1/tweets`, `GET /v1/users/{userId}/tweets`."
          ]
        },
        { type: "heading", level: 3, text: "4. Data Model Design (D)" },
        { type: "list", items: [
            "Choose a [database](#/databases) type ({{SQL}} vs. {{NoSQL}}) based on requirements ({{Consistency}}, {{Schema Flexibility}}, {{Query Patterns}}, {{Scale}}).",
            "Define main entities and their relationships.",
            "Sketch out table schemas or document structures.",
            "Discuss {{Indexing Strategies}} for common query patterns."
          ]
        },
        { type: "heading", level: 3, text: "5. Abstract / High-Level Design (A)" },
        { type: "list", items: [
            "Draw a block diagram with the main components: Clients, [Load Balancing](#/load-balancing), {{Application Servers}}, [Databases](#/databases), [Caches](#/caches), [Messaging Queues](#/messaging-queues), [CDNs](#/caches?section=CDN), etc.",
            "Illustrate the primary data flow and request paths.",
            "Start simple and then iterate. Don't dive too deep into one component initially."
          ]
        },
        { type: "heading", level: 3, text: "6. Low-Level / Detailed Design (L)" },
        { type: "list", items: [
            "Flesh out specific components. For example, if you have multiple services, discuss their individual roles and APIs.",
            "Discuss choices for specific technologies (e.g., [Redis](#/databases?section=redis) for [caching](#/caches), [Kafka](#/messaging-queues?section=kafka) for [message queues](#/messaging-queues), specific [database engine](#/databases)). Justify these choices.",
            "Explain algorithms for key functionalities if relevant (e.g., news feed generation, {{Sharding Strategy}})."
          ]
        },
        { type: "heading", level: 3, text: "7. Operational Considerations / Bottlenecks (O)" },
        { type: "list", items: [
            "Identify potential bottlenecks: {{Single Points of Failure (SPOFs)}}, {{Scaling Limitations}} of chosen components.",
            "Discuss strategies for {{Monitoring}}, {{Logging}}, and {{Alerting}}.",
            "Consider deployment strategy, {{CI/CD}}.",
            "How will the system handle failures? {{Redundancy}}, {{Failover Mechanisms}}."
          ]
        },
        { type: "heading", level: 3, text: "8. Trade-offs & Alternatives (T)" },
        { type: "list", items: [
            "Revisit critical design choices and discuss the trade-offs made (e.g., {{Consistency}} vs. {{Availability}} (see {{CAP Theorem}}), cost vs. {{Performance}}).",
            "Explain why certain alternative technologies or approaches were not chosen.",
            "Show that you understand there's no perfect solution, only solutions with different sets of compromises."
          ]
        },
        { type: "heading", level: 3, text: "9. Summary & Future Considerations (S)" },
        { type: "list", items: [
            "Briefly recap the design, highlighting how it meets the key requirements.",
            "Mention potential future improvements, features, or scaling challenges not yet addressed (e.g., internationalization, machine learning integration)."
          ]
        }
      ]
    },
    {
      id: "example-case",
      title: "Example Case: Applying the Framework – Design a URL Shortener",
      content: [
        { type: "paragraph", text: "Let's walk through designing a URL shortener (like TinyURL or bit.ly) using our framework to see how it applies in practice." },
        { type: "heading", level: 4, text: "1. Requirements Clarification (R)" },
        { type: "paragraph", text: "First, we'd ask questions to define the scope. Functional requirements would include: shortening a given URL to a much shorter unique alias, redirecting a short alias to its original long URL, and allowing custom short aliases. Non-functional requirements would be high availability, low latency for redirection, scalability to handle many URLs and requests, and analytics (e.g., click counts)." },
        { type: "heading", level: 4, text: "2. Estimation of Scale & Constraints (E)" },
        { type: "paragraph", text: "Next, estimate the load. If we expect 100 million new URLs per month and a 100:1 read/write ratio (more redirections than creations), this implies roughly 40 new URLs/second and 4000 reads/second. For storage, if each URL mapping takes ~500 bytes (long URL, short alias, metadata), 100M URLs/month x 12 months x 5 years x 500 bytes = ~3TB of data over 5 years, which is manageable." },
        { type: "heading", level: 4, text: "3. System Interface Definition (S)" },
        { type: "paragraph", text: "Define the core APIs. For example: `POST /api/v1/shorten` (request body: `{ long_url: '...', custom_alias: 'optional' }`, response: `{ short_url: '...' }`) and `GET /{short_alias}` which would return a 301/302 redirect to the long URL. We might also consider an API for analytics: `GET /api/v1/stats/{short_alias}`." },
        { type: "heading", level: 4, text: "4. Data Model Design (D)" },
        { type: "paragraph", text: "We need to store mappings from short aliases to long URLs. A NoSQL key-value store like Redis or DynamoDB could work well, using the short alias as the key and the long URL as the value, optimized for fast reads. We might also need a relational database for user accounts if custom aliases or user-specific analytics are required, or a way to generate globally unique short IDs if not custom." },
        { type: "paragraph", text: "Example Schema (Key-Value): `short_alias: { long_url: '...', created_at: '...', user_id: '...', click_count: 0 }`." },
        { type: "heading", level: 4, text: "5. Abstract / High-Level Design (A)" },
        { type: "paragraph", text: "The system would involve: clients (browsers, apps), a Load Balancer distributing requests, Application Servers handling API logic (shortening, redirection), a Key-Value Database for URL mappings, and potentially an Analytics Service. For generating unique short IDs, a dedicated ID Generation Service could be used to ensure uniqueness and avoid collisions." },
        { type: "heading", level: 4, text: "6. Low-Level / Detailed Design (L)" },
        { type: "paragraph", text: "For detailed design, consider the alias generation strategy: e.g., base62 encoding of a unique counter from the ID Generation Service (ensuring 6-8 characters can represent billions of URLs). For redirection, the application server looks up the short alias in the database and issues an HTTP 301 (permanent) or 302 (temporary) redirect. Caching frequently accessed short URLs (e.g., in Memcached/Redis in front of the main DB) would be critical for read latency." },
        { type: "heading", level: 4, text: "7. Operational Considerations / Bottlenecks (O)" },
        { type: "paragraph", text: "Potential bottlenecks include: write load on the database if new URL creations are very high (sharding the database by short alias prefix might be needed), the ID generation service becoming a SPOF (it needs to be highly available and scalable), and handling 'hot' short URLs (popular links needing aggressive caching). Monitoring QPS, latency, and error rates for all services is vital." },
        { type: "heading", level: 4, text: "8. Trade-offs & Alternatives (T)" },
        { type: "paragraph", text: "Key trade-offs: Using a NoSQL key-value store for URLs prioritizes read speed and scalability over complex relational queries (which aren't needed for core functionality). Generating random short IDs vs. sequential IDs involves trade-offs in predictability vs. potential for collisions (if not careful with random generation). For custom aliases, we need to ensure they are unique, which might add write latency." },
        { type: "heading", level: 4, text: "9. Summary & Future Considerations (S)" },
        { type: "paragraph", text: "In summary, this design provides a scalable and low-latency URL shortening and redirection service. Future enhancements could include: advanced analytics, link expiration, user accounts for managing links, and improved anti-abuse mechanisms for malicious URLs." }
      ]
    },
    {
      id: "additional-tips",
      title: "Additional Tips for Success",
      content: [
        { type: "paragraph", text: "Beyond the structured framework, keep these general tips in mind to excel in your system design interview:" },
        { type: "list", items: [
          "**Communicate Clearly and Proactively:** Think out loud. Explain your reasoning, assumptions, and the trade-offs you're considering at each step. The interview is a dialogue.",
          "**Drive the Discussion:** While the interviewer will guide you, you are expected to lead the design process. Be proactive in suggesting components, discussing alternatives, and moving through the design steps.",
          "**Clarify Ambiguity:** If a requirement is unclear or too broad, ask targeted questions to narrow the scope. Don't make critical assumptions in silence.",
          "**Focus on Trade-offs:** System design is about making informed choices. Explicitly discuss why you chose one approach over another (e.g., NoSQL vs. SQL, which caching strategy, what consistency model) and the implications of those choices.",
          "**Be Coachable and Adaptable:** Listen to the interviewer's feedback and hints. They might be trying to steer you towards a specific area or away from a pitfall. Show that you can incorporate feedback and adapt your design if necessary.",
          "**Manage Your Time:** Keep an eye on the clock. Allocate appropriate time to cover the major aspects of the design. It's okay to state that a deeper dive into a particular component would take more time than available but outline how you would approach it.",
          "**Use the Whiteboard/Diagramming Tool:** Visualizing your design helps both you and the interviewer. Start with high-level block diagrams and add detail as you go. Keep it neat and legible."
        ]}
      ]
    },
    {
      id: "key-principles",
      title: "Key Design Principles (The '-ilities')",
      content: [
        { type: "paragraph", text: "Throughout the interview, demonstrate your understanding of these crucial system characteristics:" },
        { type: "list", items: [
            "**{{Scalability}}:** Ability to handle growing load (users, data, transactions). {{Horizontal Scaling}} vs. {{Vertical Scaling}}.",
            "**{{Reliability}}:** System operates correctly without failure. Measured by {{Mean Time Between Failures (MTBF)}}. Achieved via {{Redundancy}}, {{Fault Tolerance}}.",
            "**{{Availability}}:** System is operational and accessible when needed. Measured by uptime (e.g., 99.999%). Related to {{Fault Tolerance}} and {{Resilience}}.",
            "**{{Maintainability}}:** Ease of operating, debugging, and updating the system. {{Modularity}}, clear APIs, good documentation, automation.",
            "**{{Performance}}:** Speed and responsiveness of the system. Measured by {{Latency}} (response time) and {{Throughput}} (requests per second).",
            "**{{Cost-Effectiveness}}:** Designing a system that meets requirements without unnecessary expense. Consider hardware, software, operational, and development costs.",
            "**{{Security}}:** Protecting data and system resources from unauthorized access, use, disclosure, alteration, or destruction. {{Authentication}}, {{Authorization}}, {{Encryption}}, {{Input Validation}}."
          ]
        }
      ]
    },
    {
      id: "common-pitfalls",
      title: "Common Pitfalls to Avoid",
      content: [
        { type: "list", items: [
            "**Jumping to solutions too quickly:** Not spending enough time clarifying requirements and understanding the problem.",
            "**Not asking enough clarifying questions:** Making assumptions that might lead the design astray.",
            "**Over-engineering:** Designing for hypothetical future problems that are not part of current requirements, leading to unnecessary complexity.",
            "**Under-engineering:** Providing a superficial design that doesn't address core requirements or scale.",
            "**Not discussing trade-offs:** Presenting choices as if they are the only option, without acknowledging downsides or alternatives.",
            "**Poor communication:** Not thinking out loud, not explaining your reasoning, or not using the whiteboard/drawing tool effectively.",
            "**Getting stuck on minor details:** Losing sight of the big picture by focusing too much on one specific component too early.",
            "**Not considering non-functional requirements:** Focusing only on features and ignoring {{Scalability}}, {{Availability}}, etc.",
            "**Ignoring interviewer feedback:** Not adapting your design based on hints or concerns raised by the interviewer."
          ]
        }
      ]
    },
    {
      id: "communication-tips",
      title: "Communication & Interaction Tips",
      content: [
        { type: "list", items: [
            "**Think out loud:** Verbalize your thought process, assumptions, and decisions. This is what the interviewer is evaluating.",
            "**Use the whiteboard/drawing tool effectively:** Draw clear diagrams. Start high-level and add detail as you go. Keep it organized.",
            "**Be structured:** Follow a framework or a logical progression of steps. Announce which part of the problem you are focusing on.",
            "**Listen actively to interviewer feedback:** They might be trying to help you or steer you away from a less optimal path. Engage with their questions and suggestions.",
            "**Be confident but humble:** It's okay to not know everything. Acknowledge limitations and be open to discussing alternatives.",
            "**Manage your time:** Keep an eye on the clock. Allocate time for different phases of the design.",
            "**Ask for feedback:** Periodically, you can ask, 'Does this make sense?' or 'Am I on the right track?'"
          ]
        }
      ]
      },
      {
        id: "practice-and-preparation",
        title: "Preparation Strategies",
        content: [
            { type: "paragraph", text: "Effective preparation involves several aspects:" },
            { type: "list", items: [
                "**Understand core concepts:** Deeply understand topics like [caching](#/caches), [Load Balancing](#/load-balancing), [databases (SQL/NoSQL)](#/databases), [messaging queues](#/messaging-queues), [CDNs](#/caches?section=CDN), [API design](#/api-design), CAP theorem (see {{CAP Theorem}}), {{Consistency Models}}, etc.",
                "**Study common system designs:** Learn how popular systems like Twitter, Instagram, Uber, Netflix, etc., are designed at a high level. Focus on the principles and patterns.",
                "**Practice with mock interviews:** This is crucial. Get feedback from peers, mentors, or professional services. Practice articulating your thoughts.",
                "**Develop a go-to framework:** Internalize a structured approach to tackle any design problem.",
                "**Work on back-of-the-envelope calculations:** Get comfortable with estimating scale, storage, and traffic quickly."
            ]}
        ]
      }
    ],
  mermaidDiagrams: {
    frameworkFlow: `
    flowchart TD
      A[Clarify Requirements] --> B[Estimation]
      B --> C[High-Level Design]
      C --> D[Deep Dive]
      D --> E[Trade-Offs]
      E --> F[Wrap-Up]
  `
  }
};
