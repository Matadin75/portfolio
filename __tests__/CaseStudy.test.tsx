import { render, screen, within } from "@testing-library/react";
import { generateStaticParams } from "@/app/projects/[slug]/page";
import { CaseStudy } from "@/components/CaseStudy";
import { projects, type Project } from "@/data/profile";

const [ice, second] = projects;
const youtoo = projects.find((p) => p.slug === "youtoo")!;

describe("case study pages", () => {
  it("are built for every project", () => {
    expect(generateStaticParams()).toEqual(projects.map((p) => ({ slug: p.slug })));
  });
});

describe("CaseStudy", () => {
  it("covers overview, what I built, architecture and stack", () => {
    render(<CaseStudy project={ice} index={0} next={second} />);
    expect(screen.getByRole("heading", { level: 1, name: ice.name })).toBeInTheDocument();
    for (const name of ["Overview", "What I built", "Architecture", "Stack"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    for (const f of ice.features) expect(screen.getByRole("heading", { level: 3, name: f.title })).toBeInTheDocument();
    expect(screen.getByText(ice.overview)).toBeInTheDocument();
  });

  it("states my role and links the live product", () => {
    render(<CaseStudy project={ice} index={0} next={second} />);
    expect(screen.getByText("My role").nextElementSibling).toHaveTextContent(ice.role);
    expect(screen.getByRole("link", { name: /icegames\.co\.za/ })).toHaveAttribute("href", ice.url);
  });

  it("marks a retired product instead of linking it", () => {
    render(<CaseStudy project={youtoo} index={2} next={ice} />);
    expect(screen.getByText("No longer live")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /opens in a new tab/ })).toBeNull();
  });

  it("leaves out sections that haven't been written, rather than padding them", () => {
    render(<CaseStudy project={ice} index={0} next={second} />);
    expect(screen.queryByRole("heading", { name: "Technical decisions" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Outcomes" })).toBeNull();
    expect(screen.queryByText("The challenge")).toBeNull();
  });

  it("shows those sections, and lists them on the page, once they're filled in", () => {
    const filled: Project = { ...ice, challenge: "A challenge.", decisions: ["A decision."], outcomes: ["An outcome."] };
    render(<CaseStudy project={filled} index={0} next={second} />);
    expect(screen.getByText("A challenge.")).toBeInTheDocument();
    const toc = screen.getByRole("navigation", { name: "On this page" });
    expect(within(toc).getByRole("link", { name: "Technical decisions" })).toHaveAttribute("href", "#decisions");
    expect(within(toc).getByRole("link", { name: "Outcomes" })).toHaveAttribute("href", "#outcomes");
  });

  it("draws the data store only when one is known", () => {
    const { container, rerender } = render(<CaseStudy project={ice} index={0} next={second} />);
    expect(screen.getByText("Data")).toBeInTheDocument();
    const noData: Project = { ...ice, architecture: { ...ice.architecture, data: [] } };
    rerender(<CaseStudy project={noData} index={0} next={second} />);
    expect(screen.queryByText("Data")).toBeNull();
    expect(container.querySelector(".arch-spacer")).not.toBeNull();
  });

  it("leads on to the next case study and back to all projects", () => {
    render(<CaseStudy project={ice} index={0} next={second} />);
    expect(screen.getByRole("link", { name: /Next case study/ })).toHaveAttribute("href", `/projects/${second.slug}`);
    expect(screen.getByRole("link", { name: /All projects/ })).toHaveAttribute("href", "/#projects");
  });
});
