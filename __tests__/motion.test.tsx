import { act, render, screen } from "@testing-library/react";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { RotatingWords } from "@/components/RotatingWords";

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

const setReducedMotion = (reduce: boolean) => {
  window.matchMedia = ((query: string) => ({ matches: reduce && query.includes("reduce") })) as typeof window.matchMedia;
};

afterEach(() => {
  observers = [];
  // @ts-expect-error -- jsdom has neither; tests opt in.
  delete window.IntersectionObserver;
  // @ts-expect-error -- see above
  delete window.matchMedia;
  jest.useRealTimers();
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
});

describe("RotatingWords", () => {
  it("cycles through the words and wraps around", () => {
    jest.useFakeTimers();
    render(<RotatingWords words={["apps", "sites"]} interval={1000} />);
    const word = () => screen.getByTestId("rotator-word").textContent;
    expect(word()).toBe("apps");
    act(() => jest.advanceTimersByTime(1000));
    expect(word()).toBe("sites");
    act(() => jest.advanceTimersByTime(1000));
    expect(word()).toBe("apps");
  });

  it("holds still for visitors who prefer reduced motion", () => {
    jest.useFakeTimers();
    setReducedMotion(true);
    render(<RotatingWords words={["apps", "sites"]} interval={1000} />);
    act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByTestId("rotator-word")).toHaveTextContent("apps");
  });

  it("gives screen readers every word at once", () => {
    render(<RotatingWords words={["apps", "sites"]} />);
    expect(screen.getByText("apps, sites")).toBeInTheDocument();
  });
});

describe("CountUp", () => {
  it("renders the final value before any animation runs", () => {
    render(<CountUp value={5} suffix="+" />);
    expect(screen.getAllByText("5+")).toHaveLength(2); // visible copy and screen-reader copy
  });

  it("counts up from zero once scrolled into view", () => {
    window.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver;
    const frames: FrameRequestCallback[] = [];
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => frames.push(cb));
    jest.spyOn(performance, "now").mockReturnValue(0);

    const { container } = render(<CountUp value={10} duration={100} />);
    const visible = () => container.querySelector('[aria-hidden="true"]')?.textContent;
    scrollIntoView();
    expect(visible()).toBe("0");

    act(() => frames.shift()!(50));
    expect(Number(visible())).toBeGreaterThan(0);
    expect(Number(visible())).toBeLessThan(10);

    act(() => frames.shift()!(100));
    expect(visible()).toBe("10");
    expect(frames).toHaveLength(0);
  });
});
