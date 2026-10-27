import { act, render, screen } from "@testing-library/react";
import { CursorGlow } from "@/components/CursorGlow";
import { Reveal } from "@/components/Reveal";

// A controllable stand-in for the browser's IntersectionObserver.
let observers: { callback: IntersectionObserverCallback; disconnected: boolean }[] = [];
class FakeObserver {
  entry: { callback: IntersectionObserverCallback; disconnected: boolean };
  constructor(callback: IntersectionObserverCallback) {
    this.entry = { callback, disconnected: false };
    observers.push(this.entry);
  }
  observe() {}
  disconnect() {
    this.entry.disconnected = true;
  }
}
const scrollIntoView = () =>
  act(() => {
    for (const o of observers.filter((o) => !o.disconnected)) {
      o.callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    }
  });

afterEach(() => {
  observers = [];
  // @ts-expect-error -- jsdom has no IntersectionObserver; tests opt in.
  delete window.IntersectionObserver;
});

describe("Reveal", () => {
  it("shows content straight away when the browser can't observe scrolling", () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).toHaveClass("is-shown");
  });

  it("stays hidden until scrolled into view", () => {
    window.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver;
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).not.toHaveClass("is-shown");
    scrollIntoView();
    expect(screen.getByText("hello")).toHaveClass("is-shown");
  });

  it("passes its class through, for layout", () => {
    render(<Reveal className="span-wide">hello</Reveal>);
    expect(screen.getByText("hello")).toHaveClass("reveal", "span-wide");
  });
});

describe("CursorGlow", () => {
  const pointerAt = (x: number, y: number) =>
    act(() => {
      window.dispatchEvent(Object.assign(new Event("pointermove"), { clientX: x, clientY: y }));
    });

  beforeEach(() => {
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    // @ts-expect-error -- jsdom has no matchMedia; these tests opt in.
    delete window.matchMedia;
  });

  it("follows a mouse pointer across the background", () => {
    window.matchMedia = (() => ({ matches: true })) as unknown as typeof window.matchMedia;
    const { container } = render(<CursorGlow />);
    const glow = container.querySelector(".cursor-glow") as HTMLElement;
    expect(glow).not.toHaveClass("is-active");

    pointerAt(120, 340);
    expect(glow).toHaveClass("is-active");
    expect(glow.style.getPropertyValue("--mx")).toBe("120px");
    expect(glow.style.getPropertyValue("--my")).toBe("340px");
  });

  it("stays off on touch screens", () => {
    window.matchMedia = (() => ({ matches: false })) as unknown as typeof window.matchMedia;
    const { container } = render(<CursorGlow />);
    pointerAt(120, 340);
    expect(container.querySelector(".cursor-glow")).not.toHaveClass("is-active");
  });
});
