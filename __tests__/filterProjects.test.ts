import type { Project } from "@/data/profile";
import { filterProjects, usedCategories } from "@/lib/filterProjects";

const make = (slug: string, categories: Project["categories"]): Project => ({
  slug,
  name: slug,
  role: "Developer",
  period: "2026",
  summary: "",
  highlights: [],
  stack: [],
  categories,
  accent: "aqua",
});

const projects = [make("a", ["web"]), make("b", ["mobile", "payments"]), make("c", ["web", "backend"])];

describe("filterProjects", () => {
  it("returns every project for 'all'", () => {
    expect(filterProjects(projects, "all")).toEqual(projects);
  });

  it("keeps only projects tagged with the category", () => {
    expect(filterProjects(projects, "web").map((p) => p.slug)).toEqual(["a", "c"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterProjects([make("a", ["web"])], "payments")).toEqual([]);
  });
});

describe("usedCategories", () => {
  it("lists categories in display order, skipping unused ones", () => {
    expect(usedCategories([make("a", ["payments", "web"])])).toEqual(["web", "payments"]);
  });
});
