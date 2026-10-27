"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { onFirstView } from "@/lib/motion";

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    return onFirstView(ref.current, () => setShown(true));
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " is-shown" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
