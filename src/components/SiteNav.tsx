"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

// In page order.
export const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
];

/** Marks the section currently in the middle of the screen. Pages without these sections get no marker. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

const ids = sections.map((s) => s.id);

export function SiteNav({ name }: { name: string }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${open ? " is-open" : ""}`}>
      <div className="wrap nav-inner">
        <Link className="logo" href="/" aria-label={`${name}, home`} onClick={close}>
          <span className="logo-mark" aria-hidden="true">
            SM
          </span>
          <span className="logo-name">{name}</span>
        </Link>
        <nav id="site-menu" className="nav-links" aria-label="Sections">
          {sections.map((s) => (
            <Link key={s.id} href={`/#${s.id}`} aria-current={active === s.id ? "location" : undefined} onClick={close}>
              {s.label}
            </Link>
          ))}
          <Link className="nav-contact" href="/#contact" onClick={close}>
            Get in touch
          </Link>
        </nav>
        <ThemeToggle />
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className="menu-icon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
