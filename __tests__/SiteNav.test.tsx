import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteNav, sections } from "@/components/SiteNav";

const menuButton = () => screen.getByRole("button", { name: "Menu" });
const header = () => screen.getByRole("banner");

describe("SiteNav", () => {
  it("links every section and the contact section from anywhere on the site", () => {
    render(<SiteNav name="Saien Matadin" />);
    const nav = screen.getByRole("navigation", { name: "Sections" });
    for (const s of sections) expect(within(nav).getByRole("link", { name: s.label })).toHaveAttribute("href", `/#${s.id}`);
    expect(within(nav).getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/#contact");
    expect(screen.getByRole("link", { name: "Saien Matadin, home" })).toHaveAttribute("href", "/");
  });

  it("opens and closes the mobile menu, with Escape and by choosing a link", async () => {
    render(<SiteNav name="Saien Matadin" />);
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(menuButton());
    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
    expect(header()).toHaveClass("is-open");

    await userEvent.keyboard("{Escape}");
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(menuButton());
    await userEvent.click(screen.getByRole("link", { name: "Skills" }));
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
  });

  describe("active section", () => {
    let callback: IntersectionObserverCallback;
    beforeEach(() => {
      window.IntersectionObserver = class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb;
        }
        observe() {}
        disconnect() {}
      } as unknown as typeof IntersectionObserver;
      for (const s of sections) {
        const el = document.createElement("section");
        el.id = s.id;
        document.body.append(el);
      }
    });
    afterEach(() => {
      // @ts-expect-error -- jsdom has no IntersectionObserver; these tests opt in.
      delete window.IntersectionObserver;
      for (const s of sections) document.getElementById(s.id)?.remove();
    });

    it("marks the section in view", () => {
      render(<SiteNav name="Saien Matadin" />);
      act(() => callback([{ isIntersecting: true, target: document.getElementById("skills")! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
      expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("aria-current", "location");
      expect(screen.getByRole("link", { name: "Work" })).not.toHaveAttribute("aria-current");
    });
  });
});
