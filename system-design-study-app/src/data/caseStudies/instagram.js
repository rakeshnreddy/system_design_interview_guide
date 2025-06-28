export const instagram = {
  id: "instagram-style-feed",
  title: "Instagram-Style Feed",
  description: "Design a system to generate a news feed similar to Instagram's, showing posts from followed users.",
  mermaidDiagram: `
  graph LR
    Client --> CDN[(Edge Cache)]
    CDN -- miss --> API[Newsfeed Service]
    API --> Cache[(Redis)]
    API --> DB[(Cassandra)]
    DB --> API
    Cache --> API
    API --> Client
`
};
