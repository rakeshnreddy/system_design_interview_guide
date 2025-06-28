export const webCrawler = {
  id: "web-crawler",
  title: "{{Web Crawler}}",
  description: "Design a {{Web Crawler}} that browses the {{World Wide Web}} in a methodical, automated manner.",
  mermaidDiagram: `
  flowchart LR
    Seed[{{Seed URL}}] --> Fetcher[{{Fetcher Service}}]
    Fetcher --> Parser[{{HTML Parser}}]
    Parser --> DB[[Databases](#/databases) ({{URL Index}})]
    Parser --> Queue[[Messaging Queues](#/messaging-queues) ({{Link Queue}})]
    Queue --> Fetcher
`
};
