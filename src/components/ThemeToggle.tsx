"use client";

import { useEffect, useState } from "react";
import { applyTheme, defaultTheme, savedTheme, type Theme } from "@/lib/theme";

/** Flips between the dark default and light, and remembers the choice. */
export function ThemeToggle() {
  // Unknown until mounted: the server can't see the visitor's choice. The icons follow data-theme in CSS meanwhile.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const set = document.documentElement.dataset.theme;
    const current: Theme = set === "light" || set === "dark" ? set : (savedTheme() ?? defaultTheme);
    applyTheme(current);
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next, true);
    setTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" aria-label="Light mode" aria-pressed={theme === "light"} onClick={toggle}>
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8" />
      </svg>
    </button>
  );
}
