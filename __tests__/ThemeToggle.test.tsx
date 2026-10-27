import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";
import { themeScript } from "@/lib/theme";

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

const toggle = () => screen.getByRole("button", { name: "Light mode" });
const theme = () => document.documentElement.dataset.theme;

describe("ThemeToggle", () => {
  it("starts dark when nothing is saved", () => {
    render(<ThemeToggle />);
    expect(theme()).toBe("dark");
    expect(toggle()).toHaveAttribute("aria-pressed", "false");
  });

  it("picks up the theme the head script already set", () => {
    document.documentElement.dataset.theme = "light";
    render(<ThemeToggle />);
    expect(toggle()).toHaveAttribute("aria-pressed", "true");
  });

  it("switches theme on click and remembers the choice", async () => {
    render(<ThemeToggle />);

    await userEvent.click(toggle());
    expect(theme()).toBe("light");
    expect(toggle()).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("theme")).toBe("light");

    await userEvent.click(toggle());
    expect(theme()).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("keeps the browser toolbar colour in step", async () => {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.append(meta);
    render(<ThemeToggle />);

    await userEvent.click(toggle());
    expect(meta.content).toBe("#f8fafc");
    meta.remove();
  });
});

describe("theme script", () => {
  const run = () => new Function(themeScript)();

  it("applies a saved light choice before paint", () => {
    localStorage.setItem("theme", "light");
    run();
    expect(theme()).toBe("light");
  });

  it("defaults to dark, including for junk in storage", () => {
    localStorage.setItem("theme", "purple");
    run();
    expect(theme()).toBe("dark");
  });
});
