export interface ServiceItem {
  title: string;
  description: string;
  bestFor: string;
}

export const services: ServiceItem[] = [
  {
    title: "Fullstack Web Applications",
    description: "End-to-end web applications built from scratch with Next.js, TypeScript, robust REST/GraphQL APIs, and relational databases.",
    bestFor: "Startups & businesses building custom SaaS products",
  },
  {
    title: "Backend & API Architecture",
    description: "High-performance backend microservices, database schema optimization, indexing, and scalable caching layers with Redis.",
    bestFor: "Systems requiring high throughput and low latency",
  },
  {
    title: "System Modernization & Audit",
    description: "Refactoring legacy codebases, improving test coverage, resolving security vulnerabilities, and speeding up query performance.",
    bestFor: "Growing apps feeling slow or difficult to maintain",
  },
  {
    title: "Technical Advisory & CI/CD",
    description: "Infrastructure automation with Docker, streamlined GitHub Actions workflows, zero-downtime deployment, and architectural direction.",
    bestFor: "Engineering teams wanting smoother release cycles",
  },
];
