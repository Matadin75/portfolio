"use client";

import { useEffect, useState } from "react";
import { applyTheme, savedTheme, systemTheme, type Theme } from "@/lib/theme";

/** Flips between light and dark. Until the visitor picks one, the page follows their system setting, live. */
export function ThemeToggle() {
  // Unknown until mounted: the server can't see the visitor's choice. The icons follow data-theme in CSS meanwhile.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const set = document.documentElement.dataset.theme;
    const current: Theme = set === "light" || set === "dark" ? set : (savedTheme() ?? systemTheme());
    applyTheme(current);
    setTheme(current);

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const follow = () => {
      if (savedTheme()) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    media?.addEventListener?.("change", follow);
    return () => media?.removeEventListener?.("change", follow);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next, true);
    setTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" aria-label="Dark mode" aria-pressed={theme === "dark"} onClick={toggle}>
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
