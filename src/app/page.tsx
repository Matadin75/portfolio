import type { CSSProperties, ReactNode } from "react";
import { CodePanel } from "@/components/CodePanel";
import { HeroVisual } from "@/components/HeroVisual";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { education, experience, principles, profile, projects, skills, techStrip } from "@/data/profile";

// Staggers the hero's entrance: each piece starts a beat after the last.
const rise = (i: number) => ({ "--i": i }) as CSSProperties;

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

function SectionHead({ id, index, eyebrow, title, lead }: { id: string; index?: string; eyebrow: string; title: ReactNode; lead?: string }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">
        {index && <span className="index">{index}</span>}
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

const about = `
const saien = {
  role: "Full-Stack Developer",
  based: "Johannesburg, South Africa",
  ships: ["web", "iOS", "Android"],
  frontend: ["React", "Next.js", "React Native"],
  backend: ["ASP.NET Core", "SignalR", "EF Core"],
  data: ["MySQL", "SQL Server"],
  delivery: ["Docker", "GitHub Actions", "AWS"],
  owns: "UI → API → database → production",
};`;

export default function Home() {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((l) => l.href);

  return (
    <>
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="badge rise" style={rise(0)}>
              <span className="pulse" aria-hidden="true" />
              {profile.title} · {profile.country}
            </p>
            <h1 id="hero-title" className="rise" style={rise(1)}>
              {profile.headline.lead} <span className="accent-text">{profile.headline.highlight}</span>.
            </h1>
            <p className="lead rise" style={rise(2)}>
              {profile.summary}
            </p>
            <div className="links rise" style={rise(3)}>
              <a className="button primary" href="#projects">
                Explore My Work <span aria-hidden="true">→</span>
              </a>
              <a className="button" href="#contact">
                Get In Touch
              </a>
            </div>
            <div className="tech-strip rise" style={rise(4)}>
              <p className="tech-strip-label">Works with</p>
              <ul aria-label="Technologies I work with">
                {techStrip.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hero-art rise" style={rise(2)}>
            <HeroVisual />
          </div>
        </div>
      </section>

      <section id="about" className="wrap section about" aria-labelledby="about-title">
        <div className="about-copy">
          <SectionHead id="about-title" index="01" eyebrow="About" title={profile.message} />
          <Reveal delay={80}>
            {profile.about.map((p) => (
              <p key={p} className="about-text">
                {p}
              </p>
            ))}
          </Reveal>
          <ul className="principles">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={(i % 2) * 80}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={120} className="about-art">
          <CodePanel
            file="saien.ts"
            code={about}
            label="Summary as code: full-stack developer in Johannesburg shipping web, iOS and Android, with React, Next.js and React Native on the front end, ASP.NET Core, SignalR and EF Core on the back end, MySQL and SQL Server for data, and Docker, GitHub Actions and AWS for delivery."
          />
        </Reveal>
      </section>

      <section id="projects" className="wrap section" aria-labelledby="projects-title">
        <SectionHead
          id="projects-title"
          index="02"
          eyebrow="Selected work"
          title="Products I've built and shipped"
          lead="Five products across web, mobile and backend. Each one has a case study on what it does and the engineering behind it."
        />
        <ProjectShowcase projects={projects} />
      </section>

      <section id="skills" className="wrap section" aria-labelledby="skills-title">
        <SectionHead
          id="skills-title"
          index="03"
          eyebrow="Toolbox"
          title="Skills, shown in context"
          lead="No percentages. Pick a technology to see which of the projects above it shipped in."
        />
        <SkillsExplorer groups={skills} projects={projects} />
      </section>

      <div id="experience" className="wrap section career">
        <section className="career-row" aria-labelledby="experience-title">
          <SectionHead id="experience-title" index="04" eyebrow="Career" title="Experience" />
          <ol className="timeline">
            {experience.map((r, i) => (
              <li key={r.company}>
                <Reveal delay={i * 120}>
                  {r.period && <p className="timeline-period">{r.period}</p>}
                  <h3>
                    {r.title} <span className="at">· {r.company}</span>
                  </h3>
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
        <section className="career-row" aria-labelledby="education-title">
          <SectionHead id="education-title" eyebrow="Studies" title="Education" />
          <Reveal delay={100}>
            <div className="edu-card">
              <p className="timeline-period">{education.period}</p>
              <h3>{education.degree}</h3>
              <p className="muted">{education.school}</p>
            </div>
          </Reveal>
        </section>
      </div>

      <section id="contact" className="wrap section" aria-labelledby="contact-title">
        <Reveal>
          <div className="contact">
            <div className="contact-horizon" aria-hidden="true" />
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Let&apos;s build something meaningful.</h2>
            <p className="contact-lead">Have a role, a product or a project in mind? My inbox is open.</p>
            <nav className="links" aria-label="Contact">
              <a className="button primary" href={`mailto:${profile.email}`}>
                Email {profile.email}
              </a>
              {links.map((l) => (
                <a key={l.label} className="button" href={l.href} {...external(l.href)}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </Reveal>
      </section>
    </>
  );
}
