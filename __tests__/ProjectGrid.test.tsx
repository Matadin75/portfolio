import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/profile";

const cardTitles = () => screen.getAllByRole("article").map((a) => a.querySelector("h3")?.textContent);

describe("ProjectGrid", () => {
  it("shows every project by default", () => {
    render(<ProjectGrid projects={projects} />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters to the chosen category and announces the count", async () => {
    render(<ProjectGrid projects={projects} />);
    await userEvent.click(screen.getByRole("button", { name: "Payments" }));

    const expected = projects.filter((p) => p.categories.includes("payments")).map((p) => p.name);
    expect(cardTitles()).toEqual(expected);
    expect(screen.getByRole("button", { name: "Payments" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(`Showing ${expected.length} of ${projects.length} projects`)).toBeInTheDocument();
  });

  it("links each live project to its site in a new tab", () => {
    render(<ProjectGrid projects={projects} />);
    const link = screen.getByRole("link", { name: /icegames\.co\.za/ });
    expect(link).toHaveAttribute("href", "https://icegames.co.za");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
