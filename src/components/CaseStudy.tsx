import Link from "next/link";
import type { ReactNode } from "react";
import { categoryLabels, type Project } from "@/data/profile";
import { caseStudyHref } from "@/lib/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { LiveLink } from "./ProjectShowcase";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";

function Part({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="cs-part" aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

/** The case-study page for one project. Sections without real content are left out, never padded. */
export function CaseStudy({ project: p, index, next }: { project: Project; index: number; next: Project }) {
  const parts = [
    { id: "overview", title: "Overview" },
    { id: "features", title: "What I built" },
    { id: "architecture", title: "Architecture" },
    { id: "stack", title: "Stack" },
    ...(p.decisions?.length ? [{ id: "decisions", title: "Technical decisions" }] : []),
    ...(p.outcomes?.length ? [{ id: "outcomes", title: "Outcomes" }] : []),
  ];

  return (
    <article className="case-study">
      <header className="wrap cs-hero">
        <Link className="back-link" href="/#projects">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <p className="eyebrow rise">
          Case study <span className="index">{String(index + 1).padStart(2, "0")}</span>
        </p>
        <h1 className="rise" style={{ "--i": 1 } as React.CSSProperties}>
          {p.name}
        </h1>
        <p className="lead rise" style={{ "--i": 2 } as React.CSSProperties}>
          {p.summary}
        </p>
        <dl className="cs-meta rise" style={{ "--i": 3 } as React.CSSProperties}>
          <div>
            <dt>My role</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{p.period}</dd>
          </div>
          <div>
            <dt>Platforms</dt>
            <dd>{p.categories.map((c) => categoryLabels[c]).join(" · ")}</dd>
          </div>
          <div>
            <dt>Product</dt>
            <dd>
              <LiveLink project={p} />
            </dd>
          </div>
          {p.repo && (
            <div>
              <dt>Code</dt>
              <dd>
                <a className="visit" href={p.repo} target="_blank" rel="noreferrer">
                  Repository <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          )}
        </dl>
        <div className="cs-visual rise" style={{ "--i": 4 } as React.CSSProperties}>
          <ProjectVisual slug={p.slug} />
        </div>
      </header>

      <div className="wrap cs-body">
        <nav className="cs-toc" aria-label="On this page">
          <p className="cs-toc-title">On this page</p>
          <ol>
            {parts.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cs-content">
          <Part id="overview" title="Overview">
            <p className="cs-text">{p.overview}</p>
            {p.challenge && (
              <div className="cs-callout">
                <p className="cs-callout-label">The challenge</p>
                <p>{p.challenge}</p>
              </div>
            )}
          </Part>

          <Part id="features" title="What I built">
            <ol className="feature-grid">
              {p.features.map((f, i) => (
                <li key={f.title}>
                  <span className="index">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ol>
          </Part>

          <Part id="architecture" title="Architecture">
            <ArchitectureDiagram architecture={p.architecture} />
          </Part>

          <Part id="stack" title="Stack">
            <ul className="tags tags-lg" aria-label="Tech stack">
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Part>

          {p.decisions?.length ? (
            <Part id="decisions" title="Technical decisions">
              <ul className="highlights">
                {p.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Part>
          ) : null}

          {p.outcomes?.length ? (
            <Part id="outcomes" title="Outcomes">
              <ul className="highlights">
                {p.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </Part>
          ) : null}

          <Reveal>
            <Link className="next-project" href={caseStudyHref(next)}>
              <span className="eyebrow">Next case study</span>
              <span className="next-name">
                {next.name} <span aria-hidden="true">→</span>
              </span>
              <span className="muted">{next.summary}</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
