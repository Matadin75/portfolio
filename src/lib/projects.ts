import type { Project } from "@/data/profile";

/** Relative to the site root; next/link adds the GitHub Pages base path and the trailing slash. */
export const caseStudyHref = (p: Project) => `/projects/${p.slug}`;

export const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");
