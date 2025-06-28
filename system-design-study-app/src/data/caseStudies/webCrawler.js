export const webCrawler = {
  id: "web-crawler",
  title: "Web Crawler",
  description: "Design a web crawler that browses the World Wide Web in a methodical, automated manner.",
  mermaidDiagram: `
  flowchart LR
    Seed[Seed URL] --> Fetcher[Fetcher Service]
    Fetcher --> Parser[Parser]
    Parser --> DB[(URL Index)]
    Parser --> Queue[(Link Queue)]
    Queue --> Fetcher
`
};
