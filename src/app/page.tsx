import { ProjectGrid } from "@/components/ProjectGrid";
import { education, experience, profile, projects, skills } from "@/data/profile";

export default function Home() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((l) => l.href);

  return (
    <>
      <header className="hero wrap">
        <p className="eyebrow">
          {profile.title} · {profile.location}
        </p>
        <h1>{profile.name}</h1>
        <p className="lead">{profile.summary}</p>
        <nav className="links" aria-label="Contact">
          <a className="button primary" href="#projects">
            See projects
          </a>
          {links.map((l) => (
            <a
              key={l.label}
              className="button"
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="projects" className="wrap" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <ProjectGrid projects={projects} />
        </section>

        <section className="wrap split" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <ol className="timeline">
            {experience.map((r) => (
              <li key={r.company}>
                <h3>
                  {r.title} <span className="muted">· {r.company}</span>
                </h3>
                {r.period && <p className="muted">{r.period}</p>}
                <ul>
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap split" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap split" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div>
            <h3>{education.degree}</h3>
            <p className="muted">
              {education.school} · {education.period}
            </p>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <p>
          Get in touch: <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p className="muted">Built with Next.js, TypeScript and Jest. Deployed to GitHub Pages with GitHub Actions.</p>
      </footer>
    </>
  );
}
