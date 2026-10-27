import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";

// A stand-in for the OS colour setting that tests can flip.
let systemDark = false;
let listeners: (() => void)[] = [];
const setSystemDark = (dark: boolean) =>
  act(() => {
    systemDark = dark;
    listeners.forEach((l) => l());
  });

beforeEach(() => {
  window.matchMedia = ((query: string) => ({
    get matches() {
      return query.includes("dark") && systemDark;
    },
    addEventListener: (_: string, l: () => void) => listeners.push(l),
    removeEventListener: (_: string, l: () => void) => (listeners = listeners.filter((x) => x !== l)),
  })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  systemDark = false;
  listeners = [];
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  // @ts-expect-error -- jsdom has no matchMedia; these tests opt in.
  delete window.matchMedia;
});

const toggle = () => screen.getByRole("button", { name: "Dark mode" });
const theme = () => document.documentElement.dataset.theme;

describe("ThemeToggle", () => {
  it("picks up the theme the head script already set", () => {
    document.documentElement.dataset.theme = "dark";
    render(<ThemeToggle />);
    expect(toggle()).toHaveAttribute("aria-pressed", "true");
  });

  it("falls back to the system setting when nothing is set", () => {
    systemDark = true;
    render(<ThemeToggle />);
    expect(theme()).toBe("dark");
    expect(toggle()).toHaveAttribute("aria-pressed", "true");
  });

  it("switches theme on click and remembers the choice", async () => {
    render(<ThemeToggle />);
    expect(theme()).toBe("light");

    await userEvent.click(toggle());
    expect(theme()).toBe("dark");
    expect(toggle()).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("theme")).toBe("dark");

    await userEvent.click(toggle());
    expect(theme()).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("follows the system live until the visitor picks, then sticks with their pick", async () => {
    render(<ThemeToggle />);
    setSystemDark(true);
    expect(theme()).toBe("dark");

    await userEvent.click(toggle());
    expect(theme()).toBe("light");
    setSystemDark(false);
    setSystemDark(true);
    expect(theme()).toBe("light");
  });

  it("keeps the browser toolbar colour in step", async () => {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.append(meta);
    render(<ThemeToggle />);

    await userEvent.click(toggle());
    expect(meta.content).toBe("#0b1120");
    meta.remove();
  });
});
