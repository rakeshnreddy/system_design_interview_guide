export const rateLimiter = {
  id: "rate-limiter",
  title: "{{Rate Limiter}}",
  description: "Design a system that limits the number of requests a user can make to an {{API}} within a certain time window.",
  mermaidDiagram: `
  sequenceDiagram
    participant Client
    participant API_Service[API]
    participant RateLimiter[{{Rate Limiter Service}}]
    Client->>API_Service: request()
    API_Service->>RateLimiter: check({{Access Token}})
    alt allowed
      RateLimiter-->>API_Service: ok
      API_Service-->>Client: 200 OK
    else blocked
      RateLimiter-->>API_Service: deny
      API_Service-->>Client: 429 Too Many Requests ({{HTTP Status Code}})
    end
`
};
