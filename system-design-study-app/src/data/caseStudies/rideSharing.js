export const rideSharing = {
  id: "ride-sharing-app",
  title: "Ride-Sharing App (Uber-like)",
  description: "Design a {{Ride-Sharing Service}} like Uber or Lyft, connecting riders with drivers.",
  mermaidDiagram: `
  graph LR
    Rider --> MobileApp[{{Mobile Application}}]
    MobileApp --> MatchService[{{Matching Service}}]
    MatchService --> DriverDB[[Databases](#/databases) ({{Driver Location DB}})]
    MatchService --> Notification[{{Push Notification Service}}]
    Notification --> Driver
`
};
