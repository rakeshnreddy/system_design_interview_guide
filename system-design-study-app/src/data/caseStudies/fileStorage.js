export const fileStorage = {
  id: "file-storage-service",
  title: "File Storage Service (Google Drive-like)",
  description: "Design a {{File Storage}} and {{File Synchronization}} service like Google Drive or Dropbox.",
  mermaidDiagram: `
  graph LR
    Client --> API[{{File API}}]
    API --> Auth[({{OAuth Service}})]
    API --> Storage[{{Object Store}}]
    API --> DB[[Databases](#/databases) ({{Metadata Database}})]
`
};
