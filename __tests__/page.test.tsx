import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { profile } from "@/data/profile";

describe("Home", () => {
  it("renders the name and every section", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: profile.name })).toBeInTheDocument();
    for (const name of ["Projects", "Experience", "Skills", "Education"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("hides contact links that have no URL", () => {
    render(<Home />);
    const contact = screen.getByRole("navigation", { name: "Contact" });
    const labels = Array.from(contact.querySelectorAll("a")).map((a) => a.textContent);
    expect(labels).toContain("Email");
    if (!profile.github) expect(labels).not.toContain("GitHub");
    if (!profile.linkedin) expect(labels).not.toContain("LinkedIn");
  });
});
