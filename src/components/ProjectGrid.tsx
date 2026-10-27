"use client";

import { useState } from "react";
import { categoryLabels, type Project } from "@/data/profile";
import { filterProjects, usedCategories, type Filter } from "@/lib/filterProjects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", ...usedCategories(projects)];
  const shown = filterProjects(projects, filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : categoryLabels[f]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>
      <div className="grid">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 120}>
            <ProjectCard project={p} index={projects.indexOf(p)} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
