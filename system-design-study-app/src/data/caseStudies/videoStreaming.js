export const videoStreaming = {
  id: "video-streaming-platform",
  title: "Video Streaming Platform (Netflix-like)",
  description: "Design a {{Video Streaming}} service like Netflix or YouTube.",
  mermaidDiagram: `
  graph LR
    Viewer --> CDN_Edge([CDN](#/caches?section=CDN)[({{Edge Server}})])
    CDN_Edge -- miss --> Origin[{{Origin Server}}]
    Origin --> Storage[{{Blob Store}}]
    Storage --> Origin
    CDN_Edge --> Viewer
`
};
