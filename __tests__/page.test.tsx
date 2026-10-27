import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { profile } from "@/data/profile";

describe("Home", () => {
  it("leads with the headline, highlighting the problem it solves", () => {
    render(<Home />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Building digital products that solve real problems.");
    expect(within(h1).getByText("real problems")).toHaveClass("accent-text");
  });

  it("points the calls to action at the work and the contact section", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /Explore My Work/ })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: "Get In Touch" })).toHaveAttribute("href", "#contact");
  });

  it("renders every section, each with a heading and an anchor the nav can reach", () => {
    const { container } = render(<Home />);
    for (const name of [profile.message, "Products I've built and shipped", "Skills, shown in context", "Experience", "Education", "Let's build something meaningful."]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    for (const id of ["about", "projects", "skills", "experience", "contact"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("offers email first and hides contact links that have no URL", () => {
    render(<Home />);
    const contact = screen.getByRole("navigation", { name: "Contact" });
    const links = within(contact).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", `mailto:${profile.email}`);
    const labels = links.map((a) => a.textContent);
    if (!profile.github) expect(labels).not.toContain("GitHub");
    if (!profile.linkedin) expect(labels).not.toContain("LinkedIn");
  });

  it("shows each role's dates", () => {
    render(<Home />);
    expect(screen.getByText("2022 – present")).toBeInTheDocument();
    expect(screen.getByText("2020 – March 2022")).toBeInTheDocument();
  });
});
