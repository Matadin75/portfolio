import type { Project } from "@/data/profile";

export function ProjectCard({ project }: { project: Project }) {
  const host = project.url ? new URL(project.url).host.replace(/^www\./, "") : null;

  return (
    <article className="card" aria-labelledby={`${project.slug}-title`}>
      <header className="card-head">
        <div>
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
      <p>{project.summary}</p>
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
