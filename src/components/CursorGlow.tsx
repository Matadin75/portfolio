"use client";

import { useEffect, useRef } from "react";

/** A soft light that follows the pointer. Mouse and trackpad only; touch screens never see it. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        el.classList.add("is-active");
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
