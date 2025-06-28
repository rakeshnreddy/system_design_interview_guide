export const instagram = {
  id: "instagram-style-feed",
  title: "Instagram-Style Feed",
  description: "Design a system to generate a {{News Feed}} similar to Instagram's, showing posts from followed users.",
  mermaidDiagram: `
  graph LR
    Client --> CDN_EdgeCache([CDN](#/caches?section=CDN)[({{Edge Cache}})])
    CDN_EdgeCache -- miss --> API[{{Newsfeed Service}}]
    API --> Cache_Redis([Caching](#/caches)[({{Redis}})])
    API --> DB_Cassandra([Databases](#/databases)[({{Cassandra}})])
    DB_Cassandra --> API
    Cache_Redis --> API
    API --> Client
`
};
