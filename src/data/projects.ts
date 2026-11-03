export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "cloudscale-api-gateway",
    title: "CloudScale API Gateway",
    year: "2024",
    description:
      "A high-throughput distributed API gateway built with Golang and Redis. Handles rate-limiting, JWT authentication, and traffic routing with sub-millisecond overhead.",
    tags: ["Golang", "Redis", "Distributed Systems"],
  },
  {
    id: "nexus-enterprise-erp",
    title: "Nexus Enterprise Suite",
    year: "2023",
    description:
      "A full-stack enterprise resource management platform with real-time financial tracking, automated reporting, and role-based permissions serving 50k+ daily operations.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    id: "eventpulse-streaming-engine",
    title: "EventPulse Stream Engine",
    year: "2023",
    description:
      "Real-time event streaming and telemetry platform processing millions of telemetry events per day with WebSocket feeds and automated alert triggers.",
    tags: ["Node.js", "WebSockets", "Kafka", "Tailwind CSS"],
  },
];
