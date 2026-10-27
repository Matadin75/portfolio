export type Theme = "light" | "dark";

const KEY = "theme";

/** Page backgrounds, mirrored from --bg in globals.css, for the browser's toolbar colour. */
export const themeColors: Record<Theme, string> = { light: "#fbf8f3", dark: "#0a0b14" };

/** The visitor's own pick, if they made one. Storage can throw (private windows, blocked cookies), which counts as no pick. */
export function savedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

export function systemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Switches the page to `theme`, and remembers it for next visit when `save` is set. */
export function applyTheme(theme: Theme, save = false) {
  document.documentElement.dataset.theme = theme;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", themeColors[theme]);
  }
  if (!save) return;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Nowhere to keep it; the choice still holds for this visit.
  }
}

/** Inlined in <head> so the right colours are set before first paint, with no flash of the other theme. */
export const themeScript = `(function(){var t;try{t=localStorage.getItem("${KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t})()`;
