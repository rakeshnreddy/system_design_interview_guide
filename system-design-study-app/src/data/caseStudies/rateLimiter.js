export const rateLimiter = {
  id: "rate-limiter",
  title: "Rate Limiter",
  description: "Design a system that limits the number of requests a user can make to an API within a certain time window.",
  mermaidDiagram: `
  sequenceDiagram
    participant Client
    participant API
    participant Limiter
    Client->>API: request()
    API->>Limiter: check(token)
    alt allowed
      Limiter-->>API: ok
      API-->>Client: 200 OK
    else blocked
      Limiter-->>API: deny
      API-->>Client: 429 Too Many Requests
    end
`
};
