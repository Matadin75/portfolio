"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/profile";
import { caseStudyHref } from "@/lib/projects";
import { projectsUsing } from "@/lib/skills";
import { Reveal } from "./Reveal";

type Group = { group: string; items: string[] };

/** Skill groups as an editorial list, beside a console that says which featured projects a picked skill shipped in. */
export function SkillsExplorer({ groups, projects }: { groups: Group[]; projects: Project[] }) {
  const [picked, setPicked] = useState<string | null>(null);
  const used = picked ? projectsUsing(picked, projects) : [];

  return (
    <div className="skills-explorer">
      <div className="skill-console">
        <p className="console-label" aria-hidden="true">
          where --shipped
        </p>
        <div className="skill-readout" aria-live="polite">
          <span className="readout-prompt" aria-hidden="true">
            &gt;
          </span>
          {!picked && (
            <p>
              Pick a technology to see where I&apos;ve used it.
              <span className="caret" aria-hidden="true" />
            </p>
          )}
          {picked && used.length > 0 && (
            <p>
              <strong>{picked}</strong> is in{" "}
              {used.map((p, i) => (
                <span key={p.slug}>
                  <Link href={caseStudyHref(p)}>{p.name}</Link>
                  {i < used.length - 2 ? ", " : i === used.length - 2 ? " and " : "."}
                </span>
              ))}
            </p>
          )}
          {picked && used.length === 0 && (
            <p>
              <strong>{picked}</strong> is part of my toolkit, but not in the five featured projects.
            </p>
          )}
        </div>
      </div>

      <div className="skill-list">
        {groups.map((g, i) => (
          <Reveal key={g.group} delay={(i % 4) * 60}>
            <div className="skill-row" role="group" aria-labelledby={`skill-${i}`}>
              <h3 id={`skill-${i}`}>{g.group}</h3>
              <ul className="skill-tags">
                {g.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      aria-pressed={picked === item}
                      onClick={() => setPicked((p) => (p === item ? null : item))}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
