import Link from "next/link";
import type { Project } from "@/data/profile";
import { caseStudyHref, hostOf } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";

const number = (i: number) => String(i + 1).padStart(2, "0");

/** "Visit site" for live products, a quiet note for retired ones. */
export function LiveLink({ project }: { project: Project }) {
  if (project.status === "offline" || !project.url) {
    return <span className="status-offline">No longer live</span>;
  }
  return (
    <a className="visit" href={project.url} target="_blank" rel="noreferrer">
      {hostOf(project.url)} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Tech stack">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** What I built on the project, as the card's bullet list. */
function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="highlights">
      {items.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
  );
}

function Featured({ project }: { project: Project }) {
  return (
    <article className="feature" aria-labelledby={`${project.slug}-title`}>
      <div className="feature-body">
        <p className="eyebrow">
          <span className="index">{number(0)}</span> Featured project
        </p>
        <h3 id={`${project.slug}-title`}>
          <Link className="stretched" href={caseStudyHref(project)}>
            {project.name}
          </Link>
        </h3>
        <p className="meta">
          {project.role} · {project.period}
        </p>
        <p className="feature-summary">{project.summary}</p>
        <Highlights items={project.highlights} />
        <Stack items={project.stack} />
        <div className="card-actions">
          <span className="read-more" aria-hidden="true">
            Read the case study <span className="arrow">→</span>
          </span>
          <LiveLink project={project} />
        </div>
      </div>
      <ProjectVisual slug={project.slug} />
    </article>
  );
}

function Tile({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  return (
    <article className={`tile${wide ? " is-wide" : ""}`} aria-labelledby={`${project.slug}-title`}>
      <ProjectVisual slug={project.slug} />
      <div className="tile-body">
        <div className="tile-head">
          <span className="index">{number(index)}</span>
          <h3 id={`${project.slug}-title`}>
            <Link className="stretched" href={caseStudyHref(project)}>
              {project.name}
            </Link>
          </h3>
        </div>
        <p className="meta">
          {project.role} · {project.period}
        </p>
        <p className="tile-summary">{project.summary}</p>
        <Highlights items={project.highlights} />
        <Stack items={project.stack} />
        <div className="card-actions">
          <span className="read-more" aria-hidden="true">
            Case study <span className="arrow">→</span>
          </span>
          <LiveLink project={project} />
        </div>
      </div>
    </article>
  );
}

// Wide and compact tiles alternate, so each row pairs a big story with a smaller one.
const isWide = (i: number) => i % 4 === 0 || i % 4 === 3;

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [first, ...rest] = projects;
  return (
    <div className="showcase">
      <Reveal>
        <Featured project={first} />
      </Reveal>
      <div className="bento">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 120} className={isWide(i) ? "span-wide" : "span-narrow"}>
            <Tile project={p} index={i + 1} wide={isWide(i)} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
