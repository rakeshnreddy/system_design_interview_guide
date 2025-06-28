export const videoStreaming = {
  id: "video-streaming-platform",
  title: "Video Streaming Platform (Netflix-like)",
  description: "Design a video streaming service like Netflix or YouTube.",
  mermaidDiagram: `
  graph LR
    Viewer --> CDN[(Edge)]
    CDN -- miss --> Origin[(Origin Server)]
    Origin --> Storage[(Blob Store)]
    Storage --> Origin
    CDN --> Viewer
`
};
