import type { Project } from "@/data/profile";

// Most skills are found by name. These need a pattern: names that are part of other names
// ("React" in "React Native", "Vite" in "Vitest"), or skills that show up under another name.
const patterns: Record<string, RegExp> = {
  React: /\bReact\b(?! Native| Testing)/,
  Vite: /\bVite\b/,
  Java: /\bJava\b(?!Script)/,
  "C#": /C#|ASP\.NET|\.NET (MAUI|\d)/,
  SQL: /\bMySQL\b|\bSQL Server\b/,
  "Identity / JWT": /\bJWT\b/,
  Docker: /\bDocker/,
  AWS: /\bAWS\b|Amazon S3/,
  "App Store / Google Play billing": /App Store|Google Play/,
  "Google Maps": /Google (Maps|Places)/,
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The projects whose stack or documented work mentions `skill`. */
export function projectsUsing(skill: string, projects: Project[]): Project[] {
  const pattern = patterns[skill] ?? new RegExp(`(^|[^\\w.])${escape(skill)}(?![\\w])`);
  return projects.filter((p) =>
    [...p.stack, ...p.highlights, ...p.features.map((f) => f.body)].some((text) => pattern.test(text)),
  );
}
