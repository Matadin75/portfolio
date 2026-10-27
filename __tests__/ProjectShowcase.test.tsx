import { render, screen, within } from "@testing-library/react";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { projects } from "@/data/profile";

const card = (name: string) => screen.getByRole("article", { name });

describe("ProjectShowcase", () => {
  it("features the first project and shows the rest as tiles", () => {
    const { container } = render(<ProjectShowcase projects={projects} />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(container.querySelectorAll(".feature")).toHaveLength(1);
    expect(within(card(projects[0].name)).getByText("Featured project")).toBeInTheDocument();
  });

  it("lists what I built on every card, not just the featured one", () => {
    render(<ProjectShowcase projects={projects} />);
    for (const p of projects) {
      const c = card(p.name);
      for (const h of p.highlights) expect(within(c).getByText(h)).toBeInTheDocument();
    }
  });

  it("opens each project's case study from its title", () => {
    render(<ProjectShowcase projects={projects} />);
    for (const p of projects) {
      expect(within(card(p.name)).getByRole("link", { name: p.name })).toHaveAttribute("href", `/projects/${p.slug}`);
    }
  });

  it("links live products in a new tab and marks the rest as no longer live", () => {
    render(<ProjectShowcase projects={projects} />);
    for (const p of projects) {
      const c = card(p.name);
      if (p.status === "live") {
        const visit = within(c).getByRole("link", { name: /opens in a new tab/ });
        expect(visit).toHaveAttribute("href", p.url);
        expect(visit).toHaveAttribute("target", "_blank");
        expect(within(c).queryByText("No longer live")).toBeNull();
      } else {
        expect(within(c).queryByRole("link", { name: /opens in a new tab/ })).toBeNull();
        expect(within(c).getByText("No longer live")).toBeInTheDocument();
      }
    }
  });

  it("gives every project its own illustration, labelled as one", () => {
    const { container } = render(<ProjectShowcase projects={projects} />);
    expect(container.querySelectorAll(".project-visual svg")).toHaveLength(projects.length);
    expect(screen.getAllByText("Illustration")).toHaveLength(projects.length);
  });
});

describe("project data", () => {
  it("has unique slugs", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("only links products that are live", () => {
    for (const p of projects) {
      if (p.status === "live") expect(p.url).toMatch(/^https:\/\//);
      else expect(p.url).toBeUndefined();
    }
  });

  it("keeps SecondSpace, YouToo and Uptooyoo as past projects", () => {
    const past = projects.filter((p) => p.status === "offline").map((p) => p.name);
    expect(past).toEqual(["SecondSpace", "YouToo", "Uptooyoo"]);
  });
});
