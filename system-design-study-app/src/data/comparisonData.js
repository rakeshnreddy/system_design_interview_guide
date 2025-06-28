export const comparisonData = {
  "sql-vs-nosql": {
    title: "SQL vs. NoSQL Databases",
    description: "Comparing relational (SQL) and non-relational (NoSQL) databases across various characteristics.",
    radarData: [
      { criterion: "Consistency", optionA: 5, optionB: 3, fullMark: 5, optionAName: "SQL", optionBName: "NoSQL" }, // SQL generally stronger
      { criterion: "Scalability (Horizontal)", optionA: 3, optionB: 5, fullMark: 5, optionAName: "SQL", optionBName: "NoSQL" }, // NoSQL generally easier to scale out
      { criterion: "Schema Flexibility", optionA: 2, optionB: 5, fullMark: 5, optionAName: "SQL", optionBName: "NoSQL" }, // NoSQL more flexible
      { criterion: "Query Complexity", optionA: 4, optionB: 3, fullMark: 5, optionAName: "SQL", optionBName: "NoSQL" }, // SQL better for complex joins
      { criterion: "Data Integrity", optionA: 5, optionB: 3, fullMark: 5, optionAName: "SQL", optionBName: "NoSQL" }, // SQL often has stronger integrity constraints (ACID)
      { criterion: "Development Speed (Initial)", optionA: 3, optionB: 4, fullMark: 5, optionAName: "SQL", optionBName: "NoSQL" } // NoSQL can be faster for initial dev due to schema flexibility
    ],
    // ... other comparison details
  },
  "rest-vs-grpc": {
    title: "REST vs. gRPC",
    description: "Comparing two common API architectural styles.",
    radarData: [
      { criterion: "Performance", optionA: 3, optionB: 5, fullMark: 5, optionAName: "REST", optionBName: "gRPC" }, // gRPC generally higher performance
      { criterion: "Browser Support", optionA: 5, optionB: 2, fullMark: 5, optionAName: "REST", optionBName: "gRPC" }, // REST has native browser support
      { criterion: "Strict Contracts", optionA: 3, optionB: 5, fullMark: 5, optionAName: "REST", optionBName: "gRPC" }, // gRPC (Protobuf) has stricter contracts
      { criterion: "Ease of Debugging", optionA: 4, optionB: 3, fullMark: 5, optionAName: "REST", optionBName: "gRPC" }, // REST often easier to debug with standard tools
      { criterion: "Streaming Support", optionA: 2, optionB: 5, fullMark: 5, optionAName: "REST", optionBName: "gRPC" }, // gRPC has built-in bi-directional streaming
      { criterion: "Code Generation", optionA: 2, optionB: 4, fullMark: 5, optionAName: "REST", optionBName: "gRPC" } // gRPC offers strong code generation
    ],
    // ... other comparison details
  },
  "monolith-vs-microservices": {
    title: "Monolithic vs. Microservices Architecture",
    description: "Comparing two primary architectural approaches for building applications.",
    radarData: [
      { criterion: "Deployment Simplicity", optionA: 5, optionB: 2, fullMark: 5, optionAName: "Monolith", optionBName: "Microservices" },
      { criterion: "Scalability (Granular)", optionA: 2, optionB: 5, fullMark: 5, optionAName: "Monolith", optionBName: "Microservices" },
      { criterion: "Team Autonomy", optionA: 2, optionB: 4, fullMark: 5, optionAName: "Monolith", optionBName: "Microservices" },
      { criterion: "Operational Complexity", optionA: 4, optionB: 2, fullMark: 5, optionAName: "Monolith", optionBName: "Microservices" }, // Monolith less complex ops
      { criterion: "Fault Isolation", optionA: 2, optionB: 5, fullMark: 5, optionAName: "Monolith", optionBName: "Microservices" },
      { criterion: "Technology Diversity", optionA: 1, optionB: 4, fullMark: 5, optionAName: "Monolith", optionBName: "Microservices" }
    ]
  }
  // Add more comparisons here
};
