import type { CSSProperties } from "react";
import { CountUp } from "@/components/CountUp";
import { CursorGlow } from "@/components/CursorGlow";
import { Marquee } from "@/components/Marquee";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";
import { RotatingWords } from "@/components/RotatingWords";
import { ThemeToggle } from "@/components/ThemeToggle";
import { education, experience, profile, projects, skills, stats, techStrip } from "@/data/profile";

// Staggers the hero's entrance: each piece starts a beat after the last.
const rise = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Home() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((l) => l.href);
  const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>
      <CursorGlow />

      <header className="nav">
        <div className="wrap nav-inner">
          <a className="logo" href="#top" aria-label={`${profile.name}, back to top`}>
            SM
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#projects">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
          </nav>
          <ThemeToggle />
          <a className="button small" href="#contact">
            Say hello
          </a>
        </div>
      </header>

      <section id="top" className="hero wrap">
        <p className="badge rise" style={rise(0)}>
          <span className="pulse" aria-hidden="true" />
          {profile.title} · {profile.location}
        </p>
        <h1 className="rise" style={rise(1)}>
          <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="tagline rise" style={rise(2)}>
          I build <RotatingWords words={profile.builds} /> end to end.
        </p>
        <p className="lead rise" style={rise(3)}>
          {profile.summary}
        </p>
        <nav className="links rise" style={rise(4)} aria-label="Contact">
          <a className="button primary" href="#projects">
            See my work
          </a>
          {links.map((l) => (
            <a key={l.label} className="button" href={l.href} {...external(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>
        <dl className="stats rise" style={rise(5)}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Marquee items={techStrip} label="Technologies I work with" />

      <main>
        <section id="projects" className="wrap section" aria-labelledby="projects-title">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-title">Projects</h2>
          </Reveal>
          <ProjectGrid projects={projects} />
        </section>

        <section id="experience" className="wrap section split" aria-labelledby="experience-title">
          <Reveal>
            <p className="eyebrow">Where I&apos;ve been</p>
            <h2 id="experience-title">Experience</h2>
          </Reveal>
          <ol className="timeline">
            {experience.map((r, i) => (
              <li key={r.company}>
                <Reveal delay={i * 120}>
                  <h3>
                    {r.title} <span className="muted">· {r.company}</span>
                  </h3>
                  {r.period && <p className="period">{r.period}</p>}
                  <ul>
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="wrap section split" aria-labelledby="skills-title">
          <Reveal>
            <p className="eyebrow">Toolbox</p>
            <h2 id="skills-title">Skills</h2>
          </Reveal>
          <div className="skills">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={(i % 3) * 90}>
                <div className="skill-card">
                  <h3>{s.group}</h3>
                  <ul className="chips">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap section split" aria-labelledby="education-title">
          <Reveal>
            <p className="eyebrow">Studies</p>
            <h2 id="education-title">Education</h2>
          </Reveal>
          <Reveal delay={100}>
            <h3>{education.degree}</h3>
            <p className="muted">
              {education.school} · {education.period}
            </p>
          </Reveal>
        </section>

        <section id="contact" className="wrap section" aria-labelledby="contact-title">
          <Reveal>
            <div className="cta">
              <h2 id="contact-title">Let&apos;s build something.</h2>
              <p>Have a role or a project in mind? My inbox is open.</p>
              <div className="links">
                <a className="button primary" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                {links
                  .filter((l) => l.label !== "Email")
                  .map((l) => (
                    <a key={l.label} className="button" href={l.href} {...external(l.href)}>
                      {l.label}
                    </a>
                  ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="wrap footer">
        <p className="muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript and Jest, deployed to GitHub
          Pages by GitHub Actions.
        </p>
      </footer>
    </>
  );
}
