export const urlShortener = {
  id: "url-shortener",
  title: "URL Shortener",
  description: "Design a system like TinyURL or bit.ly that takes a long URL and generates a unique shorter URL.",
  mermaidDiagram: `
  graph LR
    U[User] --> API[API Server]
    API --> DB[(SQL DB)]
    API --> Cache[(Redis)]
`
};
