import { projects } from "@/data/projects";

export function projectById(id: string) {
  return projects.find((project) => project.id === id);
}
