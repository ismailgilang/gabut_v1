export interface SkillCategory {
  id: string;
  label: string;
  items: { label: string; note: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { label: "React & Next.js", note: "App Router, SSR, performant UI" },
      { label: "TypeScript", note: "Type-safe APIs & strict contracts" },
      { label: "Tailwind CSS", note: "Design systems & fluid responsiveness" },
      { label: "Vue / Nuxt", note: "Reactive components & SPA architecture" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { label: "Node.js & Express", note: "RESTful services & asynchronous flows" },
      { label: "Golang", note: "High-throughput microservices & concurrency" },
      { label: "PostgreSQL & Prisma", note: "Schema design, indexing & migrations" },
      { label: "Redis", note: "In-memory caching & pub/sub messaging" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    items: [
      { label: "Docker & Container", note: "Multi-stage builds & environment isolation" },
      { label: "CI/CD Pipelines", note: "Automated test suites & GitHub Actions" },
      { label: "Linux & Bash", note: "Server provisioning, Nginx & automation" },
      { label: "Cloud Platforms", note: "AWS, Vercel & Railway infrastructure" },
    ],
  },
  {
    id: "engineering",
    label: "Architecture",
    items: [
      { label: "System Design", note: "Scalable patterns & event-driven architecture" },
      { label: "API Design", note: "REST, GraphQL & WebSocket integrations" },
      { label: "Code Quality", note: "Clean code, unit testing & code review" },
      { label: "Security & Auth", note: "JWT, OAuth2, RBAC & web security" },
    ],
  },
];
