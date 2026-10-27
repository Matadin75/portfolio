"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Cycles through `words`; screen readers get the whole list once instead. */
export function RotatingWords({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotator">
      <span className="sr-only">{words.join(", ")}</span>
      <span key={index} className="rotator-word" aria-hidden="true" data-testid="rotator-word">
        {words[index]}
      </span>
    </span>
  );
}
