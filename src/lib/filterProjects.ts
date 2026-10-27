import type { Category, Project } from "@/data/profile";

export type Filter = Category | "all";

export function filterProjects(projects: Project[], filter: Filter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((p) => p.categories.includes(filter));
}

/** Categories that at least one project uses, in a stable display order. */
export function usedCategories(projects: Project[]): Category[] {
  const order: Category[] = ["web", "mobile", "backend", "payments"];
  return order.filter((c) => projects.some((p) => p.categories.includes(c)));
}
