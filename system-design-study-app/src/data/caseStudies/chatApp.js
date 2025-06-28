export const chatApp = {
  id: "chat-application",
  title: "Chat Application (Slack-like)",
  description: "Design a real-time chat application like Slack or WhatsApp.",
  mermaidDiagram: `
  sequenceDiagram
    participant UserA
    participant ClientA
    participant Broker
    participant ClientB
    UserA->>ClientA: send(msg)
    ClientA->>Broker: publish(channel,msg)
    Broker->>ClientB: deliver(msg)
    ClientB-->>UserB: show(msg)
`
};
