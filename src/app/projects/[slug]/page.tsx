import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { projects } from "@/data/profile";

type Props = { params: Promise<{ slug: string }> };

// A static export can only serve pages it built, so every project is built up front and nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: `${project.name} case study`, description: project.summary } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  return <CaseStudy project={projects[index]} index={index} next={projects[(index + 1) % projects.length]} />;
}
