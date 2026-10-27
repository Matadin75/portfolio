import { act, render, screen } from "@testing-library/react";
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
