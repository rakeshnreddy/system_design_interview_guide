export const chatApp = {
  id: "chat-application",
  title: "Chat Application (Slack-like)",
  description: "Design a {{Real-Time Communication|real-time}} {{Chat Application}} like Slack or WhatsApp.",
  mermaidDiagram: `
  sequenceDiagram
    participant UserA
    participant ClientA
    participant MsgBroker[Message Broker/Queue]
    participant ClientB
    participant UserB
    UserA->>ClientA: send(msg)
    ClientA->>MsgBroker: publish(channel,msg)
    MsgBroker->>ClientB: deliver(msg)
    ClientB-->>UserB: show(msg)
`
};
