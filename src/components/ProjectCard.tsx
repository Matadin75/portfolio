"use client";

import type { PointerEvent } from "react";
import type { Project } from "@/data/profile";

// Moves the card's spotlight to the pointer.
function track(e: PointerEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - box.top}px`);
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const host = project.url ? new URL(project.url).host.replace(/^www\./, "") : null;

  return (
    <article
      className="card"
      aria-labelledby={`${project.slug}-title`}
      onPointerMove={track}
    >
      <header className="card-head">
        <span className="card-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="card-title">
          <h3 id={`${project.slug}-title`}>{project.name}</h3>
          <p className="muted">
            {project.role} · {project.period}
          </p>
        </div>
        {project.url && host && (
          <a className="visit" href={project.url} target="_blank" rel="noreferrer">
            {host} <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>
      <p className="card-summary">{project.summary}</p>
      <ul className="highlights">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <ul className="tags" aria-label="Tech stack">
        {project.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </article>
  );
}
