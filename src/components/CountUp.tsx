"use client";

import { useEffect, useRef, useState } from "react";
import { onFirstView, prefersReducedMotion } from "@/lib/motion";

/** Counts from 0 to `value` when first seen. Renders the final value until then, so it is right without JS. */
export function CountUp({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    // No observer means no way to wait for the visitor, so keep the final value rather than animate unseen.
    if (!ref.current || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    const stop = onFirstView(ref.current, () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setShown(Math.round(value * (1 - (1 - t) ** 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setShown(0);
      frame = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
