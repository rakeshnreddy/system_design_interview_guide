export const rideSharing = {
  id: "ride-sharing-app",
  title: "Ride-Sharing App (Uber-like)",
  description: "Design a ride-sharing service like Uber or Lyft, connecting riders with drivers.",
  mermaidDiagram: `
  graph LR
    Rider --> MobileApp
    MobileApp --> MatchService
    MatchService --> DriverDB[(Driver Location DB)]
    MatchService --> Notification[(Push Service)]
    Notification --> Driver
`
};
